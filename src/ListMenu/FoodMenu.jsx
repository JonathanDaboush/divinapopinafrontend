import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Food } from "../Model/Food";
export function FoodMenu(props){
let [foodList,setFoodList]=useState([]);
let [names,setNames]=useState([]);
let [category,setCategory]=useState([]);
let[ok,setOk]=useState(true);
let[count,setCount]=useState(0);
let getList=async()=>{
  
    let ofList=[];
    let path='http://localhost:8080/food';
    await axios.get(path)
         .then(res => {
            let target="";
            target = JSOG.stringify(res.data);
           ofList= JSOG.parse(target);
           
           

       }).catch(
       function (error) {
        console.log(error);
      });
    setFoodList(ofList);
    let thisList=[];
    for(let i=0;i<ofList.length;i++){
        thisList.push(ofList[i].name);
    }
    setNames(thisList);

    path='http://localhost:8080/foodCategory';
    await axios.get(path)
         .then(res => {
            let target="";
            target = JSOG.stringify(res.data);
           ofList= JSOG.parse(target);
           
           

       }).catch(
       function (error) {
        console.log(error);
      });
    thisList=[];
    for(let i=0;i<ofList.length;i++){
        thisList.push(ofList[i].name);
    }
    setCategory(thisList);
}
let setCounter=(value)=>{
    setCount(value);
    getList();
}
useEffect(()=>{
    getList();
},[ok,count]);

if(ok){

    if(foodList.length!=0){
        return(<div>
            <button  className="btn btn-primary" onClick={()=>{setCounter(count+1)}}>Update Page</button>
            <button  className=" btn btn-info" onClick={()=>{setOk(false)}}>Create New Food Item:</button>
        
            {(foodList.map((e,i)=>{
                    return <Food  i={i} categoryNames={category} foodItem={e} key={e.id}  list={names}   id={e.id} />
                }))}
        </div>);
    }
    else{
        return(<div>
            <button  className="btn btn-primary" onClick={()=>{setCounter(count+1)}}>Update Page</button>
            <button  className=" btn btn-info" onClick={()=>{setOk(false)}}>Create New Food Item:</button>
            <br></br>
            <b>There are no food Items</b>
        </div>);
    }

}
else{

return(<div>
<button  className=" btn btn-info" onClick={()=>{setOk(true)}}>Edit Food Item:</button>
<button  className="btn btn-primary" onClick={()=>{setCounter(count+1)}}>Update Page</button>
    <Food  categoryNames={category}    list={names} />    
</div>);
}

}