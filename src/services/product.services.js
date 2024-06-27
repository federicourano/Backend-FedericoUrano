import ProductDaoMongoDB from "../Daos/products.dao.js";
const prodDao = new ProductDaoMongoDB();

//import { __dirname } from '../path.js';
//import ProductManager from '../managers/products-manager.js';
//const prodDao = new ProductManager(`${__dirname}/db/products.json`);

export const getAll = async () => {
  try {
    return await prodDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    return await prodDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await prodDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, obj) => {
  try {
    return await prodDao.update(id, obj)
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await prodDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};