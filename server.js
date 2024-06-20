import express from "express";
import cartRouter from './src/routes/cart-router.js'
import productsRouter from './src/routes/products-router.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import handlebars from "express-handlebars";
import { __dirname } from "./src/path.js";
import viewRouter from "./src/routes/views-router.js"
import { Server } from "socket.io";
import ProductManager from "./src/managers/products-manager.js";
import { initMongoDB } from "./src/db/conexion.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`)

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(express.static(`${__dirname}/public`));

//app.use('/api/carts', cartRouter);

//app.use('/api/products', productsRouter);

//app.use(errorHandler);

//app.use('/', viewRouter);

const PORT = 8080;

app.use("/products", productsRouter)

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewRouter);

initMongoDB();

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor creadon con Exoress en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);


    socket.emit('products', await productManager.getProducts());
    console.log("Products sent to client");

    socket.on('disconnect', () => console.log(`Client disconnected`));

    socket.on('newProduct', async (newProduct) => {
        productManager.newProducts(newProduct);
        const products = await productManager.getProducts();
        socketServer.emit('products', products);
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        console.log("Product deleted");
        const products = await productManager.getProducts();
        socketServer.emit('products', products);
    });
})