# MedicalAssist

<h1>Medical Assist</h1>
Trabajo Final - Laboratorio IV
El TP se comenzará durante la cursada y el sistema de corrección será por sprints, que tendrán tanto
funcionalidades del sistema como requerimientos mínimos de aprobación.
La entrega del TP estará compuesta por 4 sprint y una fecha más de corrección previo a la finalización
de la cursada. Una vez finalizada la cursada, el mismo TP se deberá entregar en fecha de Final con el
agregado que se solicitara para esas instancias.

## Web App 🚀

https://laboratorio-4-9d005.web.app/

### Instalación y ejecución 🔧


## Build with 🛠️

* [Angular](https://angular.io/docs)
* [Material](https://material.angular.io/)
* [Firebase](https://firebase.google.com/docs)

---
## Requerimientos de la Aplicación
Debemos realizar un sistema según las necesidades y deseos del cliente, para eso tenemos unabreve descripción de lo que el cliente nos comenta acerca de su negocio.
La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad), dos laboratorios (físicos en la clínica), y una salade espera general. Está abierta al público de lunesa viernes en el horario de 8:00 a 19:00, y lossábados en el horario de 8:00 a 14:00.
Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web seleccionando el profesional o laespecialidad. La duración mínima de un turno es 30 minutos, pero los profesionales pueden cambiar la duración según su especialidad.

## Perfiles de usuarios

🔹 <strong> Profesional </strong> Puede tener más de una especialidad y el registro lo hace el profesional, necesitando la aprobación de un administrador para empezar a atender en la clinica.

🔹 <strong> Paciente </strong> Ingresa con dos imágenes de perfil y se verifica la dirección de email.

🔹 <strong> Administrador </strong> Se carga solamente por otro administrador, además de poder agregar una nueva especialidad en el alta de profesional.

⌨️ _UTN-FRA_ ⌨️

## Registro 

🔹 Bienvenidos! Arriba a la derecha podemos loguear o registrarnos

 <img src="/src/assets/images/login.gif" alt="">

🔹 Podemos registrarnos como Paciente, en donde además de los datos personales se debe cargar obligatoriamente 2 fotos.
 
 <img src="/src/assets/images/register.gif" alt="">

🔹 Podemos registrarnos como Profesional, en donde además de los datos personales se debe cargar obligatoriamente 1 o mas especialidades.

<img src="/src/assets/images/register.gif" alt="">

 ## Login

 🔹 Una vez verificado nuestro correo electrónico, podremos ingresar con nuestro email y contraseña.

 <img src="/src/assets/images/login.gif" alt="">

 🔹 Al ingresar como paciente se podrá observar la siguiente pagina de Home. Donde se podrá acceder a la lista de los turnos solicitados por el paciente, y además el apartado para solicitar uno nuevo. 

 <img src="/src/assets/images/patient/profile.gif" alt="">

  <h2> <strong>Sacar un Turno<strong> </h2>
 
🔹 Debemos seleccionar la especialidad a la cual queremos solicitar el turno, luego el profesional pertinente y por último el dia y hora disponible para nuestra solicitud.  

 <img src="/src/assets/images/patient/shifts.gif" alt="">

<h2> <strong>Home Profesional<strong> </h2>

🔹 Desde esta página de inicio podemos acceder a nuestra disponibilidad horaria, donde podremos indicar los dias y horarios de disponibilidad. Y además a la lista de turnos solicitados por los pacientes, donde podremos atenderlos.


 <h2> <strong>Horarios de Profesional<strong> </h2>

🔹 En este apartado nos encontraremos el menu en el cual el Profesional puede agregar o eliminar días y horarios de atención.

  
 <h2> <strong>Gestion de turnos<strong> </h2>
   
 🔹 Desde el lado de profesionales como pacientes se podra gestionar los turnos (ver la informacion del mismo, rechazarlo, aceptarlo, cancelarlo).
   
 🔹 Tambien calificar, agregar comentarios y ver los detalles del mismo.

  
<h2> <strong>Home Administrador<strong> </h2>

🔹 Desde esta pagina de inicio vamos a poder ver un listado de usuarios, y crear nuevos administradores.

  
🔹 Desde aqui, los administradores ademas de poder ver el listado de usuarios, pueden habilitar o deshabilitar profesionales.
  
  
🔹 Registro de administradores.
  



 <hr>

<h2> <strong>Primer Sprint - 13/5<strong> </h2>

🔹 Registro y Login con Firebase

🔹 Verificación de email para usuarios 

🔹 Perfiles de usuarios con rutas autenticadas
  
🔹 Funcionalidad de usuarios Admin para creación de nuevos administradores.

🔹 Manejos de imágenes 

🔹 Proyecto subido a Firebase

<h2> <strong>Segundo Sprint - 20/5<strong> </h2>

🔹 Se incorporó Captcha.

🔹 Listado de turnos de cada Paciente con su estado actual.

🔹 Alta de turnos.

🔹 Funcionalidad para que los profesionales agreguen su disponibilidad.

🔹 Atención de pacientes.
  
🔹 Elaboración del Readme.
  
<h2> <strong>Tercer Sprint - 27/5<strong> </h2>

🔹 Agrego seccion Mi Perfil
  
🔹 Sección Usuarios, para los Administradores
  
🔹 Agrego historia clinica a cada turno
  
<h2> <strong>Cuarto Sprint - 3/6<strong> </h2>
  
🔹 Agrego estadisticas a seccion Administrador.
  
🔹 Agrego descarga de Excel
  
🔹 Agrego descarga de PDF



## Autor ✒️

_Trabajo Práctico desarrollado por_

* **Nicolás Navarro 🚀**  [nicohnavarro](https://github.com/nicohnavarro)