// imports
const express= require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Stock=require('../models/stock');

// router, stock controller
router.get('/',(req,res,next)=>{
    var data=null;
    Stock.find().exec().then(doc=>{ 
        res.status(200).json({
            message: "handling GET req of products",
            data:doc
         })

    }).catch(error=>{console.log(error)});
//      res.status(200).json({
//             message: "handling GET req of products",
            
//          })
    
});
router.get("/:stId",(req,res,next)=>{
    const stId=req.params.stId;
Stock.findById(stId).then(result=>{res.status(200).json({message:"loaded Successfully",data:result})}).catch(err=>{console.log(err)})  

})


    router.delete('/:stId',(req,res,next)=>{
    
    const stId=req.params.stId;
    console.log(stId);
    Stock.remove({_id:stId}).exec().then(result=>{ 
     res.status(200).json({
         message: "Deleted Successfully",
         data:result
         
      })
 
 }).catch(error=>{
     res.status(404).json({
         message: "not found ",
         
      })
 });
});

 
 
 
router.post('/',(req,res,next)=>{
    
    const category = new Stock(
        {_id: new mongoose.Types.ObjectId(),
            name:req.body.name});
            
            category.save().then(result=>{ res.status(201).json({
                message:"handling Post req",
            createdProduct:category})
            .catch(error=>{console.log(error)}); 
           
            });
           
            
    
})
router.post('/:stId',(req,res,next)=>{
    const id= req.params.stId;


console.log(req.body);

    Stock.update({_id:id},{$set:{name:req.body.name}}).exec().then(result=>{res.status(200).json({res:result})}).catch(err=>{console.log(err)});
    console.log(id);
})
module.exports=router;
