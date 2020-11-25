import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
class ProductService {
  async getProducts() {
    let array = [];
    let index = 1;
    const subscriber = await  firestore()
    .collection('Products')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          let obj = doc.data();
          obj ={...obj,'id':doc.id, 'quantity' : 0, 'idex': index};  
          array.push(obj);            
          index = index + 1;
      });
      return array;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    return array;
  }
  async getProductsWithCategoryId(id) {
    console.log('ID'+id);
    let array = [];
    let index = 1;
    const subscriber = await  firestore()
    .collection('Products').where("category", "==", id.toString())
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          let obj = doc.data();
          obj ={...obj,'id':doc.id, 'quantity' : 0, 'idex': index};  
          array.push(obj);         
           index = index + 1;   
      });
      //console.log(array);
      return array;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    //console.log('array');
    return array;
  }
  submitSaleOrder(saleOrder)
  {
    const user = auth().currentUser;
    if (user) {
      console.log(user);
    }
    var date = new Date().getDate(); 
    firestore()
        .collection('Orders')
        .add({
          'OrderDate':date,
          'OrderDate':'',
          'OrderDate':'',
          'OrderNumber': 'soNumber',
          'TotalAmount':saleOrder.totalAmount,          
          'TotalQuantity':saleOrder.totalQuantity,
          'ShiptoAddress':saleOrder.address,         
          //'CustomerId': user.uid,
          //'CustomerPhoneNumber': user.phoneNumber,
          //'CustomerName':user.displayName,
          'Timestamp':'',
          'TransactionStatus':'',
          'ErrorMsg':'',
          'Deteled':'',
          'Paid':'',
          'PaymentDate':''
         })
        .then((docRef) => {
            for (let userObject of saleOrder.orderDetails) {
                userObject = {...userObject,'OrderId':docRef.id}
                firestore()
                .collection('OrderDetails')
                .add(userObject)
                .then(() => {
                 
                });
             }              
        });
  }
  async getSalesOrders() {
    let array = [];
    let index = 1;
    const subscriber = await  firestore()
    .collection('Orders')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          let obj = doc.data();
          obj ={...obj,'id':doc.id,'idex': index};  
          array.push(obj);            
          index = index + 1;
      });
      return array;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    return array;
  }
  
}
const productService = new ProductService();
export default productService;