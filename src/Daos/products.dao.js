import { ProductModel } from "./models/products-models.js";

export default class ProductDaoMongoDB {
    async getAll(page = 1, limit = 10, name, sort) {
        try {
            return await ProductModel.find({})
        } catch (error) {
          throw new Error(error);
        }
      }
    
      async getById(id) {
        try {
          return await ProductModel.findById(id);
        } catch (error) {
          throw new Error(error);
        }
      }
    
      async create(obj) {
        try {
          const response = await ProductModel.create(obj);
          return response;
        } catch (error) {
          throw new Error(error);
        }
      }
    
      async update(id, obj) {
        try {
          const response = await ProductModel.findByIdAndUpdate(id, obj, {
            new: true,
          });
          return response;
        } catch (error) {
          throw new Error(error);
        }
      }
    
      async delete(id) {
        try {
          const response = await ProductModel.findByIdAndDelete(id);
          return response;
        } catch (error) {
          throw new Error(error);
        }
      }
}