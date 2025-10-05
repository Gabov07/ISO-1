import url from 'url';
import { routes } from './routes.js';

export const router = (request, response) => {
	const parsedUrl = url.parse(request.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');
	const handler = routes[trimmedPath];

	if (handler) {
		handler(request, response); 
	} else {
		response.writeHead(404, { "Content-Type": "application/json" }); 
		response.end(JSON.stringify({ "message": "Ruta no encontrada" }));
	}
};