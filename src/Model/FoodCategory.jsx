import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import Autocomplete from "../Util/Autocomplete";
export function FoodCategory(props){
    let [name,setName]=useState("");
    let [ok,setOk]=useState(false);
    let [errorMessage,setErrorMessage]=useState("");
    
let [oldName,setOldName]=useState("");
        let initialize=async(id)=>{
           let isOk=ok;
        if(oldName!=props.list[props.i]){
            isOk=false;
        }
            if(props.id&&isOk==false){
            let path='http://localhost:8080/foodCategory/'+props.id;
             await axios.get(path)
                 .then(res => {
                    let target="";
                    target = JSOG.stringify(res.data);
                    let newObject= JSOG.parse(target);
                    let foodCategory=newObject;
                    setName(foodCategory.name);
                    setOldName(foodCategory.name);
                    setOk(true);

               }).catch(
               function (error) {
                console.log(error);
              });
               
            }
        }
        //this function
        let submit=async(event)=>{
            let path="http://localhost:8080/foodCategory";
            let isTrue=false;
           
            for (var i = 0; i < props.list.length; i++) {
                if(props.list[i]==name){
                    isTrue=true;
                }
            }
           if(!isTrue){
            event.preventDefault();
            if(!props.id){

               
              await  axios.post(
                    path,{name:name})
                    .then(res => {
                        
                    }).catch(
                    function (error) {
                    console.log(error.toString());
                    });  props.upCounter();  
            }
            else{
                path+="/exist";
                axios.post(
                    path,{ id: props.id ,name:name})
                    .then(res => {
                        
                    }).catch(
                    function (error) {
                    console.log(error);
                    });  props.upCounter();  
            }
        setErrorMessage("");
       
        }
            else{
                setErrorMessage("category already exists elswhere.");
            }
          
        }
        useEffect(() => {
        if(props.id){
            initialize(props.id);
        }});
let Remove=async()=>{
    if(props.id){
        
    await axios.delete('http://localhost:8080/foodCategory/'+props.id).catch(
        function (error) {
            console.log(error);
        });  props.upCounter();  
}}



if(props.id){
   
    return(<div  className="mt-sm-2 mb-sm-4">
        <form  className=" border border-dark" onSubmit={submit} >
        <div>previous value:{oldName}</div>
        <div  className="form-group row">
                    <lable className="col-sm-2 col-form-label"htmlFor="name" >name:</lable>              
                    <div class="col-sm-10">
                    <Autocomplete getCurrentKey={(e)=>setName(e)} suggestions={props.list} />
                    </div>
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
        <form  className=" border border-dark mt-sm-2 mb-sm-4" onSubmit={submit} >
              
               
                 <div  className="form-group row">
                 <div>
                    <lable className="col-sm-2 col-form-label"htmlFor="name" >name:</lable>              
                    <div class="col-sm-10">
                    <Autocomplete getCurrentKey={(e)=>setName(e)} suggestions={props.list} />
                    </div>
                </div>
                {errorMessage} </div>
            

            <input type="submit" className="btn btn-success" value="Save" />
            
        </form>
    );
}
  


}