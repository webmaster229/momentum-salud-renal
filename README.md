# Momentum Salud Renal · Landing 2026

Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · Motion (Framer Motion).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm run lint
```

Requiere Node.js 20.9 o superior; para producción, usar una versión LTS vigente.

## Publicar en producción

### Antes de publicar

- [ ] **Dominio**: `site.url` en `content/site.ts`. Lo usan el SEO, el sitemap, `robots.txt` y la vista previa al compartir enlaces.
- [ ] **Licencia web de Circe Rounded** (ParaType). Los archivos de `public/fonts` quedan descargables en internet. Conviene pedir la versión WOFF2, que pesa bastante menos. Si la licencia no está lista, borrar esos dos archivos: la página usa Nunito sin ningún otro cambio.
- [ ] **Política de tratamiento de datos**: el formulario de contacto pide autorización, pero aún no enlaza ninguna política. Definirlo con el área legal.
- [ ] **Contenido**: enlace de Facebook, video de la tercera historia (`social` e `historias` en `content/site.ts`), fechas de las noticias (`content/noticias.ts`) y direcciones por confirmar.

El formulario de contacto no envía el correo por sí solo: abre el programa de correo de la persona con el mensaje listo y ella lo envía. Para que llegue directo a la bandeja, hace falta un servicio de envío (por ejemplo, los datos SMTP del correo de la empresa).

### Dónde se puede publicar

Necesita un servidor con Node.js: el cambio de idioma (`proxy.ts`) y la optimización de imágenes no funcionan como sitio estático, así que un hosting compartido sin Node no sirve.

**Vercel** (lo más simple): importar el repositorio de GitHub, sin variables de entorno ni ajustes adicionales, y conectar el dominio. El plan gratuito es solo para uso personal; un sitio de empresa necesita el plan Pro.

**Servidor propio**:

```bash
npm ci
npm run build
npm start -- -p 3000
```

Mantener el proceso activo con un gestor (por ejemplo, PM2) y poner delante Nginx o similar con HTTPS. Si hay una CDN, debe purgarse al publicar: las páginas prerenderizadas se marcan como cacheables por un año.

### Después de publicar

- Abrir Inicio, Sedes, Sobre MoMentum, Contacto y un video en los tres idiomas.
- Probar en un celular real, incluido un iPhone.
- Compartir un enlace por WhatsApp para ver la vista previa.
- Enviar `https://<dominio>/sitemap.xml` a Google Search Console.
- Redirigir la versión con o sin `www` a la definida en `site.url`.

La seguridad (cabeceras HTTP) está en `next.config.ts`. Si se agrega un servicio externo, como analítica o un mapa, hay que permitirlo en `contentSecurityPolicy`.

## Diseño

Basado en `pagina-momentum.ai` (3 mesas de trabajo: Inicio, Nuestras Sedes,
Sobre MoMentum).

## Idiomas (español / inglés / portugués)

- Español en `/`, `/sedes`, `/sobre-momentum`…; inglés en `/en`, `/en/sedes`…;
  portugués (Brasil) en `/pt`, `/pt/sedes`…
- `proxy.ts` reescribe las rutas en español a `app/[lang]` y redirige `/es/...`
  a la versión sin prefijo.
- El selector **ES / EN / PT** del encabezado cambia de idioma sin salir de la página.
- Para agregar otro idioma: sumarlo en `i18n/config.ts`, crear su diccionario
  en `i18n/dictionaries/` (TypeScript avisa si falta alguna clave) y sus
  noticias en `content/noticias.ts`.

## Tipografía (Circe Rounded)

Títulos (y todo texto en negrita: menú, botones, etiquetas) en **Circe Rounded
Bold**, y texto corrido en **Circe Rounded Medium**. Es una fuente comercial de
ParaType: para usarla en la web hace falta su licencia webfont.

```
public/fonts/CirceRounded-Bold.otf     ✔ (títulos)
public/fonts/CirceRounded-Medium.otf   ✔ (texto corrido)
```

