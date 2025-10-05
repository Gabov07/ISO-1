import { parser } from './parser.js'; 

let productosTienda = [];

let fibonacci = { a: 0, b: 1 };

const obtenersiguienteFibonacci = () => {
  const numActual = fibonacci.a;
  const numSiguiente = fibonacci.a + fibonacci.b;
  fibonacci.a = fibonacci.b;
  fibonacci.b = numSiguiente;
  return numActual;
};

const numAleatorio = () => {
  return Math.floor(Math.random() * 1000);
};

export const home = async (request, response) => {
  const info = {
    NumeroAleatorio: numAleatorio(),
    NumeroFibonacci: obtenersiguienteFibonacci()
  };

  let objeto;

  if (request.method === "GET") {
    objeto = { mensaje: "Respuesta para el método GET", ...info };
  } else if (request.method === "POST") {
    objeto = { mensaje: "Respuesta para el método POST", ...info };
  } else if (request.method === "PUT") {
    objeto = { mensaje: "Respuesta para el método PUT", ...info };
  } else {
    objeto = { mensaje: `Método ${request.method} recibido`, ...info };
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(objeto));
  response.end();
}

export const products = async (request, response) => {
  const { method } = request;

  switch (method) {
    case 'GET':
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        mensaje: "Lista de productos obtenida",
        datos: productosTienda
      }));
      break;

    case 'POST':
      try {
        const nuevoProducto = await parser(request); 
        productosTienda.push(nuevoProducto); 
        response.writeHead(201, { "Content-Type": "application/json" }); 
        response.end(JSON.stringify({
          mensaje: "Producto añadido con éxito",
          datos: nuevoProducto
        }));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" }); 
        response.end(JSON.stringify({ mensaje: "Error: El cuerpo de la solicitud no es un JSON válido" }));
      }
      break;

    default:
      response.writeHead(405, { "Content-Type": "application/json" }); 
      response.end(JSON.stringify({ mensaje: `Error: El método ${method} no está permitido en /products` }));
      break;
  }
}