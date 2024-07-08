import  { useState,useEffect } from 'react';
import { CheckCircle2,  XCircle } from 'lucide-react';
import { BACKEND_URL } from '../config';
import axios from 'axios';

const ConfirmRejectButtonOnline = ({id,time,confirmed,rejected,link}:{id:string,time:string,confirmed:boolean,rejected:boolean,link:string}) => {
  const [status,setStatus]=useState("");
  useEffect(()=>{
    if(confirmed){
      setStatus("Confirmed");
    }else if(rejected){
      setStatus("Rejected");
    }
  },[])
  async function handleConfirm(){
    if(time==""){
      alert("Please select a time");
      return;
    }
    if(link==""){
        alert("Please provide a G-meet link");
        return;
    }
    setStatus("Confimed");
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/doctor/dashboard/${id}/online/confirm`,{
        time:time,
        link:link
      },{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      const json=response.data;
      if(json.message){
        alert(json.message);
      }
    }catch(e){
      alert('Error while processing');
    }
  };
  async function handleReject(){
    setStatus("Rejected");
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/doctor/dashboard/${id}/online/reject`,{},{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      const json=response.data;
      if(json.message){
        alert(json.message);
      }
    }catch(e){
      alert('Error while processing');
    }
  };

  return (
    <div className="flex space-x-2">
      {status ? (
        <div className={`w-24 h-6 ${status === 'Rejected' ? 'bg-red-300 text-red-900' : 'bg-green-300 text-green-900'} rounded-xl font-sans font-bold text-[12px] flex items-center justify-center`}>
          {status}
        </div>
      ) : (
        <>
          <button
            onClick={handleConfirm}
            className={`w-8 h-8 ml-4 bg-green-200 rounded-full flex items-center justify-center hover:scale-110`}
          >
            <CheckCircle2 className= "h-6 w-6 align-middle" />
          </button>
          <button
            onClick={handleReject}
            className={`w-8 h-8 bg-red-200 rounded-full flex items-center justify-center hover:scale-110`}
          >
             <XCircle className="h-6 w-6 align-middle" />
          </button>
        </>
      )}
    </div>
  );
};

export default ConfirmRejectButtonOnline;
