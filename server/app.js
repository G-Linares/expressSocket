import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import { socketLogic } from './Utils/socketLogic.js';

import mainRouter from './Routes/mainRoute.js';
// import { sessionOptions } from './Utils/mongoStoreSession.js';

import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

// PORTS
dotenv.config();
const PORT = process.env.PORT || 8080;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

// APP STANDARD CONFIG
const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MONGO SESSION CONFIG --------

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header(
		'Access-Control-Allow-Methods',
		'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);
	next();
});

const MongoStore = MongoDBStore(session);

const sessionStore = new MongoStore({
	uri: process.env.CONNECTION_MONGODB_URL,
	collection: 'sessions',
});

app.use(
	session({
		secret: 'secret',
		name: 'session-id', // cookies name to be put in "key" field in postman
		store: sessionStore,
		cookie: {
			maxAge: 100000, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
			secure: false, // to turn on just in production
		},
		resave: true,
		saveUninitialized: false,
	})
);

// SOCKET IO STANDARD CONFIG --------
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});
io.on('connection', socketLogic);

// APP ROUTING -------------------------------
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
