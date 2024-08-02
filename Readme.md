Descripción:

La aplicación corre en front end con el framework de Angular, para arrancar la aplicación en localhost, deberá situarse en la carpeta de 
FronEndAngular en consola poner el comando 'ng serve'. Esta aplicación hace peticiones HTTP a un Backend desarrollado en NodeJs y utilizando
una base de datos SQL Server. Se incluirá en el proyecto un Script para crear las bases de datos para que este funcione de manera correcta.

Para arrancar el backend sera necesario situarse en la carpeta Bacend NodeJs. En consola ejecutar el comando npm run dev, así este esta activo. 



Pasos para el uso de la aplicación 

    1. Generar primero una base de datos llamada DbPrueba, despues con el archivo Script las tablas correspondientes.
    2. Generar un usuario y contraseña. Importante que el correo sea un correo real, ya que al no contar con el correo real no se podrá visualizar la función de mandar correo.
    3. Una vez iniciada la sesión, usted podrá observar la vista de búsqueda de videos, podrá seleccionarlos para favoritos. 
    4. En la pestaña de favoritos podrá visualizar los videos que se seleccionaron y podrá también quitarlos de la lista. Esta lista de favoritos, solo mostrara los favoritos
       que se seleccionaron en la sección. No podrá observar los de otras sesiones.
    5. En la pestaña de monitoreo podrá observar los inicios de sesión que se realizaron. Esta pestaña no tiene autenticación, dado que solo es una muestra de los registros que
       se han hecho.
    6. En la parte de búsqueda si pone en link de video, podrá ver el video en la plataforma de YouTube, con la finalidad de comprobar que estas búsquedas son realizadas con la api de
       YouTube.
