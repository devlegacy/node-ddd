# Clean Architecture

## Arquitectura en capas

- Controllers
- Services
- Data access

## Arquitectura hexagonal / Clean architecture / The onion architecture / Ports & Adapter Architecture

Separar la infraestructura de la lógica del negocio
Entradas y salidas en el borde de nuestro diseño

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

https://github.com/MarluanEspiritusanto/UNICDA-Requests

https://www.youtube.com/watch?v=gc-v3_LDjPk

mongo
src
  controllers
  core
    entities
    interactors
    repositories
  dataSource
