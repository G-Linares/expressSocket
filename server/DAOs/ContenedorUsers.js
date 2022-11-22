import UsersModel from '../Models/Users.js';

export class ContenedorUsers {
	// guardar un nuevo producto
	async saveOneUser(incomingUser) {
		try {
			const newUser = new UsersModel({ ...incomingUser });
			await newUser.save();
		} catch (e) {
			throw new Error('Algo salio mal al guardar nuevo usuario');
		}
	}
}
