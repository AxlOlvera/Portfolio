# Portafolio Personal — Mario Axl Sánchez Olvera

Portafolio profesional Full Stack desarrollado con HTML5, CSS puro y JavaScript modular. Diseño premium estilo corporativo ("Manhattan Slate") con sistema bilingüe ES/EN, integración de EmailJS y arquitectura de archivos modular sin dependencias de frameworks.

## 🎯 Características

- ✅ HTML5 semántico con atributos `data-i18n` para internacionalización
- ✅ Sistema bilingüe ES / EN sin recarga de página
- ✅ Diseño "Manhattan Slate" — paleta corporativa con acento dorado champagne
- ✅ Tipografía premium: DM Serif Display + DM Sans
- ✅ CSS puro con metodología BEM y variables CSS (`--color-gold`, `--bg-projects`, etc.)
- ✅ Fondos por sección diferenciados (sistema nombrado, no `nth-child`)
- ✅ Íconos de tecnologías via Devicon CDN
- ✅ JavaScript modular (ES6+ con `import/export`)
- ✅ Formulario de contacto con EmailJS
- ✅ Animaciones con Intersection Observer
- ✅ Diseño completamente responsive
- ✅ Accesibilidad: `prefers-reduced-motion`, `aria-label`, `focus-visible`

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html                  # Página principal
├── favicon.ico                 # Favicon (generado en favicon.io)
├── css/
│   ├── base.css               # Variables CSS, reset, tipografía, paleta Manhattan Slate
│   ├── layout.css             # Estructura, grid, secciones, fondos por sección, hero
│   ├── components.css         # Botones, cards, formulario, skills, nav, feedback
│   └── animations.css         # Keyframes, scroll reveal, transiciones
├── js/
│   ├── main.js                # Entry point — importa y coordina todos los módulos ES6
│   ├── portfolio.js           # Sistema bilingüe ES/EN + integración EmailJS (script regular)
│   └── modules/
│       ├── navigation.js      # Menú móvil, scroll spy, header scrolled
│       ├── scroll-animations.js # Intersection Observer, animaciones en scroll
│       ├── form-handler.js    # Validación en tiempo real del formulario
│       └── smooth-scroll.js   # Scroll suave con easing personalizado
└── README.md
```

## 🚀 Instalación y Uso

### Clonar el repositorio

```bash
git clone https://github.com/AxlOlvera/[nombre-del-repo]
cd portfolio
```

### Abrir en el navegador

No requiere servidor ni build tool — abre directamente:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

> **Nota:** Para que los ES6 modules (`import/export` en `main.js`) funcionen sin errores CORS, es recomendable usar un servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code.

## 🌐 Sistema Bilingüe ES / EN

Implementado en `js/portfolio.js` sin librerías externas.

### Cómo funciona

Cada elemento de texto en el HTML tiene un atributo `data-i18n` con una clave:

```html
<span data-i18n="nav.inicio">Inicio</span>
<p data-i18n="hero.description">Especializado en Java...</p>
```

El objeto `translations` en `portfolio.js` mapea cada clave a su texto en ambos idiomas. Al hacer clic en el botón `#langToggle`, `applyTranslations(lang)` recorre el DOM y actualiza cada elemento.

### Agregar un texto nuevo

1. Agrega el atributo en el HTML: `data-i18n="mi.clave"`
2. Agrega la clave en `portfolio.js` en ambos idiomas:

```javascript
const translations = {
  es: { 'mi.clave': 'Mi texto en español' },
  en: { 'mi.clave': 'My text in English'  }
};
```

## 📧 Integración EmailJS

