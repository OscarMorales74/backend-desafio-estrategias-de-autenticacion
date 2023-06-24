import mongoose from 'mongoose';

//cambiar donde se necesite
const CartsSchema = new mongoose.Schema({
    products: [
      {
        type: mongoose.Schema.Types.Mixed,
        ref: 'products',
        quantity: {
          type: Number, default: 0
        }
      }
    ]
});

// CartsSchema.pre('find', function(){
//   this.populate('products');
// })

export const CartsModel = mongoose.model(
   'carts',
   CartsSchema 
);