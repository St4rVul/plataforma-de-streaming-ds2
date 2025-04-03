# Plataforma de Streaming

Una plataforma de streaming moderna construida con React.js, TypeScript, NestJS y PostgreSQL.

## 🚀 Características

- Autenticación con Firebase (email, Google, Facebook, Apple)
- Reproducción de video adaptativa (HLS/MPEG-DASH)
- Sistema de suscripciones con Stripe
- Almacenamiento de archivos en FireBase
- Panel de administración
- Soporte para subtítulos y audio multilingüe
- Sistema de recomendaciones

## 🛠️ Tecnologías

### Frontend

- React.js
- TypeScript
- Video.js
- TailwindCSS
- Firebase Auth
- Stripe Elements

### Backend

- NestJS
- PostgreSQL
- TypeORM
- AWS SDK
- Stripe API
- Firebase Admin SDK

## 📦 Instalación

### Requisitos previos

- Node.js (v16 o superior)
- PostgreSQL
- Cuenta de FireBase
- Cuenta de Stripe
- Proyecto de Firebase

### Configuración del entorno

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/streaming-platform.git
cd streaming-platform
```

2. Instalar dependencias del frontend:

```bash
npm install
```

3. Instalar dependencias del backend:

```bash
cd backend
npm install
```

4. Configurar variables de entorno:

Frontend (.env):

```
REACT_APP_FIREBASE_API_KEY=tu-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=tu-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
REACT_APP_FIREBASE_APP_ID=tu-app-id
REACT_APP_STRIPE_PUBLIC_KEY=tu-stripe-public-key
```

Backend (.env):

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-contraseña
DB_DATABASE=streaming_db
JWT_SECRET=tu-jwt-secret
AWS_REGION=tu-region
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
AWS_BUCKET_NAME=tu-bucket-name
STRIPE_SECRET_KEY=tu-stripe-secret-key
STRIPE_WEBHOOK_SECRET=tu-webhook-secret
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_CLIENT_EMAIL=tu-client-email
FIREBASE_PRIVATE_KEY=tu-private-key
```

## 🚀 Ejecución

### Frontend

```bash
npm start
```

### Backend

```bash
cd backend
npm run start:dev
```

## 📝 Estructura del Proyecto

```
streaming-platform/
├── src/                    # Código fuente del frontend
│   ├── components/        # Componentes React
│   │   ├── pages/            # Páginas de la aplicación
│   │   └── utils/            # Utilidades
│   └── services/         # Servicios y APIs
├── backend/              # Código fuente del backend
│   ├── src/
│   │   ├── auth/        # Autenticación
│   │   ├── content/     # Gestión de contenido
│   │   ├── payment/     # Integración con Stripe
│   │   ├── storage/     # Almacenamiento en S3
│   │   └── users/       # Gestión de usuarios
│   └── test/            # Pruebas
└── README.md
```

## 🔒 Seguridad

- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Protección contra CSRF
- Validación de datos
- Sanitización de entradas
- Cumplimiento GDPR

## 📈 Escalabilidad

- Arquitectura en microservicios
- Caché distribuido
- Balanceo de carga
- CDN para contenido estático
- Base de datos replicada

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
