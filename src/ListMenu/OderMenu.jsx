import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Order } from "../Model/Order";

export function OrderMenu(props){
    let [orderList,setOrderList]=useState([]);
    let [foodList,setFoodList]=useState([]);
    let [counter,setCounter]=useState(0);
    let[ok,setOk]=useState(true);
let[count,setCount]=useState(0);
    let getList=async()=>{
       setFoodList(props.foodNames);
        
        setOrderList(props.orders);
    }
    useEffect(()=>{
        getList();
    },[ok,count,props.updater]);

let update=()=>{
    setCount(count+1);
}
if(ok){
 
    if(orderList.length!=0){
        return(
            <div>
            
              
                <button  className="btn btn-secondary" onClick={()=>{setOk(false)}}>Create New Order:</button>
                
                {(orderList.map((e)=>{
                    return <Order updater={props.updater} order={e} upCounter={()=>getList()} resId={props.resId} key={e.id} id={e.id} list={foodList} />
                }))}
            </div>
        );
    }
    else{
        return(
            <div>
            
              
                <button  className="btn btn-secondary" onClick={()=>{setOk(false)}}>Create New Order:</button>
                <br></br>
                <a>This reservation has no orders.</a>
            </div>
        );
    }
}
else{
    return(
        <div>
           
            <button  className="btn btn-secondary" onClick={()=>{setOk(true);}}>Edit Order:</button>
            <Order   updater={props.updater} resId={props.resId} upCounter={()=>getList()}  list={foodList}/>
        </div>
    );
}
    }