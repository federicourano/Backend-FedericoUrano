import { initMongoDB } from "./src/db/conexion.js";
import { UserModel } from "./schema.js";

const createUser = async (user) => {
    const res = await UserModel.create(user);
    console.log(res);
}

const test = async () =>{
    await initMongoDB();
    const newUser = {
        firstname: 'Juan',
        lastname: 'Perez',
        age: 45
    }
    await createUser(newUser);
}

test()