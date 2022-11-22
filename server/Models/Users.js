import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	userName: { type: String },
	password: { type: String },
	timeStamp: { type: Date, default: Date.now },
});

const UsersModel = mongoose.model('Users', userSchema);

export default UsersModel;
