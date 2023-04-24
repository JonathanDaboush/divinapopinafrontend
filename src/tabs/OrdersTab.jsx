import { useEffect, useState } from "react";
import { OrderMenu } from "../ListMenu/OderMenu";
import { ReservationMenu } from "../ListMenu/ReservationMenu";
import moment from "moment/moment";
export function OrdersTab(props){
    let [ofDate,setOfDate]=useState('');
    let [ok,setOk]=useState(false);
    let initilize=()=>{
       
            setOk(true);
        setOfDate(new Date());
       
        
    }
    let setDate=(e)=>{
        setOfDate(e.target.value);
    }
    useEffect(()=>{
        if(ok===false){
            initilize();
        }}
        ,[]);
 
    return(<div  className="bg-secondary">
           <input type="date" value={ofDate} onChange={
            (e)=>{setDate(e);}} />
            <ReservationMenu ofDate={ofDate} />
    </div>
     
    );
}