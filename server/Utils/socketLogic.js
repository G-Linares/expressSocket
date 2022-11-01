export const socketLogic = async (socket) => {
	console.log(`Usuario conectado con ID: ${socket.id}`);

	// aqui se recuperan todos los mensajes que se han mandado
	try {
		// const allCurrentMessages = await sqlite.listAllMessages();
		socket.emit('recover_conversation', []);
		socket.emit('recover_items', [
			{ price: '12', title: 'caca', thumbnail: 'hola', id: '123' },
		]);
	} catch (e) {
		console.error(e);
	}

	socket.on('send_message', (data) => {
		// await sqlite.addOne(data);
		// console.log(data);
		socket.emit('receive_message', data);
		socket.broadcast.emit('receive_message', data);
	});

	socket.on('send_new_item', (data) => {
		// await sqlite.addOne(data);
		socket.emit('receive_item', data);
		socket.broadcast.emit('receive_item', data);
	});

	socket.on('disconnect', () => {
		console.log('Usuario desconectado:', socket.id);
	});
};
