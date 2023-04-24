import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Reservation } from "../Model/Reservation";


export function ReservationMenu(props){
    let [reservationList,setReservationList]=useState([]);
    let [names,setNames]=useState("");
    let [counter,setCounter]=useState(0);
    let[ok,setOk]=useState(true);
    let[count,setCount]=useState(0);
    let [foodNames,setFoodNames]=useState([]);
    let [updater,setUpdater]=useState(true);
    let getList=async()=>{
        
        let path='http://localhost:8080/reservation/byDate/'+props.ofDate;
        let ofList=[];
        await axios.get(path)
             .then(res => {
                let target="";
                target = JSOG.stringify(res.data);
               ofList= JSOG.parse(target);
               
               
    
           }).catch(
           function (error) {
            console.log(error);
          });
        setReservationList(ofList);
      let thisList=ofList;
      ofList=[];
      for(let i=0;i<thisList.length;i++){
        ofList.push(thisList[i].name);
      }
        setNames(ofList);
ofList=[];
        await axios.get('http://localhost:8080/food').then(
            res => {
                let list=[];
                let target="";
                target = JSOG.stringify(res.data);
                let newObject= JSOG.parse(target);
                for (var i = 0; i < newObject.length; i++) {
                    list.push(newObject[i].name);
                  }
                ofList=list;
            }
        ).catch(
            function (error) {
             console.log(error);
           });

           setFoodNames(ofList);
    }
    let update=()=>{
       let nak=!updater;
        setUpdater(nak);
    }
    useEffect(()=>{
        getList();
    },[props.ofDate,ok,count,updater]);

    if(ok){
        if(reservationList.length!=0){
                return(<div>
            <button  className="btn btn-secondary" onClick={()=>{update()}}>Update Page</button>
                    <button  className="btn btn-secondary" onClick={()=>{setOk(false)}}>Create New Reservation:</button>
                    {(reservationList.map((e,i)=>{
                        return <Reservation updater={updater} foodNames={foodNames} reservation={e} ofDate={props.ofDate} upCounter={()=>setCounter(counter+1)} key={i} id={e.id}  names={names} />
                    }))}
                </div>);
        }
        else{
            return(<div>
                <button  className="btn btn-secondary" onClick={()=>{update()}}>Update Page</button>
                        <button  className="btn btn-secondary" onClick={()=>{setOk(false)}}>Create New Reservation:</button>
                       <br></br>
                        <a>there are no reservations on this date.</a>
                        <div>
                            <a>Note: upon entering, reservations it is set to current date.</a>
                        </div>
                    </div>);
        }
    
        }
        else{
        
        return(<div>
                    <button  className="btn btn-secondary" onClick={()=>{update()}}>Update Page</button>
                   
                    <button  className="btn btn-secondary" onClick={()=>{setOk(true)}}>Edit Reservation:</button>
                    <Reservation    updater={updater} foodNames={foodNames} ofDate={props.ofDate} upCounter={()=>setCounter(counter+1)} names={names} />
                        
                </div>);
        }
    }