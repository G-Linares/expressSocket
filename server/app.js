import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import { socketLogic } from './Utils/socketLogic.js';
import mainRouter from './Routes/mainRoute.js';

// PORTS
dotenv.config();
const PORT = process.env.PORT || 8080;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

// APP STANDARD CONFIG
const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SOCKET IO STANDARD CONFIG
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});
io.on('connection', socketLogic);

// APP ROUTING
app.use('/api', mainRouter);

// MONGO SETUP STANDARD
try {
	mongoose
		.connect(process.env.CONNECTION_MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to mongo'))
		.catch((error) => console.log(error.message));
} catch (e) {
	console.error('Algo salio mal con mongo', e);
}

// SEVER STANDARD SETUP
const localServer = app.listen(PORT, () => {
	server.listen(SOCKET_PORT, () => {
		console.log(`Socket.io server active on port: ${SOCKET_PORT}`);
	});
	console.log(`HTTP server active on port: ${localServer.address().port}`);
});
localServer.on('error', (error) => console.log(`Error on server, ${error}`));
