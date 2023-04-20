//Entregable 2

//importar fileSystem
const fs = require('fs');



//Creo la clase ProductManager
class ProductManager {
    constructor (){
        this.products = [];
        this.path = "./dbProducts.txt";
        this. incrementalId = 1
    }


addProduct = async () => {
 await fs.promises.writeFile (this.path , "hola soy el product 1")
} 


}

const productManager = new ProductManager;


//compruebo que addproduct crea y escribe el documento txt
 productManager.addProduct ();