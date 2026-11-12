# Guion – TuVacuna, front-end (5 minutos)
Ritmo: ~150 palabras por minuto. Si te pasás de tiempo, recortá primero las diapositivas 3 y 6.

## 1. Portada · 0:00 – 0:15

Hola, soy [tu nombre] y me encargué del front-end de TuVacuna, el carnet de vacunación digital. Les cuento qué armamos, cómo está hecho por dentro y cómo lo conectamos con el back.

## 2. Las tecnologías del front · 0:15 – 0:45

Usamos React con TypeScript, para que el editor nos avise los errores antes de ejecutar. Vite para desarrollar rápido y React Router para las pantallas, con rutas distintas para paciente y médico. Leaflet para el mapa de centros y Framer Motion para las animaciones. Los estilos son CSS puro, un archivo por componente: no usamos Tailwind porque queríamos un diseño a medida y un código legible.

## 3. Lo que ve cada usuario · 0:45 – 1:15

Esto es lo que ve cada usuario. Al entrar, el Inicio resume todo: cuántas dosis están aplicadas, cuáles toca agendar y cuál es el centro más cercano. Además tenemos el carnet digital, con el historial de dosis por año; el calendario con los turnos y el mapa de centros; y la sección de familia, donde cada persona ve el carnet de sus familiares. El médico, por su parte, ve a sus pacientes.

## 4. Cómo está hecho por dentro (intro) · 1:15 – 1:30

Ahora, cómo está hecho por dentro. El código se organiza en pantallas, componentes, estado global y lógica. Y lo primero que quiero mostrar son los componentes reutilizables.

*→ AVANZAR*

## 5. Una pantalla por dentro · 1:30 – 2:05

Esta es la pantalla de Inicio, y cada recuadro numerado es un componente: el menú lateral, el encabezado, los botones, la tarjeta del perfil, las cuatro tarjetas y, adentro de ellas, otros más chicos, como el de dosis, el de centros y el de turnos por agendar. Lo importante es que el botón, las tarjetas y el menú se usan en muchas otras pantallas: se escriben una sola vez y, si cambiamos uno, cambia en toda la app.

*→ AVANZAR (vuelve la diapositiva anterior)*

## 6. Cómo está hecho por dentro (resto) · 2:05 – 2:35

Volviendo al esquema: la lógica está separada en hooks y contextos, que se encargan de pedir y guardar los datos. Los colores, radios y sombras están definidos una sola vez como variables CSS, así que cambiar el color de la marca es tocar una línea. Y medimos todo en rem, para que la interfaz escale con el tamaño de letra del navegador, y es responsive.

## 7. Empezamos sin el back · 2:35 – 3:15

Una dificultad que tuvimos: cuando empezamos con las pantallas, el back todavía no tenía los endpoints, y no queríamos quedarnos esperando. Primero acordamos un contrato, un documento que dice, para cada endpoint, qué se envía y qué responde. Con eso armamos mocks: datos de prueba que se comportan como el back. Cada contexto tiene un interruptor, USAR_MOCK: en true usa los datos de prueba y, cuando el endpoint real aparece, lo pasamos a false y el resto del código no se toca. Hoy los ocho interruptores están en false.

## 8. Cómo se conecta con el back · 3:15 – 4:00

Veamos cómo se conecta con el back, desde que alguien entra. Primero elige su rol, paciente o médico, en el login: es la misma pantalla para los dos. Después el front manda el mail, la contraseña y el rol al servidor; si no coinciden responde error 401 y, si coinciden, devuelve un token. Guardamos ese token en el navegador y lo mandamos en cada pedido. Con él pedimos los datos del usuario: nombre, rol y perfil. Si se recarga la página, hacemos ese mismo pedido y la sesión se recupera sin volver a pedir la contraseña.

## 9. Qué pasa después del login · 4:00 – 4:30

Con la sesión lista, la app navega a inicio y, según el rol, muestra cosas distintas. Estas son las dos barras laterales reales. El paciente entra a su pantalla de Inicio, con un menú de seis secciones. El médico, en la misma ruta, ve su Perfil y un menú más corto: inicio y pacientes. Desde ahí, cada pantalla pide sus datos al servidor con el token: carnet, familia, centros y turnos.

## 10. Qué logramos y qué sigue · 4:30 – 5:00

Para cerrar: ya funcionan el registro y el inicio de sesión de pacientes y médicos, el carnet y los turnos, el grupo familiar, el mapa de centros y la vista médica, todo conectado al servidor. Lo que sigue es terminar la verificación de matrícula del médico, probar con más datos reales y pulir detalles. Muchas gracias. ¿Tienen preguntas?

## Si preguntan

**¿Por qué no usaron Tailwind?**  
Es un framework de clases que se escriben directo en el código de la pantalla. Elegimos CSS puro por componente porque nuestro diseño es a medida y con animaciones, queríamos que el código quedara legible, y migrar más de 70 archivos de estilos que ya funcionan no se justificaba. La consistencia la conseguimos con variables CSS.

**¿Qué pasa si el token no es válido?**  
Al abrir la app se vuelve a pedir el usuario con ese token. Si el servidor lo rechaza, la app avisa que hubo un problema en el inicio de sesión y cierra la sesión.

**¿Los mocks siguen en el código?**  
Sí, los archivos de datos de prueba siguen, pero los interruptores están en false, así que hoy todo usa el servidor real.

**¿Dónde se guarda el token?**  
En el navegador, en sessionStorage: dura mientras la pestaña esté abierta.

---
Antes de presentar: reemplazar «[tu nombre]» y confirmar con el equipo de back que los endpoints están desplegados.
