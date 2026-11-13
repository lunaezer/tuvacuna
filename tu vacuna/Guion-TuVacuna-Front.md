# Guion – TuVacuna, front-end (5 minutos)
Ritmo: ~150 palabras por minuto. Si te pasás de tiempo, recortá primero las diapositivas 3 y 6.

## 1. Presentamos el Front-end · 0:00 – 0:12

Hola, soy Luna y me encargué del front-end de TuVacuna: todo lo que ven y usan las personas. Les cuento con qué lo hicimos, cómo está organizado y cómo se conecta con el back.

## 2. Las tecnologías del front · 0:12 – 0:38

Usamos React con TypeScript, para que el editor nos avise los errores antes de ejecutar. Vite para desarrollar rápido, React Router para las pantallas, Leaflet para el mapa y Framer Motion para las animaciones. Los estilos son CSS puro, un archivo por componente: no usamos Tailwind porque queríamos un diseño a medida y un código legible.

## 3. Cómo está hecho por dentro (intro) · 0:38 – 0:50

Ahora, cómo está hecho por dentro. El código se organiza en pantallas, componentes, estado global y lógica. Y lo primero que quiero mostrar son los componentes reutilizables.

*→ AVANZAR*

## 4. ¿Cuántos componentes ven? · 0:50 – 1:05

Esta es la pantalla de Inicio. Les pregunto: ¿cuántos componentes creen que tiene?

*PAUSA: dejá que la gente diga números (unos 8 segundos). → AVANZAR para ver la respuesta*

## 5. Una pantalla por dentro · 1:05 – 1:38

Marcamos 8 componentes distintos, y adentro de cada uno hay otros más chicos: el menú lateral, el encabezado, los botones, la tarjeta del perfil, las tarjetas y, adentro de ellas, los de dosis, centros y turnos por agendar. Lo importante es que el botón, las tarjetas y el menú se usan en muchas otras pantallas: se escriben una sola vez y, si cambiamos uno, cambia en toda la app.

*→ AVANZAR (vuelve la diapositiva «Cómo está hecho por dentro»)*

## 6. Cómo está hecho por dentro (resto) · 1:38 – 2:03

Volviendo al esquema: la lógica está en hooks y contextos, que piden y guardan los datos. Los colores, radios y sombras son variables CSS definidas una sola vez. Y medimos todo en rem, para que la interfaz escale con la letra del navegador, y es responsive: se los muestro.

*→ AVANZAR*

## 7. Responsive · 2:03 – 2:20

Como medimos en rem y usamos media queries, la misma app se adapta al tamaño de la pantalla: acá está en escritorio, en tablet y en celular, donde el menú pasa abajo.

## 8. Empezamos sin el back · 2:20 – 2:55

Una dificultad: cuando empezamos con las pantallas, el back todavía no tenía los endpoints, y no queríamos esperar. Acordamos un contrato, un documento que dice, para cada endpoint, qué se envía y qué responde, y armamos mocks: datos de prueba que se comportan como el back. Los activábamos con un interruptor, USAR_MOCK; cuando el endpoint real apareció, lo apagamos y, al final, borramos los mocks. Hoy todo usa el back real.

## 9. Cómo se conecta con el back · Paso 1 · 2:55 – 3:06

Veamos cómo se conecta con el back, desde que alguien entra. Primero elige su rol, paciente o médico, en el login: es la misma pantalla para los dos.

*→ AVANZAR*

## 10. Cómo se conecta con el back · Paso 2 · 3:06 – 3:22

Es como una conversación: el front le escribe al servidor su mail, su contraseña y su rol, y el servidor le contesta con un token. Si los datos no coinciden, responde un error 401.

*→ AVANZAR*

## 11. Cómo se conecta con el back · Paso 3 · 3:22 – 3:32

Ese token se guarda en el navegador, en sessionStorage, y lo vamos a usar en cada pedido.

*→ AVANZAR*

## 12. Cómo se conecta con el back · Paso 4 · 3:32 – 3:50

Y con ese token el front vuelve a hablar con el servidor: «este es mi token, pasame mis datos». El servidor responde con nombre, rol y perfil, y con eso se arma esta pantalla. Si se recarga la página, repetimos el pedido y la sesión se recupera sin pedir la contraseña.

*→ AVANZAR*

## 13. Qué pasa después del login · 3:50 – 4:15

Con la sesión lista, la app navega a inicio y, según el rol, muestra cosas distintas: estas son las dos barras laterales reales. El paciente entra a su Inicio, con seis secciones; el médico, en la misma ruta, ve su Perfil y un menú más corto. Desde ahí, cada pantalla pide sus datos al servidor con el token.

## Si preguntan

**¿Por qué no usaron Tailwind?**  
Es un framework de clases que se escriben directo en el código de la pantalla. Elegimos CSS puro por componente porque nuestro diseño es a medida y con animaciones, queríamos que el código quedara legible, y migrar más de 70 archivos de estilos que ya funcionan no se justificaba. La consistencia la conseguimos con variables CSS.

**¿Qué pasa si el token no es válido?**  
Al abrir la app se vuelve a pedir el usuario con ese token. Si el servidor lo rechaza, la app avisa que hubo un problema en el inicio de sesión y cierra la sesión.

**¿Los mocks siguen en el código?**  
No: los borramos cuando el back estuvo listo. Hoy todo usa el servidor real.

**¿Dónde se guarda el token?**  
En el navegador, en sessionStorage: dura mientras la pestaña esté abierta.

**¿Cuántos componentes tiene en realidad la pantalla de Inicio?**  
Marcamos 8 distintos, pero adentro hay más: por ejemplo cada opción del menú lateral y cada tarjeta de dosis también son componentes.

---
Antes de presentar: reemplazar «[tu nombre]» y confirmar con el equipo de back que los endpoints están desplegados.
