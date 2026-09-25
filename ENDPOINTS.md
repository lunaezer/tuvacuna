# TuVacuna — Endpoints del backend

Documento de diseño de la API. Ninguno de estos endpoints está implementado todavía en `back/` — es la referencia para ir construyéndolos.

Convención general: salvo `/api/auth/*`, todos los endpoints requieren el header `Authorization: Bearer <token>` (el token que devuelve login/registro).

---

## Auth

Registro e inicio de sesión. Son los únicos endpoints que no requieren token, porque son los que lo generan.

```
POST /api/auth/registro/paciente
  body: { name, surname, email, id, password, birthDate, sex, obraSocial, condiciones, carnetPhoto? } (multipart)
  → { token, usuario: { nombre } }
```
Registra una cuenta de paciente. `carnetPhoto` es opcional — se puede subir después desde Carnet.

```
POST /api/auth/registro/medico
  body: { name, surname, email, id, password, matricula, especialidad, institucion, pacientes: string[] }
  → { token, usuario: { nombre } }
```
Registra una cuenta de médico.

```
POST /api/auth/login
  body: { email, password }
  → { token }
```

```
GET /api/usuario/me
  → { id, nombre }
```
Dado un token, devuelve el id y el nombre de la cuenta dueña de ese token. Se usa en dos momentos: (1) justo después de loguearse/registrarse, para tener el nombre a mano en el frontend, y (2) al recargar la página, para recuperar la sesión sin volver a pedir usuario/contraseña (el token persiste en `sessionStorage`, pero el estado de React se pierde en cada refresh). El `id` hace falta porque los endpoints de Carnet (`/api/carnet/:id`, `/api/carnet/:id/:idFamiliar`) lo necesitan explícito en la URL — el token identifica la sesión, pero no alcanza para armar la ruta cuando además hay que pasar el id de un familiar.

---

## Familia

Modelo: cada persona tiene su propia cuenta. Agregar a alguien como familiar **no es mutuo automáticamente** — yo agrego a alguien por email, esa persona acepta, y a partir de ahí **yo puedo ver su información**. Para que el otro vea la mía, tiene que agregarme a mí por separado y yo aceptar. Cada vínculo es de un solo sentido.

```
GET /api/familia
  → Familiar[]   // { id, nombre, esVos, iniciales, colorBg }
```
Lista de cuentas que yo agregué y que ya me aceptaron (a quienes puedo ver). Se llama cada vez que se toca el selector de familiares (`FamilySelector`).

```
POST /api/familia/solicitudes
  body: { email }
  → { id, estado: "pendiente" }
```
Envía una solicitud a la cuenta con ese email, pidiendo permiso para ver su información.

```
GET /api/familia/solicitudes/recibidas
  → [{ id, solicitante: { nombre, email }, fecha }]
```
Solicitudes que me llegaron a mí — alguien me pide que lo deje ver mi info.

```
GET /api/familia/solicitudes/enviadas
  → [{ id, destinatario: { nombre, email }, estado: "pendiente" }]
```
Las que yo mandé y todavía no me contestaron.

```
POST /api/familia/solicitudes/:id/aceptar
```
Acepto una solicitud recibida: a partir de ahora quien la mandó puede ver mi información.

```
POST /api/familia/solicitudes/:id/rechazar
```
Descarta la solicitud recibida.

```
DELETE /api/familia/:id
```
Dejo de poder ver a esa persona (borro el vínculo que yo tengo hacia ella).

---

## Carnet

El carnet no es solo el historial de dosis aplicadas: también incluye datos del perfil (fecha de nacimiento, sexo, condiciones) que el back cruza contra el Calendario Nacional de Vacunación para calcular qué dosis corresponden (eso arma el grupo "PENDIENTES").

```
GET /api/carnet/:id
  → SeccionHistorial[]   // { grupo, esPendiente, dosis: Dosis[] }
```
Mi propio carnet: perfil + historial de dosis aplicadas + pendientes calculadas.

```
GET /api/carnet/:id/:idFamiliar
  → SeccionHistorial[]
```
El carnet de un familiar, visto desde mi cuenta (`:id`). El back valida que `:id` tenga un vínculo aceptado hacia `:idFamiliar` (ver sección Familia) antes de devolver nada.

