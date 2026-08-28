# Hola, soy Gian Carlos 👋

**Desarrollador Full-Stack y Técnico de Sistemas** · Valencia, España

Si estás leyendo esto en vez de abrir la web, aquí tienes el resumen en texto: llevo más de dos años moviéndome entre el código y la infraestructura. Construyo aplicaciones web con Vue.js y Laravel, y también me encargo de que esas aplicaciones (y las de otros) carguen rápido, no se caigan y sigan funcionando cuando de verdad importa. Este repositorio es justamente eso: la web que uso como portfolio, y este README es la versión para quien prefiere conocerme en texto antes de entrar a navegarla.

**[→ Ver el portfolio en vivo](https://giancarlos25.github.io/Portfolio-GianCarlos/)**  ·  [LinkedIn](https://www.linkedin.com/in/gian-carlos-samaniego-herrera-816123241/)  ·  [giancarlos.sh25@gmail.com](mailto:giancarlos.sh25@gmail.com)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

## Qué vas a encontrar en la web

No es una plantilla genérica: cada sección está pensada para responder algo distinto.

- **Sobre mí** — quién soy y en qué tipo de proyectos me muevo, más allá del CV.
- **Experiencia** — lo que hago ahora mismo en AMAlapublicidad (desarrollo de portales corporativos, optimización de rendimiento) y en AEPSIS (una plataforma educativa con más de 100.000 alumnos en su histórico, donde automatizo procesos con IA y optimizo bases de datos).
- **Proyectos** — un par de proyectos explicados a fondo, más el resto de mis repositorios cargados en directo desde la API de GitHub (o sea: si acabas de ver algo nuevo en mi perfil, ya está también ahí).
- **Servicios** — en qué puedo ayudarte si buscas a alguien para desarrollo web, WordPress, SEO técnico o diseño.
- **Contacto** — directo, sin formularios raros: mi email de verdad y mis redes.

## Proyectos destacados

**[HappyCorner Menu](https://giancarlos25.github.io/happycorner-menu/)** ([código](https://github.com/GianCarlos25/happycorner-menu))
Menú digital para un negocio real, diseñado y desarrollado siguiendo las indicaciones del cliente de principio a fin. El único de estos que no es un ejercicio: alguien lo usa hoy.

**HotelAPI · Sistema de Gestión Hotelera**
Backend RESTful completo para la gestión de reservas y operaciones de un hotel. PHP puro con Composer, autenticación segura y base de datos relacional pensada para las transacciones.

**App Control de Gastos**
Aplicación de página única (SPA) para gestionar finanzas personales en tiempo real. Vue.js, componentes modulares y gestión de estado en el frontend, sin recargar la página.

**[SkillShelf](https://github.com/GianCarlos25/skillshelf)**
Una app de macOS que empecé y desarrollé para aprender el proceso completo de llevar una idea a un instalador `.dmg` real. No triunfó como producto, pero fue donde aprendí a construir y distribuir software nativo en Mac.

## Un llamado de atención, si estás contratando o buscando freelance

Si esto lo estás mirando como parte de un proceso de selección o porque necesitas a alguien para un proyecto: no busco solo escribir código que funcione en local, busco que siga funcionando en producción. La mitad de mi trabajo actual es justamente eso, sostener sistemas que ya están en marcha (una plataforma con 100.000+ alumnos en su histórico, soporte en vivo para congresos de hasta 15.000 asistentes), no solo construir cosas nuevas. Si eso encaja con lo que buscas, [hablemos](mailto:giancarlos.sh25@gmail.com).

---

## Detalles técnicos de este repositorio

Landing de una sola página hecha con HTML, CSS y JavaScript puro, sin frameworks ni build, pensada para GitHub Pages. Lista los proyectos en directo desde la API pública de GitHub.

### Publicado en GitHub Pages

Este repo se llama `Portfolio-GianCarlos` (no `giancarlos25.github.io`), así que GitHub lo publica con el nombre del repo metido en la URL: **`https://giancarlos25.github.io/Portfolio-GianCarlos/`**. Si en algún momento se renombra el repo a `giancarlos25.github.io`, la web pasaría a vivir en la raíz (`https://giancarlos25.github.io/`) y habría que actualizar las URLs absolutas de `index.html`, `sitemap.xml` y `robots.txt` para que dejen de incluir `/Portfolio-GianCarlos/`.

En **Settings → Pages**, la fuente debe ser "Deploy from a branch", rama `main`, carpeta `/ (root)`.

Para subir cambios nuevos:

```bash
git add .
git commit -m "Actualizo el portfolio"
git push
```

### Cómo está pensado

- **Sin build ni dependencias de npm.** HTML/CSS/JS puro; sirve con cualquier servidor estático (para probar la carga de proyectos de GitHub hace falta `http://`, no `file://`, por CORS).
- **Proyectos en directo.** La sección "Más repositorios" llama a `https://api.github.com/users/GianCarlos25/repos` desde el navegador de quien visita la web, así que se actualiza sola. Se cachea una hora en `localStorage` para no golpear el límite de la API.
- **Los cuatro proyectos destacados están escritos a mano** en `index.html`. HappyCorner Menu y SkillShelf enlazan directo a su repositorio real; HotelAPI y App Control de Gastos usan el script para encontrarlos automáticamente por nombre (si renombras esos repos, ajusta la palabra clave en `data-repo-match` de cada tarjeta).
- **Un solo tema oscuro**, deliberado. Un único color de acento (`--accent` en `css/styles.css`) usado en toda la web.
- **Rendimiento primero:** sin frameworks, una sola fuente de Google Fonts, animaciones solo con `transform`/`opacity`, todo el movimiento respeta `prefers-reduced-motion`.

### Cosas que quizá quieras cambiar

- **Enlaces de HotelAPI y App Control de Gastos:** en cuanto existan en GitHub con nombres que contengan "hotel" o "gasto"/"expense", el enlace se rellena solo.
- **Dominio propio:** cuando compres uno, añade un archivo `CNAME` en la raíz con el dominio dentro, configura el DNS apuntando a GitHub Pages, y actualízalo en `Settings → Pages`. Luego cambia `og:url` y `canonical` en `index.html`.
- **Formulario de contacto real:** ahora mismo "Hablemos" usa `mailto:`. Formspree o Web3Forms funcionan sin backend propio si más adelante quieres un formulario que envíe correos.
- **Foto:** el hero es tipográfico a propósito. Si quieres añadir una, el bloque `.hero__visual` en `css/styles.css` es donde tendría que integrarse.
