import axios from "axios";

function insertSandwich(o, callback){
  let {orderSuccessful, orderAttempts, orderPlaced, ...order} = o;
  console.log(order)
    axios.post('/sandwich/add', order)
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
function insertFries(o, callback){
    axios.post('/fries/add', o)
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

export { insertSandwich, insertFries };