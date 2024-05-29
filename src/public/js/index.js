const socket = io();

socket.on("products",  (products) => {
    try {
        console.log("recibido evento products");
        const productCards = products.map((product) => {
            return `
                <div class="card">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>$${product.price}</p>
                    <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                </div>
            `;
        }).join(" ");

        document.getElementById("card-container").innerHTML = productCards;
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                eliminarProducto(productId);
            });
        });
    } catch (error) {
        console.error(error);
    }
});


document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value, 10)
    }

    

    socket.emit('newProduct', newProduct);

    document.getElementById('form').reset();
});

const eliminarProducto =  (id) => {
    console.log("evento deleteProduct enviado");
    socket.emit('deleteProduct', id);
}