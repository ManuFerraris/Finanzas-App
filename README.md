#Finanzas-App

Aplicación para la gestión de finanzas personales, diseñada con foco en escalabilidad, seguridad y mantenibilidad. Construida en TypeScript, usando Express y MikroORM, y siguiendo principios de Clean Architecture y SOLID.

*Arquitectura:*
  
  Organización basada en Clean Architecture:
  
  * Entities: lógica y reglas del dominio financiero.
  
  * Use Cases: casos de uso desacoplados de la infraestructura.
  
  * Interfaces: adaptadores como controladores HTTP y repositorios.
  
  * Infrastructure: configuración de ORM, bases de datos y servicios externos.


*Funcionalidades:*
  
  * CRUD de movimientos financieros (crear, leer, actualizar, eliminar).
  
  * Validaciones de seguridad (hashing de contraseñas, control de fuerza bruta).
  
  * Separación clara de responsabilidades con principios SOLID.
  
  * Documentación integrada para cada módulo.
  
  * Foco en testabilidad y posible integración con frontend.


*Instalación:*
  
  git clone https://github.com/tu-usuario/finance-manager-app.git
  
  cd finance-manager-app
  
  npm install

  Uso y desarrollo:
    La API estará disponible en http://localhost:3000.
    Endpoints principales:
    
      POST /movimientos — Crear movimiento financiero
      GET /movimientos — Listar movimientos
      PUT /movimientos/:id — Editar movimiento
      DELETE /movimientos/:id — Eliminar movimiento
    
      POST /categorias — Crear una categoria
      GET /categorias — Listar categorias
      PUT /categorias/:nro — Editar categoria
      DELETE /categorias/:nro — Eliminar categoria

*Aprendizajes y decisiones técnicas*

Este proyecto documenta el uso práctico de:
  
  * MikroORM para manejo relacional de datos.
  
  * Implementación de Clean Architecture en TypeScript.
  
  * Modularidad y desacoplamiento de lógica de negocio.
  
  * Buenas prácticas de validación y seguridad.

📚*Referencias y contribuciones*

Este repositorio es parte de mi *proceso de aprendizaje* sobre arquitectura limpia y desarrollo backend profesional.
Feedback y aportes son bienvenidos!
