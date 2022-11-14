// import MongoStore from 'connect-mongo';
// import { default as connectMongoDBSession} from 'connect-mongodb-session';
// import dotenv from 'dotenv';

// dotenv.config();

// // const sessionStore = MongoStore.create({
// // 	uri: process.env.CONNECTION_MONGODB_URL,
// // 	collection:"sessions"
// // });

// const MongoDBStore = connectMongoDBSession(sessionStore);

// export const sessionOptions = {
// 	secret: process.env.CONNECTION_MONGODB_SECRET,
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {
// 		path: '/home',
// 		maxAge: 60000,
// 		httpOnly: true,
// 		signed: true,
// 		isAuth: false,
// 	},
// 	store: sessionStore,
// };
