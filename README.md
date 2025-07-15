# uptask


1. MVC: Patron de arq software

Ventajas
- Orden y escalibilidad
- Globalidad para trabajar con multiples desarrolladores
- Te ayuda a aprender mas facil frameworks MVC como Laravel

Model:
Se encarga de manejar lo relacionado con la Base de datos y el CRUD, se encarga de las consultas a la BD pero no  muestra los resultados

Vista (View):
Se encarga de toda la parte visual, muestra los resultados de las consultas

Controller:
Comunica model y view, antes de que el modelo consulte la BD, el controller es el encargado de llamarlo y cuando el model ya consulto, comunica a la vista los datos para que los muestre

Router:
Se encarga de registrar todas las URL's o Endpoints de nuestra app, por ejem: cuando un usuario accede a una URL, el router ya tiene las indicaciones de comunicarse con un controller en especifico, ese controller ya sabe que modelo llamar y que vista ejecutar
