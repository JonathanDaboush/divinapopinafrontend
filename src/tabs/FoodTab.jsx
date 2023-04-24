import { useState } from "react";
import { FoodMenu } from "../ListMenu/FoodMenu";
import { Food } from "../Model/Food";
import 'bootstrap/dist/css/bootstrap.css';
import { FoodCategory } from "../Model/FoodCategory";
import { FoodCategoryMenu } from "../ListMenu/FoodCategoryMenu";

export function FoodTab(props){
    let [firstTab,setFirstTab]=useState(true);
 
    
    if(firstTab){
        return(<div  className="bg-secondary">
        <div>
        <button   className="btn btn-primary" onClick={()=>setFirstTab(true)}>Food Categories</button>
        <button   className="btn  btn-info" onClick={()=>setFirstTab(false)}>Food</button>
         </div>
            <div>
                <b>Food Categories:</b>
            </div>
            <FoodCategoryMenu />
        </div>);
    }
    else{
        return(
            <div className="bg-secondary">
            <div>
        <button   className="btn  btn-info" onClick={()=>setFirstTab(true)}>Food Categories</button>
        <button   className="btn btn-primary" onClick={()=>setFirstTab(false)}>Food</button>
    </div>
                <div>
                    <b>Food Items:</b>
                </div>
                <FoodMenu />
                
            </div>
        );
    }
}