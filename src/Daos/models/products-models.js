import {Schema, model} from "mongoose";

const productCollectionName = "product";

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true },
}, 
{ versionKey: false }
);

export const ProductModel = model(
  productCollectionName,
  productSchema
);