```
POST /api/carnet/:id/dosis
  body: { nombreVacuna, fecha, lugar }
  → Dosis
```
Cargo a mano una vacuna que ya me di (no viene de un catálogo, se tipea). Dispara el modal "Cargar dosis" de `CarnetPage`.

```
POST /api/carnet/:id/:idFamiliar/dosis
```
Igual al anterior, pero cargando una dosis para un familiar sobre el que tengo permiso.

```
POST /api/carnet/:id/foto
  body: multipart (imagen: jpg/png/pdf, máx 5MB)
  → { url }
```
Sube la foto del carnet físico. Por ahora solo se guarda — el análisis automático de la imagen (leer las vacunas de la foto) queda para más adelante.

```
POST /api/carnet/:id/:idFamiliar/foto
```
Igual al anterior, para un familiar.

**Nota:** el botón "Agendar" que aparece en una dosis pendiente/atrasada dentro del carnet no es un endpoint de Carnet — dispara `POST /api/turnos` (ver Calendario) pasando el `dosisId` como referencia.

---

## Calendario

Acá se trae todo el grupo familiar junto (uno mismo + los familiares vinculados), no por persona individual como en Carnet.

```
GET /api/calendario/marcados?mes=&anio=
  → DiaMarcado[]   // { dia, mes, anio, tipo: 'turno' | 'hoy' | 'atrasado' | 'recomendado' }
```
Data mínima para pintar los puntos de colores en la grilla del mes (`CalendarioWidget`). No trae detalle, solo qué día tiene algo y de qué tipo.

`mes` y `anio` van en **cada item**, no solo en el query — porque la grilla del widget muestra de relleno algunos días del mes anterior y del siguiente (para completar las semanas), y sin saber a qué mes/año pertenece cada marca, un día "29" del mes pasado podría pintarse mal por pura coincidencia de número con un día "29" marcado del mes actual. Por eso el back devuelve, para el `mes`/`anio` pedido, también las marcas del mes anterior y el siguiente (una ventana de 3 meses), cada una con su propio `mes`/`anio` para que el frontend pueda matchear exacto. `mes` usa la misma convención que `Date` de JS: 0 = enero, 11 = diciembre.

```
GET /api/turnos?mes=&anio=
  → Turno[]   // { dia, mes, titulo, lugar, hora, estado, etiqueta }
```
Lista con el detalle completo de turnos del grupo familiar para ese mes (columna "Próximos turnos"). Sin `mes`, devuelve todo el año — sirve para "Ver todo el año".

```
POST /api/turnos
  body: { familiarId, dosisId?, centroId?, fecha, hora }
  → Turno
```
Crea un turno nuevo. Lo usan tanto el botón "+ Nuevo turno" de Calendario como el botón "Agendar" de una dosis en Carnet (mandando `dosisId`) y el botón "Agendar turno" de un centro en Centros (mandando `centroId`).

```
PATCH /api/turnos/:id
  body: { fecha?, hora?, centroId? }
  → Turno
```
Reprograma un turno existente (cambia solo los campos que mandes, no reemplaza todo el turno).

```
DELETE /api/turnos/:id
```
Cancela un turno.

---

## Centros

```
GET /api/centros?busqueda=&tipo=&abiertoAhora=
  → { id, nombre, direccion, tipo: 'publico' | 'privado', lat, lng, horarios, abierto }[]
```
- `busqueda`: texto libre, filtra por barrio o dirección.
- `tipo`: `'publico' | 'privado'` — filtro opcional.
- `abiertoAhora`: `true` — filtro opcional.
- `abierto`: lo calcula el back comparando `horarios` contra la hora del servidor (no depende de la hora de la compu del usuario).

El mapa (Google Maps, Leaflet, etc.) pinta los pines directo con `lat`/`lng` de esta misma respuesta — no hace falta un endpoint de detalle por centro. El botón "Agendar turno" de cada centro reutiliza `POST /api/turnos` con `centroId`.

---

## Pendiente de definir

- **Vacunas**: la página no tiene funcionalidad todavía, no se definieron endpoints.
- **Asistente**: falta aclarar qué hace la página (¿chatbot? ¿FAQ fija?) antes de poder diseñar sus endpoints.
