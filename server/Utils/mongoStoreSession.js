import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const sessionStore = MongoStore.create({
	mongoUrl: process.env.CONNECTION_MONGODB_URL,
	ttl: 60000,
});

export const sessionOptions = {
	secret: process.env.CONNECTION_MONGODB_SECRET,
	cookie: { maxAge: 60000, httpOnly: true, signed: true },
	saveUninitialized: true,
	resave: false,
	store: sessionStore,
};
