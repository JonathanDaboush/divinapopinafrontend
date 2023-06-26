import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import Autocomplete from "../Util/Autocomplete";
export function Order(props){
    
    let[note,setNote]=useState("");
    let[oldNote,setOldNote]=useState("");
    let [quantity,setQuantity]=useState(1);
    let [food,setFood]=useState("");
    let [foodList,setFoodList]=useState([]);
    let [ok,setOk]=useState(false);
    let [errorMessage,setErrorMessage]=useState("");
    let [oldFood,setOldFood]=useState("");
    let [oldQuantity,setOldQuantity]=useState(1);

   let [oldUpdater,setOldUpdater]  =useState(true)   ;
   let initialize=async(id)=>{
            let isOk=ok;
            setFoodList(props.list); 
            if(props.updater!=oldUpdater ){
                isOk=false;
               
            }

            if(props.id && isOk==false){
                if(props.updater!=oldUpdater){
                    setOldUpdater(props.updater);
                }
                   setFoodList(props.list); 
            let path='http://localhost:8080/order/'+props.id;
             await axios.get(path)
                 .then(res => {
                    let target="";
                    target = JSOG.stringify(res.data);
                    let newObject= JSOG.parse(target);
                    let order=newObject;
                    setFood(order.food);
                    setNote(order.note);
                    setQuantity(order.quantity);
                    setOldFood(order.food);
                    setOldNote(order.note);
                    setOldQuantity(order.quantity);
                    setOk(true);

               }).catch(
               function (error) {
                console.log(error);
              });
               
            }
        }
        //this function
        let submit=async(event)=>{
            event.preventDefault();
            let path="http://localhost:8080/order";
           let hasPassed=false;
           for (var i = 0; i < foodList.length; i++) {
                if(foodList[i]==food){

                    hasPassed=true;
                }
            }
            if(hasPassed){
            if(!props.id){

              
              await  axios.post(
                    path,{name:food,note:note,quantity:quantity,resId:props.resId})
                    .then(res => {
                        
                    }).catch(
                    function (error) {
                    console.log(error.toString());
                    });props.upCounter();
            }
            else{
                path+="/exist";
                axios.post(
                    path,{ id: props.id ,name:food,note:note,quantity:quantity,resId:props.resId})
                    .then(res => {
                        
                    }).catch(
                    function (error) {
                    console.log(error);
                    });
                    setErrorMessage("");props.upCounter();
            }}
            else{setErrorMessage("food item does not exist.")}
            
            event.preventDefault();
        }
        useEffect(() => {
       
            initialize(props.id);
        });
let Remove=async()=>{
    if(props.id){
        
    await axios.delete('http://localhost:8080/order/'+props.id).catch(
        function (error) {
            console.log(error);
        }); props.upCounter();
}}



if(props.id){
   
    return(<div  className="mt-sm-2 mb-sm-4">
        <form  className=" border border-primary" onSubmit={submit} >
            
           

            <div  className="form-group row">
                
                <lable className="col-sm-2 col-form-label"htmlFor="note" >note:</lable>
                <div class="col-sm-10">
                <input  className="form-control"type="text" id="note" name="note" onChange={(e)=>{setNote(e)}} value={note}/>
           </div>
            </div>
           
            <div  className="form-group row">
               
                <lable className="col-sm-2 col-form-label"htmlFor="quantity" >quantity:</lable>
                <div class="col-sm-10">
                <input  className="form-control" type="number" min="1"  id="quantity" name="quantity" onChange={(e)=>{setQuantity(e.target.value)}} value={quantity}/>
                </div>
            </div>
            <div>previous value:{oldFood}</div>
            <div  className="form-group row">
               
                <lable className="col-sm-2 col-form-label"htmlFor="food" >Name of Food:</lable>
                <div class="col-sm-10">
                <Autocomplete getCurrentKey={(e)=>setFood(e)} suggestions={props.list} />
                </div>
            {errorMessage}
             </div>
            
            <div>
                
                <input type="submit" className="btn btn-success" value="Save" />
                
                <button  className=" btn btn-danger" onClick={Remove} >Remove</button>
            
            </div>
        </form>
        </div>
    );
}
else{
    return(
        <form  className=" border border-primary mt-sm-2 mb-sm-4" onSubmit={submit} >
     
            <div  className="form-group row">
                
                <lable className="col-sm-2 col-form-label"htmlFor="note" >note:</lable>
                <div class="col-sm-10">
                <input type="text"  className="form-control" id="note" name="note" onChange={(e)=>{setNote(e.target.value)}} value={note}/>
                </div>
            </div>
           
            <div  className="form-group row">
               
                <lable className="col-sm-2 col-form-label"htmlFor="quantity" >quantity:</lable>
                <div class="col-sm-10">
                <input type="number" className="form-control"  min={1}   id="quantity" name="quantity" onChange={(e)=>{setQuantity(e.target.value)}} value={quantity}/>
                </div>
            </div>
            <div  className="form-group row">
                
                <lable className="col-sm-2 col-form-label"htmlFor="food" >Name of Food:{oldFood}</lable>
                <div class="col-sm-10">
                <Autocomplete getCurrentKey={(e)=>setFood(e)}  suggestions={props.list} />
                </div>
             </div>
            <input type="submit" className="btn btn-success" value="Save" />
            
        </form>
    );
}
  


}