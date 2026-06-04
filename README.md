# OVA #14 — Teoría de la Información

**Objeto Virtual de Aprendizaje** desarrollado para la asignatura *Teoría en Sistemas* (2026)  
Universidad Simón Bolívar — Sede Cúcuta  
Autor: **Jesús David Sarmiento Ortiz**

---

## Descripción

Página web educativa interactiva sobre los fundamentos de la **Teoría de la Información de Shannon** (1948). Cubre desde la contextualización histórica hasta ejercicios prácticos, juegos y un quiz evaluativo de 10 preguntas.

El proyecto es completamente estático — no requiere servidor ni dependencias externas — y puede desplegarse directamente en GitHub Pages.

---

## Contenido

| Sección | Descripción |
|---|---|
| Contextualización | Biografía de Shannon, relevancia histórica y conexión con TGS |
| Marco teórico | Definición de información, entropía H(X), modelo de comunicación de Shannon |
| Ejemplos prácticos | WhatsApp, códigos QR, ADN como canal biológico, criptografía |
| Ejercicios | 4 ejercicios con retroalimentación automática |
| Juegos interactivos | Decodificador ASCII, Drag & Drop del modelo de Shannon, Canal con Ruido |
| Videos de apoyo | 4 videos académicos en español sobre Teoría de la Información |
| Quiz | 10 preguntas de selección múltiple con explicación por respuesta |
| Créditos | Ficha técnica y referencias bibliográficas en formato APA |

---

## Estructura del proyecto

```
ova-14-teoria-informacion/
├── index.html      # Estructura y contenido de la página
├── styles.css      # Estilos (diseño clásico académico)
├── main.js         # Lógica de juegos, ejercicios y quiz
└── README.md
```

---

## Uso

### Ver localmente

Abre `index.html` directamente en cualquier navegador moderno. No se necesita servidor.

### Desplegar en GitHub Pages

1. Sube los tres archivos (`index.html`, `styles.css`, `main.js`) a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En *Source*, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. GitHub Pages generará la URL pública en unos segundos.

---

## Tecnologías

- HTML5 semántico
- CSS3 (variables, Grid, Flexbox, animaciones)
- JavaScript vanilla (ES6+)

No usa frameworks ni librerías externas. Sin dependencias npm.

---

## Referencias bibliográficas

- Shannon, C. E. (1948). *A Mathematical Theory of Communication*. Bell System Technical Journal, 27(3), 379–423.
- Cover, T. M., & Thomas, J. A. (2006). *Elements of Information Theory* (2nd ed.). Wiley-Interscience.
- Gleick, J. (2011). *The Information: A History, a Theory, a Flood*. Pantheon Books.
- Mackay, D. J. C. (2003). *Information Theory, Inference, and Learning Algorithms*. Cambridge University Press.
- von Bertalanffy, L. (1968). *General System Theory*. George Braziller.
- Wiener, N. (1948). *Cybernetics: Or Control and Communication in the Animal and the Machine*. MIT Press.

---

## Licencia

Proyecto académico sin fines comerciales.  
Universidad Simón Bolívar Cúcuta · Teoría en Sistemas 2026
