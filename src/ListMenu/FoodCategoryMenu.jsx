import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import {FoodCategory} from "../Model/FoodCategory";
export function FoodCategoryMenu(props){
let [foodCategoryList,setFoodCategoryList]=useState([]);
let [names,setNames]=useState([]);
let[ok,setOk]=useState(true);
let[count,setCount]=useState(0);
let getList=async()=>{
    let ofList=[];
    let path='http://localhost:8080/foodCategory';
    await axios.get(path)
         .then(res => {
            let target="";
            target = JSOG.stringify(res.data);
           ofList= JSOG.parse(target);
           
           

       }).catch(
       function (error) {
        console.log(error);
      });
    setFoodCategoryList(ofList);
    let thisList=[];
    for(let i=0;i<ofList.length;i++){
        thisList.push(ofList[i].name);
    }
    setNames(thisList);
}
useEffect(()=>{
    getList();
},[ok,count]);

if(ok){
   
    if(foodCategoryList.length!=0){
        return(
            <div> 
                <button  className=" btn btn-info" onClick={()=>{setCount(count+1)}}>Update Page</button>
                <button  className=" btn btn-info" onClick={()=>{setOk(false)}}>Create New Food Category:</button>
                {(foodCategoryList.map((e,i)=>{
                    return <FoodCategory  i={i} list={names} key={e.id} id={e.id} />
                }))}
            </div>
        );
    }
    else{
        return(
            <div> 
                <button  className=" btn btn-info" onClick={()=>{setCount(count+1)}}>Update Page</button>
                <button  className=" btn btn-info" onClick={()=>{setOk(false)}}>Create New Food Category:</button>
                <br></br>
               <a>There are no food categories.</a>
            </div>
        );
    }
}
else{
    return(
        <div>
            <button  className=" btn btn-info" onClick={()=>{setCount(count+1)}}>Update Page</button>
            <button  className=" btn btn-info" onClick={()=>{setOk(true)}}>Edit Food Category:</button>
            <FoodCategory list={names} />
  
        </div>
    );
}
}