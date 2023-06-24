import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//cambiar donde se necesite
const prodsSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

prodsSchema.plugin(mongoosePaginate);

export const ProdsModel = mongoose.model(
   'products',
   prodsSchema 
);