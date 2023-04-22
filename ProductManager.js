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
    
    this.products.push (newProduct);//uso this.products para almacenar los diferentes push que genere el addProduct
    
    try{    //write 
            
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


    //metodo getProducts
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
        console.log (filterProducts);
        

    }
}
//////////////////////////////////////////////////////////////////////////////////

// Instanciar const productManager y comprobaciones
const productManager = new ProductManager;

//Para comprobar, en switchOption elija:
// 1 para agregar producto con addProduct
// 2 para ver productos con getProducts
// 3 para seleccionar producto por Id con getProductById
// 4 para borrar producto con deleteProduct
// 5 para modificar producto con updateProduct


///////////////////////////////////////
const optionTest = 4;
///////////////////////////////////////

switch (optionTest){
    case 1:
        //compruebo que addproduct crea y escribe el documento txt;
        productManager.addProduct ("titulo 1","descripcion 1",100,"imagen 1","abc123", 20);
        console.log ("producto agregado exitosamente");
        //agrego el 2do producto para comprobar que se agrega y no sobreescribe al producto 1
        productManager.addProduct ("titulo 2","descripcion 2",200,"imagen 2","abc124", 20);
        console.log ("producto agregado exitosamente");
        //agrego el 3er producto, para probar el borrado
        productManager.addProduct ("titulo 3","descripcion 3",200,"imagen 3","abc125", 20);
        console.log ("producto agregado exitosamente");
        console.log ("chequear dbProducts.txt");
    break;

    case 2://compruebo que getProducts y JSON.parse funcionen    
        productManager.getProducts();
    break;

    case 3: //busco por ID
        productManager.getProductById (4);
    break;

    case 4:
        //borrar producto con el id de product usando deleteProduct 
        productManager.deleteProduct(3)
    break;

    case "5":
        
    break;

    case "6":
        console.log ("se hará el metodo update");
    break;

    default:
        console.log ("opción invalida");
    break;
}












