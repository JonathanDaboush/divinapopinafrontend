import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { FoodTab } from './tabs/FoodTab';
import { OrdersTab } from './tabs/OrdersTab';
export function  MainShell(props){
    let [firstTab,setFirstTab]=useState(true);
    if(firstTab){
        return(
            <div className="bg-dark text-white">
                <div>
                    <button   className="btn btn-primary" onClick={()=>setFirstTab(true)}>Reservations</button>
                    <button   className="btn  btn-info" onClick={()=>setFirstTab(false)}>Food</button>
                </div>
                <div className={firstTab?"visible":"invisible"}>   
                    <OrdersTab />
                </div>
              
            
            </div>
        );
    }
    else{
        return(
            <div  className="bg-dark text-white">
                <div>
                    <button   className="btn  btn-info" onClick={()=>setFirstTab(true)}>Reservations</button>
                    <button   className="btn btn-primary" onClick={()=>setFirstTab(false)}>Food</button>
                </div>
                
                <div  className={firstTab?"invisible":"visible"}>
                    <FoodTab />
                </div>
            
            </div>
        );  
    }
    
}