var mongoose=require("mongoose");
var ordersSchema = new mongoose.Schema({
_id:Number   
, owner: String
, meal: String
, restaurant_name: String
, users_invited: {}
,users_joined: {}
,status:String
,menu_image:String
,date:{ type: Date, default: Date.now }
,order_detail:{}
});
var orders = mongoose.model('orders', ordersSchema);

module.exports = orders;