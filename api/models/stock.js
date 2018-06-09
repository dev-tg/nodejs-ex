const mongoose=require('mongoose');
const productCategorySchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    
});
module.exports=mongoose.model("stock",productCategorySchema);