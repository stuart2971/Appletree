import axios from "axios";

function insertOrder(o, callback){
  let {orderSuccessful, orderAttempts, orderPlaced, ...order} = o;
  console.log(order)
    axios.post('/orders/add', order)
      .then( (response, err) =>{
        callback(response)
        console.log(err)
      })
      .catch(function (error) {
        callback(error);
      })
      .finally(function () {
        // always executed
      });  
}

export {insertOrder};