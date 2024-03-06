// Importar módulos
import http from 'http';
import mysql from 'mysql2';

// Configurar conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'base_de_datos_tarea_3'
});

// Crear servidor
const server = http.createServer((req, res) => {

  // Manejar ruta /datos
  if (req.url === '/datos' && req.method === 'GET') {

    // Consultar DB
    db.query('SELECT * FROM datos', (err, results) => {
      
      if (err) {
        return res.end(err); 
      } 

      // Responder con datos en JSON
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(results));
    });

  } else {
    res.end('Ruta no encontrada');
  }

});

// Escuchar en puerto 8000
server.listen(8000, () => {
  console.log('Servidor corriendo en http://localhost:8000');
});