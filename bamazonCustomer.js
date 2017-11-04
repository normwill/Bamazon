var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host : 'localhost',
  port: 8889, 
  user : 'root',
  password : 'root',
  database : 'bamazondb'
});
 
connection.connect();
 
connection.query('SELECT * from products', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
  userInput();
});

function userInput(){



inquirer.prompt([{
	type: "input",
	name: "userId",
	message: "Which item would you like to buy? Please provide the id for it."
},
{
	type: "input",
	name: "userUnits",
	message: "How many units of this product would you like to buy?"
}]).then(function (answers) {
	var id = parseInt(answers.userId);
	var quantity = parseInt(answers.userUnits);
    connection.query('SELECT * from products WHERE item_id = ' + id, function (error, results, fields){
    	if (error) throw error;
    	console.log(results);
    	if(answers.userUnits > results[0].stock_quantity)
    	{
    		console.log("Insufficient Quantity!");
    	} else {
    		processOrder(id,quantity);
    	}
    })
});
 }
 function processOrder(id, quantity) {
 	console.log(id, quantity);
 	// connection query for retrieving the price
  
 	// Calculate the price for user
 	// Update stock quantity
 }
//connection.end();