# F1Bets
Parte de Ionic del TFG

## Enlace a la página desplegada en Netlify
https://f1bets.netlify.app

## Descripción
  F1Bets es una plataforma de apuestas de Fórmula 1, en la que se puede ver listas de pilotos y circuitos de la F1, así como añadir, eliminar o editar elementos en la lista si se está registrado como administrador (lo cual en principio es por defecto así). También estará la pestaña de apuestas donde se almacenará y se podrá añadir apuestas a cada circuito del piloto ganador, en caso de acertar o no se ganará o perderá la cantidad correspondiente. Como ejemplo al registrarse se dará automáticamente un bono de 100€, ya que la app no funcionará con dinero real, será todo ficticio con fines de entretenimiento.

## Dependencias
  Para abrir la app en web solo falta poder abrir el enlace que se ofrece anteriormente, pero para abir la app en local, se debe poder abrir programas de ionic con angular con el programa correspondiente y para ver el apartado de pandas y powerbi es necesario tener python instalado para poder generar el archivo .csv correspondiente y PowerBI para ver el archivo de PowerBI

## Manual de instalación
  Una vez hayas revisado que cumples con las dependecias anteriormente mencionadas, los pasos para iniciar la app en local son los siguientes:
- En este mismo repositorio, debes hacer click en el botón de Code y darle a Descargar zip
- Estos archivos se extraen y se abren con visual studio code, preferentemente
- Se escribe en el terminal el comando npm i para instalar las dependencias necesarias
- Y ya haciendo un ionic s debería lanzar la app en local

## Tutorial de uso y secciones de la app
  Las secciones con las que cuenta esta app son:

  - **Login y regsiter:**
  Página para iniciar sesión o registrarse en caso de no tener cuenta

  ![login](https://github.com/DanielGarciaCampoy/f1Bets_ionic/assets/72436388/2cd70ef5-0eff-4105-bca0-a25bba4bc41b)
  ![register](https://github.com/DanielGarciaCampoy/f1Bets_ionic/assets/72436388/710c7a76-82c0-4bab-9428-2359165a4671)

  - **Home**
    La primera página que se ve al iniciar sesión, en la que se ve un slider presentando las funciones de la app y acceder a ellas mediantes los tabs de la barra inferior o al popover de usuario

    ![home](https://github.com/DanielGarciaCampoy/f1Bets_ionic/assets/72436388/b7283660-eafd-4f42-9a76-f7fb89b7fa9c)

  - **Ajustes**
    El popover que se menciona anteriormente permite que se pueda acceder a ajustes desde cualquier parte de la app, donde están las funciones de cerrar sesión, eliminar la cuenta y editar datos del usuario como el nombre de usuario

    ![ajustes](https://github.com/DanielGarciaCampoy/f1Bets_ionic/assets/72436388/3b19aa27-ed4a-43e7-8c0b-5c94dbd29a62)

  - **Pilotos**
    La lista de pilotos, donde se puede hacer click en ellos para ver detalles y ajustes de los mismos, como eliminarlos o editarlos, además de añadir nuevos, en caso de estar registrado como admin.

    ![pilotos](https://github.com/DanielGarciaCampoy/f1Bets_ionic/assets/72436388/bbcd9629-563d-4db9-8c0f-bd0da7f41850)

  - **Circuitos**
    La lista de circuitos, que funciona igual que la lista de pilotos anteriormente mencionada, función de eliminar, editar, añadir y ver detalles

    ![circuitos](https://github.com/DanielGarciaCampoy/f1Bets_ionic/assets/72436388/dcac961d-edf4-4e38-b72c-0fdf4c839398)

  - **Apuestas**
    La lista de apuestas en curso, donde se podrá añadir la apuesta que se quiera realizar en el circuito por el piloto con el dinero que se desee siempre que se tenga

    ![apuestas](https://github.com/DanielGarciaCampoy/f1Bets_ionic/assets/72436388/8bad5f00-7a1e-4f98-90fd-f2725dd8ff91)


## Bibliografía
  - Documentación de Ionic, Angular y Firebase
  - Documentación de pandas
  - StackOverflow
  - Tutoriales de youtube
