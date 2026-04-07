

// Armamos el Servidor de la Aplicación

// 1. Importamos la librería Express para usarla.
const express = require('express');

// 2. Creamos una app para uso de los métodos de Express.
const app = express();

// 3. Definimos el puerto en el que se ejecutará el servidor.
const PORT = 9000; //3000 o 8080

// 4. Respondemos a una petición GET a la raíz del servidor.
app.get('/', (req, res)=>{
    res.send('¡Hola Mundo desde Express en el Quinto Año!');
});

// 5. Ejecutamos el servidor en el puerto definido.
app.listen(PORT, () => {
    console.log(`Estoy vivo en el puerto: http://localhost:${PORT}`);
});