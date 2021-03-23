# Clean Architecture

Bajo o ningún acoplamiento

- api / presentation / application: Recursos a internet
  - middlewares
  - routes
  - controllers
- services: Intermediario entre acceso a datos y proveedores con el API - Servicios de conexión a API's externas
- **domain** / business: Entidades principales que parten de nuestro caso de uso
- dal: data access layer / acceso a datos
- config / shared

- awilix - di

DDD

https://www.youtube.com/watch?v=gc-v3_LDjPk
