import {CartsModel} from './models/carts.model.js';

export default class CartsDaoMongoDB {
  async createCart() {
    try {
    const response = await CartsModel.create({});
    return response;
    } catch (error) {
    console.log(error);
    };
  };

  async getAllCarts() {
    try {
      const response = await CartsModel.find({}).populate('products._id');
      return response
    } catch (error) {
      console.log(error);
    }
  };

  async getCart(cId) {
    try {
      const response = await CartsModel.findById(cId)
      return response
    } catch (error) {
      console.log(error);
    };
  };
  
  async addProdToCart(cId, pId){
    try {
      const cartFind = await CartsModel.findById(cId)
      const existProduct = cartFind.products.find(prodIt => prodIt._id === pId);//quite await antes de cartFind
      if(existProduct){
        const updatedQuantity = existProduct.quantity + 1
        await CartsModel.updateOne(
          {_id: cId, 'products._id': pId},
          {$set: {'products.$.quantity': updatedQuantity}}
      );
      } else{
        await CartsModel.findOneAndUpdate(
          {_id: cId},
          {$push: {products: {_id: pId, quantity: 1}}},
        );
      };
      const cartUpdate = await CartsModel.findById(cId)
      return cartUpdate
  } catch (error) {
    console.log(error)
    };
  };

  async delProdFromCart (cId, pId){
    try {
      const cartFind = await CartsModel.findById(cId);
      const existProduct = await cartFind.products.find(prodIt => prodIt._id === pId);
      if(!existProduct){
        throw new Error('product not exist')
      } else{
        if(existProduct.quantity > 1){
          const updatedQuantity = existProduct.quantity - 1
          await CartsModel.updateOne(
            {_id: cId, 'products._id': pId},
            {$set: {'products.$.quantity': updatedQuantity}}
          );
        } else{
          await CartsModel.findOneAndUpdate(
            {_id: cId},
            {$pull: {products: {_id: pId}}},
          );
        };
      };
      const cartUpdate = await CartsModel.findById(cId)
      return cartUpdate
    } catch (error) {
      console.log(error)
    };
  };
}