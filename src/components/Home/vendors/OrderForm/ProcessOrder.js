import axios from "axios";

function insertSandwich(order, callback){
    console.log("inserting sandwich", order)
    axios.post('https://appletree-express-server.herokuapp.com/sandwich/add', order)
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
    console.log("inserting fries" + o)
    axios.post('https://appletree-express-server.herokuapp.com/fries/add', o)
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