// Importar módulos necesarios
import http from 'http';
import mysql from 'mysql2';
import fs from 'fs';

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'base_de_datos_tarea_3'
});

// Conectar a MySQL
/* connection.connect(error => {
    if(error){
        return console.error('error:' + error.message);
    }

    console.log('Conectado a la base de datos MySQL');
}); */

const server = http.createServer((req, res) =>{
    if(req.method === 'GET' && req.url === '/datos') {
        // Realizar una consulta a la base de datos
        connection.query('SELECT * FROM datos', (error, results) => {
            if(error) {
                console.log('Error en la consulta', error);
                res.writeHead(500);
                res.end('Error interno del servidor');
                return;
            }

            // Formatea los resultados como JSON
            const datosJson = JSON.stringify(results);

            // Enviamos los resultados como JSON
            /* res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(results)); */

            // Guarda los datos en un archivo de texto llamado datos.txt
            fs.writeFile('datos.txt', datosJson, (err) => {
                if (err) {
                    console.error('Error al escribir el archivo', err);
                    res.writeHead(500);
                    res.end('Error interno del servidor al escribir el archivo');
                    return;
                }

                // Si no hay error, envia una respuesta indicando exito
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Datos guardados exitosamente en datos.txt');
            })

        });
    } else {
        // Manejar otras rutas o métodos
        res.writeHead(404);
        res.end('No encontrado');
    }
});

// Escuchar en un puerto específico
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
