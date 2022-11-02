import { ContenedorProductos } from '../DAOs/ContenedorProductos.js';
import { ContenedorChat } from '../DAOs/ContenedorChat.js';

// inicializo contenedores de DAO de ambas partes
const contenedorProductos = new ContenedorProductos();
const contenedorChat = new ContenedorChat();

export const socketLogic = async (socket) => {
	console.log(`Usuario conectado con ID: ${socket.id}`);
	// aqui se recuperan todos los mensajes que se han mandado
	try {
		const allCurrentProducts = await contenedorProductos.getAllProducts();
		const allCurrentMessages = await contenedorChat.getAllMessages();
		socket.emit('recover_conversation', allCurrentMessages);
		socket.emit('recover_items', allCurrentProducts);
	} catch (e) {
		console.error(e);
	}

	socket.on('send_message', async (data) => {
		await contenedorChat.saveOneMessage(data);
		const updatedConversation = await contenedorChat.getAllMessages();
		socket.emit(
			'receive_message',
			updatedConversation[updatedConversation.length - 1]
		);
		socket.broadcast.emit(
			'receive_message',
			updatedConversation[updatedConversation.length - 1]
		);
	});

	// crea un item, lo salva a la BD, ya completo,  manda por receive_item el item nuevo creado y el front lo junta al array existente
	socket.on('send_new_item', async (data) => {
		await contenedorProductos.saveOneProduct(data);
		const allCurrentProducts = await contenedorProductos.getAllProducts();
		socket.emit(
			'receive_item',
			allCurrentProducts[allCurrentProducts.length - 1]
		);
		socket.broadcast.emit(
			'receive_item',
			allCurrentProducts[allCurrentProducts.length - 1]
		);
	});
	// elimina un item, vuelve a traer la base de datos resultante y la manda por recover_items
	socket.on('delete_item', async (data) => {
		await contenedorProductos.deleteOneProduct(data);
		const allCurrentProducts = await contenedorProductos.getAllProducts();
		console.log(allCurrentProducts);
		socket.emit('recover_items', allCurrentProducts);
		socket.broadcast.emit('recover_items', allCurrentProducts);
	});

	socket.on('disconnect', () => {
		console.log('Usuario desconectado:', socket.id);
	});
};
