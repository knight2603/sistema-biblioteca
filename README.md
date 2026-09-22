# Sistema de Biblioteca

Sistema web para gestionar una biblioteca.

La aplicación permite gestionar libros, usuarios, préstamos y devoluciones, además de consultar estadísticas de la biblioteca.

## Tecnologías

### Backend
- PHP 8.2.12
- Laravel 12.69.2
- MariaDB / MySQL
- PHPUnit / Pest

### Frontend
- React
- Vite
- JavaScript
- React Router
- Font Awesome
- HTML5
- CSS3

## Funcionalidades

- CRUD completo de libros.
- CRUD de usuarios.
- Gestión de préstamos y devoluciones.
- Control de disponibilidad de libros.
- Máximo de 3 préstamos activos por usuario.
- Validaciones en formularios y API.
- Estadísticas generales de la biblioteca.
- Interfaz responsiva y accesible.
- Manejo de errores en el consumo de la API.

## Reglas de negocio

- Un libro no puede prestarse si no está disponible.
- Un usuario puede tener máximo 3 préstamos activos.
- Un préstamo devuelto no puede volver a devolverse.
- Al prestar un libro, su disponibilidad cambia automáticamente.
- Al devolverlo, vuelve a estar disponible.
- Los préstamos y devoluciones utilizan transacciones de base de datos.

## Arquitectura

El backend utiliza separación de responsabilidades:

- **Controller:** recibe las peticiones HTTP y devuelve respuestas.
- **Service:** contiene la lógica de negocio.
- **Repository:** centraliza el acceso a datos.
- **Model:** representa las entidades y relaciones mediante Eloquent ORM.
- **Database:** MariaDB / MySQL.

## API

### Libros
- `GET /api/books` - Listar libros.
- `POST /api/books` - Crear libro.
- `GET /api/books/{id}` - Consultar libro.
- `PUT /api/books/{id}` - Actualizar libro.
- `DELETE /api/books/{id}` - Eliminar libro.

### Usuarios
- `GET /api/users` - Listar usuarios.
- `POST /api/users` - Crear usuario.
- `GET /api/users/{id}` - Consultar usuario.
- `PUT /api/users/{id}` - Actualizar usuario.
- `DELETE /api/users/{id}` - Eliminar usuario.

### Préstamos
- `GET /api/loans` - Listar préstamos.
- `POST /api/loans` - Crear préstamo.
- `GET /api/loans/{id}` - Consultar préstamo.
- `PUT /api/loans/{id}` - Actualizar préstamo.
- `DELETE /api/loans/{id}` - Eliminar préstamo.

### Estadísticas
- `GET /api/statistics` - Obtener estadísticas.

## Base de datos

Las migraciones se encuentran en:

`database/migrations/`

También se incluye un archivo SQL para importar la estructura y datos de prueba:

`database/mibiblioteca.sql`

## Instalación

### Backend



## Pruebas
El proyecto incluye pruebas automatizadas para las principales funcionalidades y reglas de negocio.