//Entregable 2

//importar fileSystem
const fs = require('fs');

//Creo la clase ProductManager
class ProductManager {
    constructor (){
        this.products = [];
        this.path = "./dbProducts.txt";
        this. incrementalId = 0
    }

    //metodo addProduct
    addProduct = async ( title, description, price, thumbnail, code, stock) => {

   this.incrementalId++;
   let newProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    id: this.incrementalId,
   }
    //uso this.products para almacenar los diferentes push que genere el addProduct
    this.products.push (newProduct);

    await fs.promises.writeFile (this.path , JSON.stringify (this.products))
} 

    //"sub-método" readProducts
    readProducts = async() => {
    let readProductsResponse =  await fs.promises.readFile (this.path, "utf-8");
    return JSON.parse(readProductsResponse);
    }


    //metodo getProducts
    getProducts = async() => {
        let readAsync = await this.readProducts();
        return console.log (readAsync);
        
    }

    //método getProductById
    getProductById =async (id) => {
        let readAsyncFindId= await this.readProducts();
        let findID = readAsyncFindId.find((product) => product.id === id);
        if (findID){
            console.log ("producto encontrado por ID es:")
            console.log (findID);
        } else {
            console.log ("Producto no encontrado");
        }

    }
}

// Instanciar const productManager y comprobaciones
const productManager = new ProductManager;

//compruebo que addproduct crea y escribe el documento txt
productManager.addProduct ("titulo 1","descripcion 1",100,"imagen 1","abc123", 20);

//agrego el 2do producto para comprobar que se agrega y no sobreescribe al producto 1
productManager.addProduct ("titulo 2","descripcion 2",100,"imagen 2","abc124", 20);

//compruebo que getProducts y JSON.parse funcionen 
productManager.getProducts ();

//busco por ID
productManager.getProductById (1)