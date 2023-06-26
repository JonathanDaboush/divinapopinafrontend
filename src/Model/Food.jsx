import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import Autocomplete from "../Util/Autocomplete";
export function Food(props){
    let [name,setName]=useState("");
    let[description,setDescription]=useState("");
    let [price,setPrice]=useState(1);
    let[oldDescription,setOldDescription]=useState("");
    let [oldPrice,setOldPrice]=useState(1);
    let [category,setCategory]=useState("");
    let [ok,setOk]=useState(false);
    let[nameErrorMessage,setNameErrorMessage]=useState("");
    let[categoryErrorMessage,setCategoryErrorMessage]=useState("");
let [oldName,setOldName]=useState("");
let [oldCategory,setOldCategory]=useState("");

        let initialize=async(id)=>{
            let isOk=ok;
            if(oldName!=props.foodItem.name ||
                oldDescription!=props.foodItem.description ||
                oldPrice!=props.foodItem.price ||
                oldCategory!=props.foodItem.foodCategory ){
                isOk=false;
            }
            if(props.id && isOk==false){
                   setOk(true);
            let path='http://localhost:8080/food/'+props.id;
             await axios.get(path)
                 .then(res => {
                    let target="";
                    target = JSOG.stringify(res.data);
                    let newObject= JSOG.parse(target);
                    let food=newObject;
                    setName(food.name);
                    setOldName(food.name);
                    setDescription(food.description);
                    setOldDescription(food.description);
                    setPrice(food.price);
                    setOldPrice(food.price);
                    setCategory(food.foodCategory);
                    setOldCategory(food.foodCategory);
                 

               }).catch(
               function (error) {
                console.log(error);
              });
               
            }
        }


        //this function
        let submit=async(event)=>{
            let path="http://localhost:8080/food";
            let isTrue=false;
            let defaultName=name;
            let defaultCategory=category;
            if(defaultName==="")
            {
                defaultName=oldName;
            }
            if(defaultCategory===""){
                defaultCategory=oldCategory;
            }
            if(name!=oldName){
                for (var i = 0; i < props.list.length; i++) {
                                if(props.list[i]==name){
                                    isTrue=true;
                                }
                            }
                            if(isTrue)
                            setNameErrorMessage("food name exists elsewhere.");
            }
            let bool=false;
            for(let i=0;i<props.categoryNames.length;i++){
                if(props.categoryNames[i]==category)
                    {bool=true;}

            }
            if(bool===false){
                setCategoryErrorMessage("category does not exist in registry.");
            }
          
           if(isTrue===false && bool===true){
            
            

            setNameErrorMessage("");
            setCategoryErrorMessage("");
            if(props.id===undefined){

                event.preventDefault();
              await  axios.post(
                    path,{name:defaultName,description:description,price:price,categoryName:defaultCategory})
                    .then(res => {
                       
                    }).catch(
                    function (error) {
                    console.log(error.toString());
                    });  props.upCounter();  
            }
            else{
                path+="/exist";
                event.preventDefault();
                axios.post(
                    path,{ id: props.id ,name:defaultName,description:description,price:price,categoryName:defaultCategory})
                    .then(res => {
                      
                    }).catch(
                    function (error) {
                    console.log(error);props.upCounter();  
                    });  
            }
        }
            
      
        }
        useEffect(() => {
        if(props.id){
            initialize(props.id);
        }},[props.list]);
let Remove=async(event)=>{
    if(props.id){
        
    await axios.delete('http://localhost:8080/food/'+props.id).catch(
        function (error) {
            console.log(error);props.upCounter();
        });
}}



if(props.id){
   
    return(<div className="mt-sm-2 mb-sm-4">
        <form className=" border border-dark" onSubmit={submit} >
            <div>previous Name:{oldName}</div>
                <div  className="form-group row">
               
                    <lable className="col-sm-2 col-form-label"htmlFor="title" >Title:</lable>
                    <div class="col-sm-10">
                        <Autocomplete getCurrentKey={(e)=>setName(e)} suggestions={props.list} />
                    </div>
                    {nameErrorMessage}
                 
                 </div>

                 <div  className="form-group row">
                 <div>previous value:{oldCategory}</div>
                    
                    <lable className="col-sm-2 col-form-label"htmlFor="category">Category:</lable>              
                    <div class="col-sm-10">
                        <Autocomplete getCurrentKey={(e)=>setCategory(e)} suggestions={props.categoryNames} />
                    </div>
                    {categoryErrorMessage}
                 </div>
            <div  className="form-group row">
                
                <lable className="col-sm-2 col-form-label"htmlFor="description" >Description:</lable>
                <div class="col-sm-10">
                    <input type="text" id="description"  className="form-control" name="description" onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
                </div>
            </div>
           
            <div  className="form-group row">
               
                <lable className="col-sm-2 col-form-label"htmlFor="price" >Price:</lable>
                <div class="col-sm-10">
                    <input type="number"  className="form-control"  step="any" min="1" id="price" 
                    name="price"onChange={(e)=>{let value=e.target.value;
                    setPrice(value);}} value={price}/>
                </div>
            </div>
            <b>{ok}</b>
            <div>
                
                <input type="submit" className="btn btn-success" value="Save" />
                
                <button  className=" btn btn-danger" onClick={()=>Remove} >Remove</button>
            
            </div>
            
            
        </form>
        </div>
    );
}
else{
    return(
        <form  className=" border border-dark mt-sm-2 mb-sm-4" onSubmit={submit} >
             
              <div  className="form-group row">
                    <lable className="col-sm-2 col-form-label"htmlFor="title" >Title:</lable>
                
                        <div class="col-sm-10">
                            <Autocomplete getCurrentKey={(e)=>setName(e)} suggestions={props.list} />
                        </div>
                    
                    
                    {nameErrorMessage}
                 </div>
                 <div  className="form-group row">
                    
                    <lable className="col-sm-2 col-form-label"htmlFor="category" >Category:</lable>              
                    <div class="col-sm-10">
                        <Autocomplete getCurrentKey={(e)=>setCategory(e)} suggestions={props.categoryNames} />
                    </div>
                {categoryErrorMessage}
                
                 </div>


            <div  className="form-group row">
               
                <lable className="col-sm-2 col-form-label"htmlFor="description" >Description:</lable>
                <div class="col-sm-10">
                    <input  className="form-control" type="text" id="description" name="description" onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
                </div>
            </div>
           
            <div  className="form-group row">
                
                <lable className="col-sm-2 col-form-label"htmlFor="price" >Price:</lable>
                <div class="col-sm-10">
                    <input  className="form-control" type="number"  step="any"  min="1" id="price" 
                    name="price"onChange={(e)=>{let value=e.target.value;
                    setPrice(value)}} value={price}/>
                </div>
            </div>

            <input type="submit" className="btn btn-success" value="Save" />
            
        </form>
    );
}
  


}