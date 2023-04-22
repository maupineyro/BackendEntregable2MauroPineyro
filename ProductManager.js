//Entregable 2

//importar fileSystem
import { promises as fs } from 'fs';

//Creo la clase ProductManager
class ProductManager {
    constructor (){
        this.products = [];
        this.path = "./dbProducts.txt";
        this. incrementalId = 0
    }

    //método addProduct
    addProduct = async ( title, description, price, thumbnail, code, stock) => {

    this.incrementalId++;

    let newProduct = {//estructura del producto a agregar
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.incrementalId,
   }
    
    this.products.push (newProduct);//uso this.products para almacenar los diferentes push que genere el addProduct
    
    try{ //write    
        let Write = await fs.writeFile (this.path, JSON.stringify(this.products));          
    }
    catch (err){
        console.log("error al agregar o crear el archivo");
    }
}//cierra el addProduct 

    //"sub-método" readProducts
    readProducts = async() => {
    let readProductsResponse =  await fs.readFile (this.path, "utf-8");
    return JSON.parse(readProductsResponse);
    }

    //método getProducts
    getProducts = async() => {
        let readAsync = await this.readProducts();
        return  console.log(readAsync);   
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

    //método deleteProduct
    deleteProduct = async (id) => {
        let readProductsForDelete= await this.readProducts();
        const filterProducts = readProductsForDelete.filter ((products) => products.id !== id)
        console.log (`el product Id elegido para borrar es ${id}`);
        await fs.writeFile (this.path, JSON.stringify(filterProducts));
        console.log ("producto eliminado, chequear dbProducts.txt");
        
    }

    //método updateProduct
    updateProduct = async (id, newProps) =>{
        let readProductsForUpdate = await this.readProducts();
        let productToUpdate = readProductsForUpdate.find ((product) => product.id === id);
        console.log (`el product id elegido para modificar es ${id}`, productToUpdate);

        if (productToUpdate){
            if (newProps.title){
                productToUpdate.title = newProps.title
            };
            if (newProps.description){
                productToUpdate.description = newProps.description
            }
            if (newProps.price){
                productToUpdate.price = newProps.price
            }
            if (newProps.thumbnail){
                productToUpdate.thumbnail= newProps.thumbnail
            }
            if (newProps.code){
                productToUpdate.code = newProps.code
            }
             if (newProps.stock){
                productToUpdate.stock = newProps.stock
            }
            if (newProps.id && newProps.id !== productToUpdate.id){
                console.log ("el Id de un producto no puede modificarse con este método")
            }

            await fs.writeFile (this.path, JSON.stringify(readProductsForUpdate));
            console.log (`Producto actualizado: ${JSON.stringify(productToUpdate)}`)
        } else {
            console.log (`No se encontró el producto Id: ${id}`)
        }

        

    }



} //cierra la class ProductManager

////////////////////////////////////////////////////////////////////////////////////////////////
const productManager = new ProductManager; // Instanciar const productManager / comprobaciones//
////////////////////////////////////////////////////////////////////////////////////////////////

//Para comprobar, en optionTest elija:

// Ejecuto "node ProductManager.js 1" sin comillas, para agregar producto con addProduct
// Ejecuto "node ProductManager.js 2" sin comillas,para ver productos con getProducts
// Ejecuto "node ProductManager.js 3" sin comillas, para seleccionar producto por Id con getProductById
// Ejecuto "node ProductManager.js 4" sin comillas, para borrar producto con deleteProduct
// Ejecuto "node ProductManager.js 5" sin comillas, para modificar producto con updateProduct

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const optionTest = process.argv[2]; // con process.argv[2] ejecuto node ProductManager.js 1, y me ejecuta el case 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

switch (optionTest){
    
    case "1":
        //compruebo que addproduct crea y escribe el documento txt;
        productManager.addProduct ("titulo 1","descripcion 1",100,"imagen 1","abc123", 20);
        console.log ("producto agregado exitosamente");
        //agrego el 2do producto para comprobar que se agrega y no sobreescribe al producto 1.
        productManager.addProduct ("titulo 2","descripcion 2",200,"imagen 2","abc124", 20);
        console.log ("producto agregado exitosamente");
        //agrego el 3er producto.
        productManager.addProduct ("titulo 3","descripcion 3",200,"imagen 3","abc125", 20);
        console.log ("producto agregado exitosamente");
        console.log ("chequear dbProducts.txt");
    break;

    case "2"://compruebo que getProducts y JSON.parse funcionen    
        productManager.getProducts();
    break;

    case "3": //busco por ID (solo hay 3 productos)
        productManager.getProductById (3);
    break;

    case "4"://borrar producto con el id de product usando deleteProduct 
        productManager.deleteProduct(2)
    break;

    case "5":// se actualiza un producto con updateProduct(id, {newProps} )
        productManager.updateProduct(3,{title: "computadora 3", stock:5001});
    break;

    case "6":// comprobar que no se puede cambiar el id de producto
     productManager.updateProduct(3, {title:"computadora 5", id:5});
    break;

    default:
        console.log ("opción invalida");
    break;
}