El formulario de contacto usa [EmailJS](https://www.emailjs.com) para enviar correos directamente desde el frontend, sin backend.

### Activar EmailJS

1. Crea una cuenta en [emailjs.com](https://www.emailjs.com) (plan gratuito: 200 correos/mes)
2. Crea un **Servicio** de correo (Gmail, Outlook, etc.)
3. Crea una **Plantilla** con estas variables:
   - `{{name}}` — nombre del remitente
   - `{{email}}` — email del remitente
   - `{{message}}` — cuerpo del mensaje
4. Ve a **Account → API Keys** y copia tu Public Key
5. Reemplaza los placeholders en `js/portfolio.js`:

```javascript
emailjs.init('YOUR_PUBLIC_KEY');   // ← tu clave pública

emailjs.send(
  'YOUR_SERVICE_ID',               // ← ID de tu servicio
  'YOUR_TEMPLATE_ID',              // ← ID de tu plantilla
  templateParams
);
```

> **Seguridad:** No subas claves reales a repositorios públicos. Si usas Vite o Webpack, guárdalas en un archivo `.env`.

## 🎨 Sistema de Diseño — "Manhattan Slate"

El diseño usa una paleta corporativa sobria inspirada en fintech y arquitectura moderna.

### Paleta de colores

| Token                  | Valor     | Uso                                  |
|------------------------|-----------|---------------------------------------|
| `--color-primary`      | `#0D1B2A` | Navy profundo — estructura principal  |
| `--color-secondary`    | `#1A2F47` | Azul acero — elementos secundarios    |
| `--color-accent`       | `#1E4A8C` | Azul corporativo — links, CTAs        |
| `--color-gold`         | `#AA8847` | Dorado champagne — acento premium     |
| `--color-canvas`       | `#F7F6F3` | Blanco roto cálido — fondo del body   |
| `--color-surface`      | `#FFFFFF` | Blanco puro — cards elevadas          |

### Fondos por sección

Cada sección tiene su propio fondo nombrado (sistema explícito, no `nth-child`):

| Sección      | Token          | Valor     | Efecto                        |
|--------------|----------------|-----------|-------------------------------|
| Hero         | `--bg-hero`    | `#F5F4F1` | Parchment cálido — bienvenida |
| Sobre mí     | `--bg-about`   | `#FFFFFF` | Blanco — cards destacan       |
| Proyectos    | `--bg-projects`| `#EBF0F7` | Azul-gris frío — importancia  |
| Habilidades  | `--bg-skills`  | `#F3F2EF` | Cálido suave — pausa visual   |
| Contacto     | `--bg-contact` | `#E9EDF4` | Gris-azul profundo — cierre   |

### Tipografía

- **Títulos:** DM Serif Display — editorial, autoridad, elegancia
- **Cuerpo:** DM Sans — limpia, moderna, muy legible en pantalla

### Personalizar colores

Edita las variables en `css/base.css`:

```css
:root {
  --color-gold:    #AA8847;   /* Cambia el acento dorado */
  --color-primary: #0D1B2A;   /* Cambia el navy principal */
  --bg-projects:   #EBF0F7;   /* Cambia el fondo de proyectos */
}
```

## ⚡ JavaScript Modular

### Arquitectura de dos capas

El proyecto separa dos tipos de scripts para evitar conflictos entre ES6 modules y scripts globales:

**`main.js` (type="module"):** Coordina los módulos ES6 del sistema original.
```javascript
import { navigation }      from './modules/navigation.js';
import { scrollAnimations } from './modules/scroll-animations.js';
import { formHandler }     from './modules/form-handler.js';
import { smoothScroll }    from './modules/smooth-scroll.js';
```

**`portfolio.js` (script regular):** Sistema bilingüe + EmailJS. Se carga como script normal para compatibilidad con el CDN de EmailJS que usa variables globales (`emailjs`).

### Módulos

| Módulo                 | Responsabilidad                                       |
|------------------------|-------------------------------------------------------|
| `navigation.js`        | Menú hamburguesa, scroll spy, header on scroll        |
| `scroll-animations.js` | Intersection Observer, fade/slide/scale en scroll     |
| `form-handler.js`      | Validación en tiempo real, mensajes de error          |
| `smooth-scroll.js`     | Scroll suave con easing cúbico personalizado          |
| `portfolio.js`         | Traducción ES/EN, EmailJS, feedback del formulario    |

## 📱 Responsive Design

Breakpoints definidos en los archivos CSS:

| Breakpoint | Ancho        | Comportamiento                              |
|------------|--------------|---------------------------------------------|
| Desktop    | > 1024px     | Layout de dos columnas, sticky about stats  |
| Tablet     | 768–1024px   | Grid de una columna, menú hamburguesa       |
| Mobile     | < 768px      | Navegación en panel full-height, stack      |
| Small      | < 480px      | Tipo reducido, padding ajustado             |

## 🔧 Personalización

### Agregar un proyecto

En `index.html`, duplica un `<article class="project-card">` en la sección `#proyectos`:

```html
<article class="project-card">
  <div class="project-card__image">
    <div class="project-card__image-placeholder"><!-- SVG o imagen --></div>
  </div>
  <div class="project-card__content">
    <h3 class="project-card__title">Nombre del Proyecto</h3>
    <p class="project-card__description" data-i18n="projects.nuevo.desc">
      Descripción del proyecto...
    </p>
    <ul class="project-card__tech">
      <li class="project-card__tech-item">React</li>
    </ul>
    <div class="project-card__links">
      <a href="https://github.com/AxlOlvera/repo" class="project-card__link">
        <!-- ícono GitHub SVG -->
      </a>
    </div>
  </div>
</article>
```

Agrega la traducción en `js/portfolio.js`:
```javascript
es: { 'projects.nuevo.desc': 'Descripción en español' },
en: { 'projects.nuevo.desc': 'Description in English'  }
```

### Agregar una habilidad

En la sección `#habilidades`, dentro del `skill-category` correspondiente:

```html
<div class="skill-icon-item">
  <i class="devicon-[tecnologia]-plain colored"></i>
  <span>Nombre</span>
</div>
```

Encuentra el nombre de clase correcto en [devicon.dev](https://devicon.dev).

### Actualizar información de contacto

En `index.html`, busca la sección `#contacto` y actualiza los `href` y texto de los `.contact__method`:

```html
<a href="mailto:tu.email@gmail.com" class="contact__method">
<a href="https://github.com/tu-usuario" class="contact__method">
<a href="https://linkedin.com/in/tu-perfil" class="contact__method">
```

## 📋 Checklist de Producción

- [x] Información personal actualizada (nombre, email, GitHub, LinkedIn)
- [x] Proyectos reales con descripción y links correctos
- [x] Favicon en la raíz del proyecto
- [x] Claves de EmailJS configuradas (reemplazar placeholders)
- [x] Links de GitHub de cada proyecto apuntan al repositorio correcto
- [ ] Imágenes reales de proyectos (actualmente placeholders SVG)
- [ ] Deploy (GitHub Pages, Netlify, Vercel)

## 🌍 Compatibilidad

- Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- iOS Safari 14+
- Android Chrome 90+
- Sin dependencias de npm ni build tools — funciona directamente en el navegador

## 👨‍💻 Autor

**Mario Axl Sánchez Olvera** — Full Stack Developer

- GitHub: [@AxlOlvera](https://github.com/AxlOlvera)
- LinkedIn: [axl-sanchez](https://www.linkedin.com/in/axl-sanchez/)
- Email: Axl.sanchezolvera@gmail.com

---

*Desarrollado como proyecto de portafolio profesional — Generation México Bootcamp*