Mientras falte un archivo se usa Nunito (redondeada) como respaldo. Un título en peso normal lleva la clase `font-sans`. Ver
`app/globals.css`.

## Dónde editar

| Qué | Archivo |
|---|---|
| Textos de la página (español / inglés / portugués) | `i18n/dictionaries/es.ts` · `en.ts` · `pt.ts` |
| Contacto, redes, cifras, países y puntos del mapa, videos | `content/site.ts` |
| Directorio de sedes (nombre, ciudad y dirección) | `content/sedes.ts` |
| Correo de contacto (botones y formulario "Contáctanos") | `content/site.ts` → `contact.email` |
| Portada de Sobre MoMentum (naranja con el "MO" en 3D) y franja "MoMentum Holding" | `public/images/sobre/portada.jpg` · `barra.png` |
| Noticias (texto completo en cada idioma) | `content/noticias.ts` |
| Colores, tamaños de letra, curvas de animación | `app/globals.css` (`@theme`) |
| Imágenes | `public/images/` |
| Favicon (cuadrado, 512×512, fondo transparente) | `app/icon.png` |

Todo lo pendiente está marcado con `TODO` (correo de contacto, dominio y fechas
de las noticias).

## Estructura

```
app/[lang]/              layout, Inicio, /sedes, /sobre-momentum, /contacto, /noticias/[slug], 404
app/                     estilos globales, sitemap, robots, ícono
proxy.ts                 rutas por idioma
i18n/                    idiomas y diccionarios
components/layout/       Header (menú móvil + selector de idioma), Footer
components/sections/     PageHero, Stats, Presencia (+ MapPoints), Historias,
                         Actualidad, EncuentraSede, Holding
components/ui/           Button, SectionHeading, NewsCard, VideoModal, íconos
components/motion/       MotionProvider, Reveal/Stagger, CountUp
content/                 contenido editable
```

## Animaciones

Siguen la skill `animate` (curva `ease-out-quint`, 200–500 ms, solo `transform`
y `opacity`, salidas más rápidas que entradas):

- **Hero**: keyframes CSS (`animate-fade-up`) para que arranque sin esperar la
  hidratación; la foto (LCP) solo hace zoom con `transform`.
- **Secciones**: `Reveal` / `Stagger` (Motion `whileInView`, una sola vez).
- **Cifras**: `CountUp` cuenta desde 0 y escribe en el DOM sin re-renderizar React.
- **Mapa**: los puntos entran con un pequeño rebote y luego "saltan" mientras
  emiten dos ondas (keyframes CSS `pulse-ring` y `beat`).
- **Corazón** (tarjeta "¿Necesitas orientación?"): cada vez que entra en
  pantalla se dibuja 4 veces, una cada 3 s, desde el remate redondo, y queda
  completo; `DrawnHeart` revela `corazon.png` con una máscara SVG que recorre
  su trazo (`CYCLE` y `TIMES` en el componente).
- **Encuentra tu sede**: el panel es un slider con flechas. Sin país elegido
  pasa solo cada 4,5 s alternando países (se detiene con el mouse encima o al
  usar las flechas; el mapa resalta el país de la sede que se muestra). Al
  elegir un país, fundido a sus sedes, con buscador y filtro por ciudad. La
  búsqueda (`components/sections/buscarSedes.ts`) entiende palabras en cualquier
  orden, abreviaturas ("calle" / "Cl.") y errores de digitación.
- **Modal de video**: entrada 200 ms / salida 150 ms; el iframe se crea al abrir.
- **Botones y tarjetas**: CSS puro (hover lift, press `scale(0.97)`).

`MotionProvider` usa `LazyMotion` (carga diferida de las funciones de Motion) y
`MotionConfig reducedMotion="user"`. Con "reducir movimiento" activado (en
Windows: *Mostrar animaciones en Windows* desactivado) se quitan solo los
desplazamientos grandes (entrada del hero, zoom de la foto, deslizamientos);
las cifras, el mapa y el corazón siguen animándose porque no mueven la página.
