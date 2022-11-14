import express from 'express';

import { ContenedorProductos } from '../Class/ContenedorProductos.js';

// inicializo router de express para ruteo
const mainRouter = express.Router();

// inicializo contenedor de Productos
const contenedorProductos = new ContenedorProductos();

// jala toda la informacion de todos los items
mainRouter.get('/ping', (req, res) => {
	res
		.status(200)
		.json({ status: 'success', message: 'pong', isAuth: req.session.isAuth });
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

mainRouter.get('/isAuth', async (req, res) => {
	console.log(req.session);
	// console.log(req.session.isAuth);
	if (req.session.isAuth) {
		return res.json(req.session.isAuth);
	} else {
		return res.status(401).json('unauthorize');
	}
});

mainRouter.post('/login', async (req, res) => {
	req.session.isAuth = true;
	res.status(200).json({ message: 'success', id: req.session.id });
});

export default mainRouter;
