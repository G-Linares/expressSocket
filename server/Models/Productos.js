import mongoose, { Schema } from 'mongoose';

const ProductosSchema = new Schema({
	title: String,
	thumbnail: String,
	price: String,
});

const ProductosModel = mongoose.model('Productos', ProductosSchema);

export default ProductosModel;
