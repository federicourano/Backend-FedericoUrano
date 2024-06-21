import fs from "fs";
import { v4 as uuid } from "uuid";
import { model } from "mongoose";


class ProductManager {
  constructor(path) {
  this.path = path;
  }

  async getAll(querylimit) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        if (!products) return []
        else return JSON.parse(products);
      } else return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const newProduct = {
        id: uuid(),
        status: true,
        ...obj,
      };
      const products = await this.getAll();
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const productExist = products.find((product)=>product.id === id);
      return productExist || null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const products = await this.getAll();
      let productExists = products.find((product)=>product.id === id);
      if (productExists) {
        productExists = { ...productExists, ...obj };
      } else return null;
      const productsUpdated = products.filter((product) => product.id !== id);
      productsUpdated.push(productExists);
      await fs.promises.writeFile(this.path,JSON.stringify(productsUpdated, null, "\t"));
      return productExists;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const products = await this.getAll();
      const productListed = products.find((product) => product.id === id);
      if (!productListed) return null;
      const productsUpdated = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path,JSON.stringify(productsUpdated, null, "\t"));
      return productListed;
    } catch (error) {
      throw new Error(error);
    }
  }
} 

export default ProductManager;