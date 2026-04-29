# Portafolio Personal — Mario Axl Sánchez Olvera

Portafolio profesional Full Stack desplegado en GitHub Pages. Desarrollado con HTML5 semántico, CSS puro (metodología BEM + variables CSS) y JavaScript modular sin dependencias de frameworks. Diseño corporativo "Manhattan Slate" con sistema bilingüe ES/EN, formulario anti-spam de cuatro capas e integración de EmailJS.

🔗 **[axlolvera.github.io](https://axlolvera.github.io/Portfolio/)**

---

## ✅ Características

- HTML5 semántico con `data-i18n` para internacionalización
- Sistema bilingüe ES / EN sin recarga de página
- Diseño "Manhattan Slate" — paleta navy + dorado champagne
- Tipografía: DM Serif Display (títulos) + DM Sans (cuerpo)
- CSS puro con metodología BEM y variables CSS por token
- Fondos diferenciados por sección (tokens nombrados, no `nth-child`)
- Íconos de tecnologías via Devicon CDN
- JavaScript modular ES6+ con arquitectura de dos capas
- Formulario con EmailJS + sistema anti-spam de 4 capas:
  - Honeypot invisible
  - Cloudflare Turnstile (CAPTCHA moderno, no intrusivo)
  - Rate limiting client-side (localStorage)
  - Validación robusta por campo con errores inline
- Email ofuscado en JS — nunca en texto plano en el HTML
- Scroll handler con `requestAnimationFrame` (throttle real)
- Animaciones con Intersection Observer
- Responsive completo: mobile, tablet, desktop
- Accesibilidad: `prefers-reduced-motion`, `aria-expanded`, `focus-visible`

---

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html                    # Página principal
├── favicon.ico                   # Ícono de pestaña (ruta relativa, no absoluta)
├── README.md
├── CUSTOMIZATION.md              # Guía rápida de personalización
│
├── css/
│   ├── base.css                  # Variables CSS, reset, tipografía, paleta de colores
│   ├── layout.css                # Grids, secciones, hero, fondos por sección
│   ├── components.css            # Botones, cards, formulario, anti-spam UI
│   └── animations.css            # Keyframes, scroll reveal, transiciones
│
└── js/
    ├── main.js                   # Entry point ES6 — coordina módulos + bridge global
    ├── portfolio.js              # Traducciones + email ofuscado + anti-spam + submit
    └── modules/
        ├── navigation.js         # Menú móvil, scroll spy (RAF throttle), aria
        ├── scroll-animations.js  # Intersection Observer, animaciones en scroll
        ├── form-handler.js       # Validación visual por campo (solo blur/input)
        └── smooth-scroll.js      # Scroll suave con easing cúbico
```

---

## 🚀 Desarrollo local

No requiere npm, build tools ni servidor.

```bash
git clone https://github.com/AxlOlvera/[nombre-del-repo]
cd portfolio
```

Abre `index.html` directamente o usa [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code — recomendado para que los ES6 modules no generen errores CORS al abrir como archivo local.

---

## ⚡ Arquitectura JavaScript

El proyecto usa dos capas de scripts para evitar conflictos entre módulos ES6 y variables globales de CDN (`emailjs`, `turnstile`).

### Capa 1 — `main.js` (`type="module"`)

Importa y coordina los cuatro módulos ES6. Expone un bridge en `window` para que `portfolio.js` pueda usar la validación del módulo sin necesidad de `import`.

```javascript
import { navigation }       from './modules/navigation.js';
import { scrollAnimations } from './modules/scroll-animations.js';
import { formHandler }      from './modules/form-handler.js';
import { smoothScroll }     from './modules/smooth-scroll.js';

// Bridge: portfolio.js (script regular) no puede importar módulos ES6
window._formHandlerValidateAll = () => formHandler.validateAll();
```

### Capa 2 — `portfolio.js` (script regular)

Cargado sin `type="module"` para acceder a las globales del CDN. Es el **único archivo que registra el listener de `submit`** del formulario.

> **Por qué esta separación:** `form-handler.js` y `portfolio.js` antes registraban dos listeners de `submit` en el mismo formulario, causando doble envío. Ahora `form-handler.js` solo valida campos (blur/input) y `portfolio.js` es el único dueño del submit.

### Responsabilidades por módulo

| Módulo                | Responsabilidad                                                  |
|-----------------------|------------------------------------------------------------------|
| `navigation.js`       | Menú hamburguesa, scroll spy con RAF throttle, `aria-expanded`   |
| `scroll-animations.js`| Intersection Observer — fade, slide, scale al hacer scroll       |
| `form-handler.js`     | Solo validación visual por campo — sin submit handler            |
| `smooth-scroll.js`    | Scroll suave entre secciones con easing cúbico                   |
| `portfolio.js`        | Traducciones ES/EN, email ofuscado, anti-spam, submit + EmailJS  |

---

## 🛡️ Sistema Anti-Spam

El formulario aplica cuatro capas en este orden en cada envío:

### 1. Honeypot invisible

Campo oculto via CSS (no `display:none` — los bots lo detectan) que bots automáticos llenan. Si tiene valor, se simula éxito sin enviar nada.

```html
<div class="hp-field" aria-hidden="true">
  <input type="text" id="hp_website" name="website" tabindex="-1">
</div>
```

### 2. Cloudflare Turnstile

CAPTCHA moderno que analiza señales pasivas. En modo `managed` solo muestra un reto visual si el tráfico parece sospechoso — la mayoría de usuarios reales solo ven un ✓ verde sin interacción.

```html
<div class="cf-turnstile"
  data-sitekey="TU_SITEKEY_REAL"
  data-theme="light"
  data-size="compact"
  data-callback="onTurnstileSuccess"
></div>
```

**Obtener clave:** `dash.cloudflare.com → Turnstile → Add Site` — dominio: `axlolvera.github.io`

**Claves de prueba para desarrollo local:**
- Siempre pasa: `1x00000000000000000000AA`
- Siempre falla: `2x00000000000000000000AB`

### 3. Rate limiting client-side

Máximo 3 envíos por ventana de 60 segundos. Al exceder, muestra un countdown y bloquea 5 minutos. Basado en `localStorage` — disuade bots simples y evita envíos accidentales múltiples.

### 4. Validación por campo

`form-handler.js` valida en `blur` (no mientras se escribe). Detecta: longitud mínima/máxima, formato de email, HTML inyectado, y mensajes con más de 3 URLs.

---

## 📧 EmailJS

Envío de correos desde el frontend sin backend.

### Configuración

1. Crear cuenta en [emailjs.com](https://www.emailjs.com) — plan gratuito: 200 emails/mes
2. Crear un **Servicio** de correo (Gmail, Outlook, etc.)
3. Crear una **Plantilla** con estas variables exactas:
   - `{{name}}` — nombre del remitente
   - `{{email}}` — email del remitente
   - `{{message}}` — cuerpo del mensaje
4. Ir a **Account → API Keys** → copiar la Public Key
5. Actualizar en `js/portfolio.js`:

```javascript
const CONFIG = {
  emailjs: {
    publicKey:  'TU_PUBLIC_KEY',
    serviceId:  'TU_SERVICE_ID',
    templateId: 'TU_TEMPLATE_ID',
  },
};
```

---

## 🌐 Sistema Bilingüe ES / EN

Implementado en `portfolio.js` sin librerías. Cada texto en el HTML tiene `data-i18n`:

```html
<span data-i18n="nav.inicio">Inicio</span>
```

`applyTranslations(lang)` recorre el DOM al cargar y en cada clic del botón `#langToggle`.

### Agregar un texto nuevo

1. En `index.html`: `<span data-i18n="mi.clave">Texto</span>`
2. En `portfolio.js`, objeto `translations`:

```javascript
es: { 'mi.clave': 'Texto en español' },
en: { 'mi.clave': 'Text in English'  }
```

---

## 🎨 Sistema de Diseño — "Manhattan Slate"

Paleta corporativa inspirada en fintech y arquitectura moderna.

### Tokens principales

| Token               | Valor     | Uso                               |
|---------------------|-----------|-----------------------------------|
| `--color-primary`   | `#0D1B2A` | Navy profundo — estructura        |
| `--color-secondary` | `#1A2F47` | Azul acero — elementos secundarios|
| `--color-accent`    | `#1E4A8C` | Azul corporativo — links, CTAs    |
| `--color-gold`      | `#AA8847` | Dorado champagne — acento premium |
| `--color-canvas`    | `#F7F6F3` | Blanco roto cálido — body         |
| `--color-surface`   | `#FFFFFF` | Blanco puro — cards elevadas      |

### Fondos por sección

Tokens explícitos asignados por clase semántica en `layout.css`, no por posición `nth-child`.

| Sección     | Token           | Valor     |
|-------------|-----------------|-----------|
| Hero        | `--bg-hero`     | `#F5F4F1` |
| Sobre mí    | `--bg-about`    | `#FFFFFF` |
| Proyectos   | `--bg-projects` | `#EBF0F7` |
| Habilidades | `--bg-skills`   | `#F3F2EF` |
| Contacto    | `--bg-contact`  | `#E9EDF4` |

---

## 🔧 Personalización frecuente

### Agregar un proyecto

Duplicar un `<article class="project-card">` en `index.html` y agregar claves de traducción en `portfolio.js`.

### Agregar una habilidad

```html
<div class="skill-icon-item">
  <i class="devicon-react-original colored"></i>
  <span>React</span>
</div>
```

Buscar el nombre de clase en [devicon.dev](https://devicon.dev).

### Actualizar el email de contacto

El email **no está en el HTML** — está en `portfolio.js`:

```javascript
email: {
  user:   'Axl.sanchezolvera',
  domain: 'gmail.com',
},
```

`buildEmailLink()` lo inyecta en el DOM al cargar. Cambiarlo aquí es suficiente.

---

## 📱 Responsive Design

| Breakpoint | Ancho      | Comportamiento principal                    |
|------------|------------|---------------------------------------------|
| Desktop    | > 1024px   | Layout dos columnas, about stats sticky     |
| Tablet     | 768–1024px | Una columna, menú hamburguesa               |
| Mobile     | < 768px    | Panel de nav full-height, elementos apilados|
| Small      | < 480px    | Tipografía reducida, padding ajustado       |

---

## 🌍 Deploy en GitHub Pages

### Favicon — ruta relativa obligatoria

GitHub Pages sirve el sitio desde un subdirectorio. La ruta absoluta genera 404.

```html
<!-- ✅ Correcto -->
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

<!-- ❌ Genera 404 en GitHub Pages -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

### Pasos

```bash
git add .
git commit -m "feat: portafolio completo con sistema anti-spam"
git push origin main
```

`Settings → Pages → Source: Deploy from branch → main → / (root)`

---

## 📋 Checklist de producción

- [x] Información personal (nombre, email, GitHub, LinkedIn)
- [x] Proyectos reales con links a repositorios
- [x] EmailJS configurado (publicKey, serviceId, templateId)
- [x] Favicon con ruta relativa (`href="favicon.ico"`)
- [x] Email en `CONFIG.email` de `portfolio.js` (no en el HTML)
- [ ] Sitekey real de Turnstile (actualmente clave de prueba)
- [ ] Imágenes reales de proyectos (actualmente placeholders SVG)

---

## 🌍 Compatibilidad

Chrome, Firefox, Safari y Edge (últimas 2 versiones) · iOS Safari 14+ · Android Chrome 90+

Sin npm, sin build tools, sin frameworks — funciona directamente en el navegador.

---

## 👨‍💻 Autor

**Mario Axl Sánchez Olvera** — Full Stack Developer

- 🔗 [axlolvera.github.io](https://axlolvera.github.io)
- 💼 [linkedin.com/in/axl-sanchez](https://www.linkedin.com/in/axl-sanchez/)
- 🐙 [github.com/AxlOlvera](https://github.com/AxlOlvera)
- ✉️ Axl.sanchezolvera@gmail.com

---

*Desarrollado como proyecto de portafolio profesional — Generation México Bootcamp*
