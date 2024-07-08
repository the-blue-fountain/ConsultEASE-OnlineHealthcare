import  {  useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
interface booktype{
  trigger:boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  name:string;
  specialization:string;
  rating:number;
  fee:number;
  online_fee:number;
  clinic:string;
  id:string;
  profile_pic:string;
  clinic_days:string[];
}
interface dateselector{
  clinic_days:string[];
  selectedDate:Date;
  setSelectedDate:React.Dispatch<React.SetStateAction<Date>>;
}
export const  Booking:React.FC<booktype>=(props)=>{
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [symptoms,setSymptoms] = useState("");
  function convertToPostgreSQLDateTime(dateString: Date): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.543Z`;
}
  async function bookAppointment(){
    const app_date=convertToPostgreSQLDateTime(selectedDate as Date);
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/patient/book/offline/${props.id}`,{
        appointment_date:app_date,
        symptoms:symptoms
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      const json=response.data;
      if(json.message){
        alert(json.message);
      }
      props.setTrigger(false);
    }catch(e){
      alert("Error while Booking!");
    }
    


  }

  async function bookOnline(){
    const app_date=convertToPostgreSQLDateTime(selectedDate as Date);
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/patient/book/online/${props.id}`,{
        appointment_date:app_date,
        symptoms:symptoms
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      const json=response.data;
      if(json.message){
        alert(json.message);
      }
      props.setTrigger(false);
    }catch(e){
      alert("Error while Booking!");
    }
  }


  return (props.trigger)?(
    <div className="w-screen h-screen align-middle items-center">
      <div className="fixed w-[833px] h-[584px] top-[120px] z-50 left-[390px]  border-l-violet-900 border-spacing-1">
        <div className="relative h-[584px] bg-violet-50 border-violet-500 border-4 pb-2 rounded-[15px] overflow-hidden">
          <div className="absolute w-[306px] h-[510px] top-[62px] left-[14px] bg-[#5a21b6] rounded-[10px] overflow-hidden">
            <img
              className="absolute w-[238px] h-[240px] top-[180px] left-[34px] object-cover rounded-full"
              alt="Profile"
              src={props.profile_pic==null?"/profile.png":props.profile_pic}
            />
            <div className="absolute top-[22px] w-full font-sans font-bold text-[#eeeeee] text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Doctor Profile
            </div>
            <div className="absolute top-[106px] w-full font-sans font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
             {props.specialization}
            </div>
            <p className="absolute top-[132px] w-full font-sans font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              Overall Rating : {props.rating.toFixed(1)} / 5.0
            </p>

            <div className="absolute top-[441px] w-full font-sans font-bold text-white text-[18px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              {props.clinic}
            </div>
            <div className="absolute top-[76px] w-full font-sans font-bold text-white text-[18px] text-center tracking-[0] leading-[25.2px] whitespace-nowrap">
             {props.name}
            </div>
          </div>
          <div className="absolute w-[491px] h-[510px] top-[62px] left-[328px] bg-[#c9d5fc] rounded-[10px] overflow-hidden">
          <button 
            className={`flex w-[150px] h-[32px] items-center gap-[16px] px-[16px] py-[8px] absolute top-[461px] left-[75px] 
            ${props.online_fee == null ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-700 hover:scale-105 border border-solid border-[#e0e0e0]'} 
            rounded-[10px]`}
            onClick={props.online_fee != null ? bookOnline : undefined}
            disabled={props.online_fee == null}
          >
          <div className="w-[150px] mt-[-4.00px] mb-[-2.00px] font-sans font-bold text-white text-center leading-[22.4px] overflow-hidden relative text-[16px]">
            Book Online
          </div>
        </button>
        <button 
          className={`flex w-[150px] h-[32px] items-center gap-[16px] px-[16px] py-[8px] absolute top-[461px] left-[275px] 
          ${props.fee == null ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-700 hover:scale-105 border border-solid border-[#e0e0e0]'} 
          rounded-[10px]`}
          onClick={props.fee != null ? bookAppointment : undefined}
          disabled={props.fee == null}
        >
          <div className="w-[150px] mt-[-4.00px] mb-[-2.00px] font-sans font-bold text-white text-center leading-[22.4px] overflow-hidden relative text-[16px]">
            Book Offline
          </div>
        </button>
            {/* <div className="absolute top-[17px] left-[159px] font-sans font-bold text-indigo-800 text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Enter your details
            </div> */}
            <div className="absolute w-[459px] h-[167px] top-[278px] left-[16px] bg-[#5a21b6] rounded-[10px]">
                <textarea className="flex-1 w-[440px] h-[130px] top-[28px] left-[9px] font-sans font-medium rounded-[10px] text-[#5a21b6] leading-[24px] relative text-[16px] border-none text-wrap px-2 py-2" placeholder="Enter your symptoms here..." onChange={(e)=>setSymptoms(e.target.value)}>
                </textarea>
              <div className="absolute w-[530px] top-[2px] left-[5px] font-sans font-bold text-[#eeeeee] text-[14px] tracking-[0] leading-[24px]">
                &nbsp;&nbsp; Describe your Symptoms
              </div>
            </div>
            <div className="h-[140px] top-[120px] left-[16px] absolute w-[459px] bg-[#5a21b6] rounded-[10px]">
              <div className="h-[100px] top-[32px] left-[7px] w-[446px] absolute bg-white rounded-[8px] border border-solid border-[#e0e0e0] shadow-[0px_1px_2px_#0000000d] flex m-auto p-auto" >

          <DateSelector clinic_days={props.clinic_days} selectedDate={selectedDate as Date } setSelectedDate={setSelectedDate as React.Dispatch<React.SetStateAction<Date>>}/>           
           </div>
              <div className="absolute w-[530px] top-[5px] left-[5px] font-sans font-bold text-[#eeeeee] text-[16px] tracking-[0] leading-[24px]">
                &nbsp;&nbsp; Select Date
              </div>
            </div>
            <div className="h-[95px] top-[10px] left-[17px] absolute w-[459px] bg-[#5a21b6] rounded-[10px]">
            <div className="h-[50px] top-[35px] left-[6px] w-[446px] absolute rounded-[8px] border border-solid border-[#e0e0e0] shadow-[0px_1px_2px_#0000000d] flex flex-col bg-white m-auto p-auto">
              <div className="flex justify-between items-center px-4 text-violet-950">
                <span className="font-sans font-semibold">Online Consultation Fee:</span>
                <span className="font-sans font-bold">{props.online_fee == null || isNaN(props.online_fee) ? 'N/A' : `${props.online_fee}.00 ₹`} </span> {/* Replace XX with the online fee */}
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="font-sans font-semibold">Offline Consultation Fee:</span>
                <span className="font-sans font-bold">{props.fee == null || isNaN(props.fee) ? 'N/A' : `${props.fee}.00 ₹`} </span> {/* Replace XX with the offline fee */}
              </div>
            </div>
            <div className="absolute w-[530px] top-[5px] left-[10px] font-sans font-bold text-[#eeeeee] text-[16px] tracking-[0] leading-[24px]">
              <div className="flex justify-between items-center">
                <span>Consultation Fee</span>
                <span>X X</span>
              </div>
            </div>
          </div>

          </div> 
          <div className="absolute top-[4px] left-[303px] font-bold text-violet-950 text-[35px] text-center tracking-[0] leading-[49.0px] whitespace-nowrap">
            Book Appointment
          </div>
          <div className="flex w-[40px] h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 absolute top-[14px] left-[779px] bg-[#eeeeee] rounded-[8px]">
            <button className="relative w-fit ml-[-4.00px] mr-[-4.00px] [font-family:'Bubblegum_Sans-Regular',Helvetica] font-normal text-violet-950 text-[25px] tracking-[0] leading-[37.5px] whitespace-nowrap hover:scale-105 hover:text-red-800 hover:font-bold" onClick= {()=>{
              props.setTrigger(false);
            }}>
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  ):"";
};


const Card = ({ date, onSelect, clinic_days }: { date: Date, onSelect: (date: Date) => void, selected: boolean|undefined ,clinic_days:string[]}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const formattedDay = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
  }
  );
  function convertDay(formattedDay: string):string{
    switch (formattedDay) {
      case 'Sunday':
        return 'sun';
      case 'Monday':
        return 'mon';
      case 'Tuesday':
        return 'tue';
      case 'Wednesday':
        return 'wed';
      case 'Thursday':
        return 'thu';
      case 'Friday':
        return 'fri';
      case 'Saturday':
        return 'sat';
      default:
        return '';
    }
  }
  const compareday=convertDay(formattedDay);
  const val=clinic_days.includes(compareday);
  return ((val)?(
    <button className={`w-[80px] h-[90px] my-1 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl bg-indigo-100 hover:bg-indigo-300 focus:bg-green-500 transition-shadow duration-300 ease-in-out`} onClick={() => onSelect(date)}>
    <div className="w-[80px] h-[90px] relative">
        <div className="top-0 absolute w-[80px] h-[20px] left-0 bg-[#401b85] overflow-hidden">
          <div className="absolute w-[90px] top-0 left-[-5px] font-sans font-bold text-[#eeeeee] text-[14px] text-center tracking-[0] leading-[normal]">
            {formattedDate}
          </div>
        </div>
        <div className="top-[70px] absolute w-[80px] h-[20px] left-0 bg-[#401b85] overflow-hidden">
          <div className="absolute w-[90px] top-[1px] left-[-5px] font-sans font-bold text-[#eeeeee] text-[12px] text-center tracking-[0] leading-[normal]">
            {formattedDay}
          </div>
        </div>
        <img className="absolute w-[50px] h-[50px] top-[20px] left-[15px] object-cover" alt="Date" src="/date.png" />
      </div>
    </button>

  ):(
    <button className={`w-[80px] h-[90px] my-1 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl bg-gray-100 transition-shadow duration-300 ease-in-out`}>
        <div className="w-[80px] h-[90px] relative">
            <div className="top-0 absolute w-[80px] h-[20px] left-0 bg-gray-500 overflow-hidden">
              <div className="absolute w-[90px] top-0 left-[-5px] font-sans font-bold text-[#eeeeee] text-[14px] text-center tracking-[0] leading-[normal]">
                {formattedDate}
              </div>
            </div>
            <div className="top-[70px] absolute w-[80px] h-[20px] left-0 bg-gray-500 overflow-hidden">
              <div className="absolute w-[90px] top-[1px] left-[-5px] font-sans font-bold text-[#eeeeee] text-[12px] text-center tracking-[0] leading-[normal]">
                {formattedDay}
              </div>
            </div>
            <img className="absolute w-[50px] h-[50px] top-[20px] left-[15px] object-cover" alt="Date" src="/date_gray.png" />
          </div>
        </button>
  )      
  );
};

const DateSelector:React.FC<dateselector> = (props) => {

  const handleDateSelect = (date:Date) => {
    props.setSelectedDate(date);
  };

  const getNext7Days = () => {
    const today = new Date();
    const next7Days = [...Array(7)].map((_, index) => {
      const date = new Date();
      date.setDate(today.getDate() + index + 1); // Start from tomorrow
      return date;
    });
    return next7Days;
  };

  return (
    <>
    <div className="flex overflow-x-scroll no-scrollbar">
    <div className="flex flex-nowrap gap-2 ">
          {getNext7Days().map((date, index) => (
          <Card
            key={index}
            date={date}
            onSelect={handleDateSelect}
            selected={props.selectedDate && props.selectedDate.getTime() == date.getTime()}
            clinic_days={props.clinic_days}
          />
        ))}
    </div>
    </div>
    <div>
    <div className="absolute w-[530px] top-[-28.5px] left-[290px] font-sans font-bold text-violet-200 text-[12px] tracking-[0] leading-[24px]">
              Selected Date: {props.selectedDate ? props.selectedDate.toLocaleDateString('en-US') : 'None'}
              </div>
    </div></>
  );
};