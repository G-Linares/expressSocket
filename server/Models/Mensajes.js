import mongoose, { Schema } from 'mongoose';

const mensajesSchema = new Schema({
	sender: String,
	date: String,
	message: String,
});

const MensajesModel = mongoose.model('Mensajes', mensajesSchema);

export default MensajesModel;
