# Expenses Manager

Aplicación web para gestionar gastos mensuales, tarjetas de crédito, cuotas y servicios, con sus próximas fechas de vencimiento.

El proyecto está dividido en dos aplicaciones:

- **Frontend:** Angular 20, Angular Signals y Tailwind CSS 4.
- **Backend:** NestJS 11, Prisma 7 y PostgreSQL.

El frontend consume la API del backend en `http://localhost:3000`.

## Requisitos

- Node.js compatible con Angular 20 y npm.
- PostgreSQL en ejecución.
- Git, si se clona el repositorio.

## Estructura del proyecto

```text
Money_manager/
├── expenses-manager/                         # Aplicación Angular
│   ├── src/app/components/                   # Componentes de layout y funcionalidades
│   ├── src/app/pages/                        # Login y dashboard
│   ├── src/app/models/                       # Modelos del dominio
│   └── src/app/services/                     # Auth, estado y clientes HTTP
└── backend-expenses-manager/
    └── expenses-manager-api/                 # API NestJS
        ├── prisma/schema.prisma              # Modelo de datos
        ├── prisma/migrations/                # Migraciones de PostgreSQL
        └── src/                              # Módulos, controladores y servicios
```

## Puesta en funcionamiento

### 1. Configurar la base de datos

Crea una base de datos PostgreSQL y define la cadena de conexión en:

`backend-expenses-manager/expenses-manager-api/.env`

```env
DATABASE_URL="postgresql://USUARIO:CONTRASENA@localhost:5432/expenses_manager"
```

Sustituye `USUARIO`, `CONTRASENA` y el nombre de la base de datos por los valores de tu instalación.

### 2. Instalar y preparar el backend

Desde `backend-expenses-manager/expenses-manager-api`:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

Para desarrollo, cuando se modifique `schema.prisma`, puede utilizarse:

```bash
npx prisma migrate dev --name descripcion-del-cambio
```

### 3. Crear un usuario

El login necesita un usuario registrado. La API expone un endpoint para crearlo; la contraseña se almacena cifrada mediante bcrypt.

Con el backend iniciado, ejecuta:

```bash
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Usuario","email":"usuario@example.com","password":"password123"}'
```

En PowerShell puede utilizarse `Invoke-RestMethod`:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/usuario `
  -ContentType "application/json" `
  -Body '{"nombre":"Usuario","email":"usuario@example.com","password":"password123"}'
```

### 4. Iniciar el backend

Desde la carpeta del backend:

```bash
npm run start:dev
```

La API quedará disponible en `http://localhost:3000`.

También están disponibles `npm run start` para ejecutar sin watch y `npm run start:prod` después de compilar.

### 5. Instalar y ejecutar el frontend

En otra terminal, desde `expenses-manager`:

```bash
npm install
npm start
```

Abre `http://localhost:4200` en el navegador e inicia sesión con el usuario creado.

## Comandos útiles

### Frontend

```bash
npm start       # Servidor de desarrollo
npm run build   # Build de producción
npm test        # Tests unitarios
```

### Backend

```bash
npm run start:dev  # Servidor con recarga automática
npm run build      # Compilación
npm test           # Tests unitarios
npm run test:e2e   # Tests end-to-end
npm run test:cov   # Cobertura de tests
```

### Prisma

```bash
npx prisma migrate status  # Estado de las migraciones
npx prisma studio         # Explorador visual de la base de datos
npx prisma generate       # Regenerar el cliente Prisma
```

## Funcionalidades actuales

- Login mediante email y contraseña con JWT.
- Alta, edición y eliminación de tarjetas.
- Alta, edición y eliminación de servicios.
- Gestión de cuotas asociadas a tarjetas.
- Empresas asociadas a tarjetas y servicios.
- Cálculo de totales mensuales.
- Listado de próximos vencimientos.
- Navegación lateral y formularios modales.

## Endpoints principales

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/auth/login` | Iniciar sesión y obtener un JWT |
| `POST` | `/usuario` | Crear un usuario |
| `GET`, `POST`, `PATCH`, `DELETE` | `/tarjeta` | Gestionar tarjetas |
| `GET`, `POST`, `PATCH`, `DELETE` | `/servicio` | Gestionar servicios |
| `GET`, `POST`, `PATCH`, `DELETE` | `/cuota` | Gestionar cuotas |
| `GET`, `POST`, `PATCH`, `DELETE` | `/empresa` | Gestionar empresas |

## Notas de dominio

- `monto` de una tarjeta representa el total fijo del resumen bancario; no se calcula a partir de sus cuotas.
- Las cuotas son informativas y se actualiza su cuota actual tomando como referencia `fechaCarga`.
- Las URLs de la API están configuradas actualmente de forma fija en los servicios Angular como `http://localhost:3000`.
- NestJS tiene CORS habilitado para permitir el acceso desde el frontend local.
