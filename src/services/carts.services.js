import CartsDaoMongoDB from "../daos/mongodb/carts.dao.js";
const cartsDao = new CartsDaoMongoDB();
// import fs  from 'fs';
import {__dirname} from '../path.js';

export const createCartServ = async () => {
    try {
      const newCart = await cartsDao.createCart();
      return newCart;
    } catch (error) {
      console.log(error);
    }
};
export const getAllCartsServ = async () => {
    try {
      const docs = await cartsDao.getAllCarts();
      return docs;
    } catch (error) {
          console.log(error);
    }
};
export const getCartServ = async (cId) => {
  try {
    const doc = await cartsDao.getCart(cId);
    if(!doc) {
      throw new Error('Cart not found')
    } else {
      return doc;
    }        
  } catch (error) {
    console.log(error);
    throw error;
}
};

export const addProdToCartServ = async (cid, pid) =>{
  try {
    const doc = await cartsDao.addProdToCart(cid, pid);
    return doc;
  } catch (error) {
    console.log(error);
  }
};
  
export const delProdFromCartServ = async (cId, pId) => {
  try {
    const doc = await cartsDao.delProdFromCart(cId, pId);
    return doc;
  } catch (error) {
    console.log(error);
  }
};
  