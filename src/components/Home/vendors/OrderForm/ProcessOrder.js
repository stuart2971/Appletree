import axios from "axios";

function insertOrder(o, callback){
  let {orderSuccessful, orderAttempts, orderPlaced, ...order} = o;
    axios.post('/orders/add', order)
      .then( (response, err) =>{
        callback(response)
      })
      .catch(function (error) {
        callback(error);
      })
      .finally(function () {
        // always executed
      });  
}

export {insertOrder};