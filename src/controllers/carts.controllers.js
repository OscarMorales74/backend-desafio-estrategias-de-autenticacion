import {
    createCartServ,
    getAllCartsServ,
    getCartServ,
    addProdToCartServ,
    delProdFromCartServ
} from "../services/carts.services.js";

export const getAllCartsCtll = async (req, res, next) => {
    try {
        const docs = await getAllCartsServ();
        res.status(200).send({status: "success", message:"Cart was found", payload: docs})
    } catch (error) {
        next(error);
    }
};
export const getCartCtll = async (req, res, next) => {
    try {
        const { cId } = req.params;
        const doc = await getCartServ(cId);
        res.status(200).json(doc);
    } catch (error) {
        next(error);
    }
};
export const createCartCtll = async (req, res, next) => {
    try {
        const docs = await createCartServ();
        res.status(201).send(docs)
    } catch (error) {
        next(error);
    }
};

export const addProdToCartCtll = async (req, res, next) => {
  try {
    const { cId, pId } = req.params;
    const product = await addProdToCartServ(cId,pId);
    if (product) {
      res.status(201).send({status: "success", mensaje: "Product successfully added to cart!", payload: product, quantity: product.quantity});
    } else {
      res.status(404).send({status: "error", mensaje:"The product or cart you are searching for could not be found!"});
    } 
  } catch (error) {
    next(error);
  }
};

export const delProdFromCartCtll = async (req, res, next) => {
    try {
      const { cId, pId } = req.params;
      const deletedProduct = await delProdFromCartServ(cId, pId);
      if (deletedProduct) {
        res.status(200).send({ status: "success", message: "Product successfully deleted from cart!", payload: deletedProduct });
      } else {
        res.status(404).send({ status: "error", message: "The product or cart you are searching for could not be found!" });
      }
    } catch (error) {
      next(error);
    }
};
  