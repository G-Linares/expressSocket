import UsersModel from '../Models/Users.js';

export class ContenedorUsers {
	// mostrar todos los productos
	async getAllUsers() {
		try {
			const allUsers = await UsersModel.find();
			return allUsers;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos los usuarios');
		}
	}

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
