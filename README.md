# Portafolio Personal - Generation México

Portafolio profesional desarrollado como proyecto final del bootcamp de Generation México. Diseñado con un enfoque en código limpio, arquitectura modular y mejores prácticas de desarrollo frontend.

## 🎯 Características

- ✅ HTML5 semántico
- ✅ CSS puro con metodología BEM
- ✅ JavaScript modular (ES6+)
- ✅ Diseño responsive
- ✅ Animaciones fluidas
- ✅ Validación de formularios
- ✅ Optimizado para rendimiento
- ✅ Accesibilidad (WCAG)

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html              # Página principal
├── css/
│   ├── base.css           # Variables, reset, tipografía
│   ├── layout.css         # Estructura y layouts
│   ├── components.css     # Componentes reutilizables
│   └── animations.css     # Animaciones y transiciones
├── js/
│   ├── main.js            # Punto de entrada principal
│   └── modules/
│       ├── navigation.js       # Navegación y menú móvil
│       ├── scroll-animations.js # Animaciones en scroll
│       ├── form-handler.js     # Validación de formularios
│       └── smooth-scroll.js    # Scroll suave
└── README.md
```

## 🚀 Cómo Usar

### Instalación Local

1. Clona el repositorio:
```bash
git clone [tu-repositorio]
cd portfolio
```

2. Abre `index.html` en tu navegador:
```bash
# En macOS
open index.html

# En Linux
xdg-open index.html

# En Windows
start index.html
```

### Personalización

#### 1. Información Personal

Edita `index.html` y actualiza:
- Nombre y título profesional
- Texto de presentación
- Links de redes sociales
- Información de contacto

#### 2. Proyectos

Duplica y modifica las tarjetas de proyecto en la sección `#proyectos`:

```html
<article class="project-card">
  <div class="project-card__image">
    <!-- Aquí puedes agregar una imagen real -->
  </div>
  <div class="project-card__content">
    <h3 class="project-card__title">Nombre del Proyecto</h3>
    <p class="project-card__description">Descripción...</p>
    <!-- ... -->
  </div>
</article>
```

#### 3. Habilidades

Actualiza los porcentajes en la sección `#habilidades`:

```html
<div class="skill-item__progress" style="--progress: 85%"></div>
```

#### 4. Colores y Estilos

Modifica las variables CSS en `css/base.css`:

```css
:root {
  --color-primary: #1a1a2e;
  --color-highlight: #e94560;
  /* ... más variables */
}
```

## 🎨 Metodología BEM

Seguimos la metodología BEM (Block Element Modifier) para nombrar clases:

```css
/* Block */
.project-card { }

/* Element */
.project-card__title { }
.project-card__description { }

/* Modifier */
.project-card--featured { }
```

## 📱 Responsive Design

El portafolio es completamente responsive con breakpoints en:
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## ⚡ JavaScript Modular

Cada módulo tiene una responsabilidad única:

- **navigation.js**: Manejo del menú y navegación
- **scroll-animations.js**: Animaciones basadas en scroll
- **form-handler.js**: Validación y envío de formulario
- **smooth-scroll.js**: Scroll suave entre secciones

## 🔧 Funcionalidades JavaScript

### Navegación
- Menú hamburguesa responsive
- Scroll spy (resalta sección activa)
- Cierre automático en mobile

### Animaciones
- Intersection Observer para scroll animations
- Animaciones de entrada staggered
- Optimización de rendimiento

### Formulario
- Validación en tiempo real
- Mensajes de error claros
- Notificaciones de éxito/error

## 🎯 Mejores Prácticas Implementadas

### HTML
- Uso de tags semánticos (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`)
- Un solo `<main>` por página
- Atributos ARIA para accesibilidad
- Meta tags para SEO

### CSS
- CSS Variables para temas consistentes
- Mobile-first approach
- Animaciones con `will-change` para performance
- `prefers-reduced-motion` para accesibilidad

### JavaScript
- ES6 Modules
- Patrón Revealing Module
- Separación de responsabilidades
- Event delegation
- Performance optimizations (Intersection Observer)

## 📋 Checklist de Entrega

- [x] HTML semántico
- [x] CSS con metodología BEM
- [x] JavaScript modular
- [x] Diseño responsive
- [x] Validación de formularios
- [x] Animaciones
- [x] Código comentado
- [x] README completo
- [x] Git commits descriptivos

## 🚧 Próximas Mejoras

Una vez entregado el proyecto, puedes considerar:

1. Agregar imágenes reales de proyectos
2. Conectar el formulario a un backend real
3. Implementar dark mode
4. Agregar más proyectos
5. Integrar un blog
6. Añadir testimonios

## 📝 Notas de Desarrollo

### Sin Dependencias Externas
- No usamos frameworks CSS (Bootstrap solo para grid si es necesario)
- No usamos jQuery
- JavaScript vanilla puro
- Performance óptimo

### Compatibilidad
- Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- iOS Safari 12+
- Android Chrome 80+

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tuusuario](https://github.com/tuusuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tuusuario)
- Email: tu.email@ejemplo.com

## 📄 Licencia

Este proyecto fue desarrollado como parte del bootcamp de Generation México.

---

**Desarrollado con ❤️ para Generation México**
