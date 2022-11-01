import express from 'express';

const mainRouter = express.Router();

// jala toda la informacion de todos los items
mainRouter.get('/ping', (req, res) => {
	res.status(200).json({ status: 'success', message: 'pong' });
});

export default mainRouter;
