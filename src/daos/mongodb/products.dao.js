import { ProdsModel } from "./models/products.model.js";

export default class ProductsDaoMongoDB {

  //llega la peticion desde products.services.js y se deriva a la ddbb
  async getAllProducts(page = 1, limit = 10) {
    try {
      const response = await ProdsModel.paginate({}, {page, limit });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProdsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProdsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  
  async updateProduct(id, obj) {
    try {
      await ProdsModel.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProdsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}