export const socketLogic = async (socket) => {
	console.log(`Usuario conectado con ID: ${socket.id}`);

	socket.on('disconnect', () => {
		console.log('Usuario desconectado:', socket.id);
	});
};
