import { useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import Autocomplete from "../Util/Autocomplete";
import { OrderMenu } from "../ListMenu/OderMenu";
export function Reservation(props){
    let [note,setNote]=useState("");
    let [dateOfEvent, setDateOfEvent] = useState(null);
    let [creditCardNumber,setCreditCardNumber]=useState("");
    let [name,setName]=useState("");
 
    let [oldName,setOldName]=useState("");
    let [oldNote,setOldNote]=useState("");
    let [oldDateOfEvent, setOldDateOfEvent] = useState(null);
    let [oldCreditCardNumber,setOldCreditCardNumber]=useState("");
    let [errorMessage,setErrorMessage]=useState("");

    let [amount, setAmount] = useState(0);
    let [oldAmount,setOldAmount]=useState(0);
    let [errorMessage2,setErrorMessage2]=useState("");
    let [isSpecial,setIsSpecial]=useState(false);
    let [ok,setOk]=useState(true);
    
        let initialize=async(id)=>{
            let isOk=ok;
            if(oldName!=props.reservation.name ||
                oldDateOfEvent!=props.reservation.dateOfEvent ||
                oldNote!=props.reservation.note ||
                (oldAmount != props.reservation.transaction.amount && props.reservation.transaction.amount != undefined )||
                (oldCreditCardNumber != props.reservation.transaction.creditCardNumber && props.reservation.transaction.creditCardNumber != undefined )){
                isOk=false;
            }

            if(props.id && isOk==false){
            let path='http://localhost:8080/reservation/'+props.id;
            await axios.get(path)
                 .then(res => {
                    let target="";
                    target = JSOG.stringify(res.data);
                    let newObject= JSOG.parse(target);
                    let reservation=newObject;
                    setNote(reservation.note);
                 
                    setDateOfEvent(reservation.dateOfEvent);
           
                    setName(reservation.name);
                    setOldName(reservation.name);
                    setOldNote(reservation.note);
                    setOldDateOfEvent(reservation.dateOfEvent);
                    if(props.id){
                        try{
                            setCreditCardNumber(reservation.transaction.creditCardNumber);
                            setOldCreditCardNumber(reservation.transaction.creditCardNumber);
                                            
                                setAmount(reservation.transaction.amount);
                            setOldAmount(reservation.transaction.amount);
                                   
                        }
                        catch{

                        }
                        
                    }
               }).catch(
               function (error) {
                console.log(error);
              });}
        }
        let submit=async(event)=>{
      
            event.preventDefault();
            let path="http://localhost:8080/reservation";
            if(!props.id){
                await axios.post(
                    path,{note:note,dateOfEvent:new Date(props.ofDate),name:name})
                    .then(res => {
                        props.upCounter();
                    }).catch(
                    function (error) {
                    console.log(error);
                    });
            }
            else{
                path+="/exist";
             

                
       let list=creditCardNumber.split("");
       let isTrue=true;
       let goodString=creditCardNumber;
            goodString.replace(/\s/g, '');
            setCreditCardNumber(goodString);
            goodString.split("");
       if(list.length==19){
           for(let i=0;i<goodString.length;i++){
            if(isTrue){
                if(i===4||i===9||i===14){
                    if(!goodString[i]==="="){
                        isTrue=false;
                    }
                }
                else{
                
                    if(!Number.isInteger(parseInt(goodString[i]))){
                     
                        isTrue=false;                   
                                        }
                }}
                else{break;}
           }
       }else{isTrue=false;setErrorMessage(name+"is not in format 1111-1111-1111");}
         if(Number(amount)<0&&isTrue==true){
                setErrorMessage2("amount is less then 0.");
                isTrue=false;
            }
        if(isTrue==true){
            if(isSpecial){
                path+="/special";
                await axios.post(
                    path,{ id: props.id ,note:note,dateOfEvent:dateOfEvent,name:name,creditCardNumber:creditCardNumber,amount:amount})
                    .then(res => {
                        props.upCounter(); 
                    }).catch(
                    function (error) {
                    console.log(error);
                    });
                    setErrorMessage("");
                    setErrorMessage2("");props.upCounter();
            }
            else{
                    await axios.post(
                    path,{ id: props.id ,note:note,dateOfEvent:dateOfEvent,name:name,creditCardNumber:creditCardNumber})
                    .then(res => {
                        props.upCounter(); 
                    }).catch(
                    function (error) {
                    console.log(error);
                    });
                    setErrorMessage("");
                    setErrorMessage2("");
            }


                  
                }
                else{
                    setErrorMessage(name+"is not in format 1111-1111-1111");
                }
              
            }
            event.preventDefault();
        }
        useEffect(() => {
            
            initialize();
        });
        let Remove=async()=>{
            if(props.id){
                
            await axios.delete('http://localhost:8080/reservation/'+props.id).catch(
                function (error) {
                    console.log(error);
                });props.upCounter();
        }}
if(props.id){
    return(
       <div  className="mt-sm-2 mb-sm-4"> 
        <div>is Special cost: {isSpecial.toString()}</div>
        <button onClick={() => setIsSpecial(!isSpecial)}>change</button>
       
            <form  className=" border border-dark" onSubmit={submit} >
                <div  className="form-group row">
                    <div>previous Name:{oldName}</div>
                    
                    <label className="col-sm-2 col-form-label"for="name" >Name:</label>
                    <div class="col-sm-10">
                        <Autocomplete getCurrentKey={(e)=>setName(e)} suggestions={props.names} />
                    </div>
                </div>
                <div  className="form-group row">
                   
                    <label className="col-sm-2 col-form-label"for="note" >Note:</label>
                    <div class="col-sm-10">
                    <input  className="form-control"type="text" id="note" note="note" onChange={(e)=>{setNote(e.target.value)}} value={note}/>
                
                </div></div>
            
                <div  className="form-group row">
                    
                    <label className="col-sm-2 col-form-label"for="dateOfEvent" >Date of Event:</label>
                    <div class="col-sm-10">
                        <input  className="form-control"type="date" id="dateOfEvent" note="dateOfEvent" onChange={(e)=>{setDateOfEvent(e.target.value)}} value={dateOfEvent}/>
                    </div>
                </div>
                <div  className="form-group row">
                    
                    <label className="col-sm-2 col-form-label"for="creditCardNumber" >CreditCardNumber:</label>
                    <div class="col-sm-10">
                        <input  className="form-control"type="text" id="creditCardNumber" name="creditCardNumber" onChange={(e)=>{setCreditCardNumber(e.target.value)}} value={creditCardNumber}/>
                    </div>
                    <b>{errorMessage}</b>
                
                </div>
                <div  className="form-group row">
                    
                    <label className="col-sm-2 col-form-label"for="amount" >Amount:</label>
                    <div class="col-sm-10">
                        <input  className="form-control"type="text" id="amount" name="amount" onChange={(e)=>{setAmount(e.target.value)}} value={amount}/>
                    </div>
                    <b>{errorMessage2}</b>
                
                </div>
                
                <div>
                  <input type="submit" className="btn  btn-success" value="submit" /> 
                  <button  className=" btn btn-danger" onClick={Remove} >Remove</button>  
                
                </div>
        </form>
        <div>Orders:</div>
        <OrderMenu updater={props.updater} orders={props.reservation.orders} foodNames={props.foodNames} resId={props.id}/>
       </div>
    );
}
else{
    return(
        <form  className=" border border-dark mt-sm-2 mb-sm-4" onSubmit={submit} >
            <div  className="form-group row">
                <div>previous Name:{oldName}</div>
               
                <label className="col-sm-2 col-form-label"for="name" >Name:</label>
                <div class="col-sm-10">
                <Autocomplete getCurrentKey={(e)=>setName(e)} suggestions={props.names} />
                </div>
   </div>
            <div  className="form-group row">
                
                <label className="col-sm-2 col-form-label"for="note" >Note:</label>
                <div class="col-sm-10">
                    <input type="text"  className="form-control"id="note" note="note" onChange={(e)=>{setNote(e.target.value)}} value={note}/>
                </div>
            </div>
           
        
        
            <input type="submit" className="btn btn-success" value="submit" />
        </form>
    );
}
    


}