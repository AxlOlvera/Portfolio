# Guía Rápida de Personalización

Esta guía te ayudará a personalizar tu portafolio de manera rápida y efectiva.

## 📝 Paso 1: Información Personal

### En `index.html`:

**Línea 6** - Título de la página:
```html
<title>Tu Nombre | Desarrollador Full Stack</title>
```

**Líneas 24-26** - Logo en la navegación:
```html
<a href="#" class="nav__logo">
    <span class="nav__logo-text">TN</span> <!-- Cambia "TN" por tus iniciales -->
</a>
```

**Líneas 51-55** - Hero section (título principal):
```html
<h1 class="hero__title">
    <span class="hero__title-name">Tu Nombre</span> <!-- Tu nombre completo -->
    <span class="hero__title-role">Desarrollador Full Stack</span> <!-- Tu título -->
</h1>
```

**Líneas 56-59** - Descripción personal:
```html
<p class="hero__description">
    <!-- Escribe aquí tu descripción personal (2-3 líneas) -->
</p>
```

## 🎯 Paso 2: Sobre Mí

### En `index.html`, sección `#sobre-mi`:

**Líneas 85-101** - Edita los tres párrafos:
```html
<p class="about__paragraph">
    <!-- Primer párrafo: ¿Quién eres? ¿Qué haces? -->
</p>
<p class="about__paragraph">
    <!-- Segundo párrafo: Tu experiencia y educación -->
</p>
<p class="about__paragraph">
    <!-- Tercer párrafo: Tus intereses y pasatiempos -->
</p>
```

**Líneas 107-145** - Actualiza las estadísticas:
```html
<h3 class="stat-card__value">10+</h3> <!-- Cambia el número -->
<p class="stat-card__label">Proyectos completados</p> <!-- Cambia el texto -->
```

## 💼 Paso 3: Proyectos

### Agregar un nuevo proyecto:

1. Copia todo el bloque de `<article class="project-card">` (líneas 163-209)
2. Pégalo antes del cierre de `<div class="projects__grid">`
3. Modifica:

```html
<h3 class="project-card__title">Nombre del Proyecto</h3>
<p class="project-card__description">
    Descripción breve de tu proyecto (2-3 líneas)
</p>
<ul class="project-card__tech">
    <li class="project-card__tech-item">Tecnología 1</li>
    <li class="project-card__tech-item">Tecnología 2</li>
    <!-- Agrega más si es necesario -->
</ul>
```

4. Actualiza los enlaces:
```html
<a href="https://github.com/tuusuario/tu-repo" class="project-card__link">
<a href="https://tu-proyecto.com" class="project-card__link">
```

### Agregar imagen al proyecto:

Reemplaza el placeholder:
```html
<!-- En lugar de: -->
<div class="project-card__image-placeholder">
    <!-- SVG aquí -->
</div>

<!-- Usa: -->
<img src="ruta/a/tu/imagen.jpg" alt="Descripción del proyecto">
```

## 🛠️ Paso 4: Habilidades

### Actualizar porcentajes:

En la sección `#habilidades`, busca las líneas con `style="--progress: XX%"` y ajusta los porcentajes:

```html
<div class="skill-item__progress" style="--progress: 90%"></div>
```

### Agregar nueva habilidad:

```html
<li class="skill-item">
    <span class="skill-item__name">Nueva Tecnología</span>
    <div class="skill-item__bar">
        <div class="skill-item__progress" style="--progress: 75%"></div>
    </div>
</li>
```

### Agregar nueva categoría de habilidades:

Copia todo el bloque `<div class="skill-category">` y modifica:

```html
<div class="skill-category">
    <h3 class="skill-category__title">Nombre de Categoría</h3>
    <ul class="skill-category__list">
        <!-- Agrega tus habilidades aquí -->
    </ul>
</div>
```

## 📧 Paso 5: Información de Contacto

### En la sección `#contacto`:

**Email:**
```html
<a href="mailto:tu.email@ejemplo.com" class="contact__method">
    <!-- SVG -->
    <span>tu.email@ejemplo.com</span>
</a>
```

**GitHub:**
```html
<a href="https://github.com/tuusuario" class="contact__method">
    <!-- SVG -->
    <span>github.com/tuusuario</span>
</a>
```

**LinkedIn:**
```html
<a href="https://linkedin.com/in/tuusuario" class="contact__method">
    <!-- SVG -->
    <span>linkedin.com/in/tuusuario</span>
</a>
```

## 🎨 Paso 6: Cambiar Colores

### En `css/base.css`, líneas 12-24:

```css
:root {
  /* Color principal (azul oscuro por defecto) */
  --color-primary: #1a1a2e;
  
  /* Color de acento (rojo/rosa por defecto) */
  --color-highlight: #e94560;
  
  /* Puedes cambiar estos valores por colores en formato HEX */
}
```

### Paletas de colores sugeridas:

**Opción 1 - Azul profesional:**
```css
--color-primary: #1e3a8a;
--color-highlight: #3b82f6;
```

**Opción 2 - Verde moderno:**
```css
--color-primary: #064e3b;
--color-highlight: #10b981;
```

**Opción 3 - Púrpura creativo:**
```css
--color-primary: #581c87;
--color-highlight: #a855f7;
```

## 🔤 Paso 7: Cambiar Fuentes

### En `index.html`, líneas 10-11:

Reemplaza las fuentes de Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE_DISPLAY&family=TU_FUENTE_BODY&display=swap" rel="stylesheet">
```

### En `css/base.css`, líneas 26-27:

```css
--font-display: 'Playfair Display', serif; /* Para títulos */
--font-body: 'Work Sans', sans-serif; /* Para texto normal */
```

## 📱 Paso 8: Conectar Formulario

### Opción 1 - Formspree (Gratis):

1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta
3. Crea un nuevo formulario
4. Copia el endpoint
5. En `index.html`, agrega el action al formulario:

```html
<form class="contact__form" id="contactForm" action="https://formspree.io/f/TU_ID" method="POST">
```

### Opción 2 - EmailJS:

Similar a Formspree, ve a [emailjs.com](https://emailjs.com)

## ✅ Checklist Final

Antes de entregar, verifica:

- [ ] Cambiaste "Tu Nombre" en todos los lugares
- [ ] Actualizaste tu email y redes sociales
- [ ] Agregaste al menos 3 proyectos reales
- [ ] Modificaste las habilidades según tu experiencia
- [ ] Personalizaste los colores (opcional)
- [ ] Conectaste el formulario de contacto
- [ ] Probaste en diferentes dispositivos
- [ ] Revisaste que todos los links funcionen
- [ ] Hiciste commits descriptivos en Git

## 🚀 Comandos Git Útiles

```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "feat: portafolio inicial"

# Conectar con GitHub
git remote add origin https://github.com/tuusuario/tu-repo.git

# Subir cambios
git push -u origin main
```

## 📞 ¿Necesitas Ayuda?

- Revisa la documentación en `README.md`
- Consulta los comentarios en el código
- Pide ayuda a tus instructores de Generation

¡Éxito con tu proyecto! 🎉
