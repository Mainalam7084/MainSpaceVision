# MainSpaceVision

Una aplicación de exploración espacial construida con React Native y Expo, utilizando la API de la NASA.

## Características

- **Exploración Espacial**: Visualiza la Imagen Astronómica del Día (APOD).
- **Mars Rovers**: Explora fotos tomadas por los rovers Curiosity, Opportunity y Spirit.
- **Objetos Cercanos (NEOs)**: Monitorea asteroides cercanos a la Tierra.
- **Búsqueda**: Busca en la vasta librería de imágenes de la NASA.
- **Favoritos**: Guarda tus imágenes favoritas localmente.
- **Diseño Moderno**: Interfaz oscura y elegante con estilo espacial.

## Requisitos Previos

- Node.js (LTS recomendado)
- npm o yarn
- Dispositivo móvil con la app **Expo Go** instalada (Compatible con SDK 54)

## Instalación

1.  **Clonar o descargar el proyecto**:
    Asegúrate de estar en la carpeta del proyecto.

2.  **Instalar dependencias**:
    Ejecuta el siguiente comando en tu terminal para instalar todas las librerías necesarias:
    ```bash
    npm install
    ```
    o
    ```bash
    npx expo install
    ```

## Ejecución

1.  **Iniciar el servidor de desarrollo**:
    ```bash
    npx expo start
    ```

2.  **Abrir en tu móvil**:
    - Escanea el código QR que aparece en la terminal con la cámara de tu móvil (iOS) o desde la app Expo Go (Android).
    - Asegúrate de que tu móvil y tu ordenador estén conectados a la misma red Wi-Fi.

## Configuración de API Key (Opcional)

La app viene con una API Key de demostración. Para una experiencia completa y sin límites de velocidad, obtén tu propia key en [api.nasa.gov](https://api.nasa.gov/) y reemplázala en `src/api/nasa.js`:

```javascript
const DEFAULT_API_KEY = 'TU_API_KEY_AQUI';
```

## Estructura del Proyecto

- `src/api`: Funciones para conectar con la API de la NASA.
- `src/components`: Componentes reutilizables (Tarjetas, Visores, etc.).
- `src/screens`: Pantallas principales de la aplicación.
- `src/hooks`: Lógica personalizada (Contexto de Favoritos).
- `src/utils`: Utilidades auxiliares (Fechas, Almacenamiento).
- `assets`: Imágenes y recursos estáticos.

## Solución de Problemas

- **Error de Assets**: Si faltan iconos, asegúrate de que la carpeta `assets` contenga `icon.png`, `splash.png`, etc. (Este proyecto ya los incluye).
- **Límites de API**: Si las imágenes no cargan, es posible que la API Key de demo haya excedido su límite. Usa una key propia.

¡Disfruta explorando el universo!
