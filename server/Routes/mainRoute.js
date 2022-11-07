import express from 'express';
import { ContenedorProductos } from '../Class/ContenedorProductos.js';

// inicializo router de express para ruteo
const mainRouter = express.Router();

// inicializo contenedor de Productos
const contenedorProductos = new ContenedorProductos();

// jala toda la informacion de todos los items
mainRouter.get('/ping', (req, res) => {
	res.status(200).json({ status: 'success', message: 'pong' });
});

mainRouter.get('/productos-test', (req, res) => {
	try {
		const randomItems = contenedorProductos.getAllItems();
		res.status(200).json(randomItems);
	} catch (e) {
		res.status(500).json({
			status: 'error',
			message: 'Algo salio mal al traer 5 items random',
		});
	}
});

export default mainRouter;
