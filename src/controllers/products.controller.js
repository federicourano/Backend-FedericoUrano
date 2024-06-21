import * as service from "../services/product.services.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const prods = await service.getAll();
    res.json(prods);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if(!product) res.status(404).json({msj: 'Product not found'});
    else res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);
    res.json(newProd);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.update(id, req.body);
    res.json(prodUpd);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.remove(id);
    res.json(prodDel);
  } catch (error) {
    next(error);
  }
};