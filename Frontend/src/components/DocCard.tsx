import React from "react";
import { useState,useEffect } from "react";
import { Booking } from "./Booking";

interface DocCardProps{
  id:string,
  name:string,
  specialization:string,
  yoe:string,
  clinic:string,
  fee:number,
  online_fee:number,
  clinic_days:string[],
  rating:number,
  profile_pic:string,
  city:Promise<string>
}

export const DocCard:React.FC<DocCardProps>=(props)=>{
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const [resolvedCity, setResolvedCity] = useState("");
  const [popup,setPopup]=useState(false);


  useEffect(() => {
    props.city.then((resolvedCity) => {
      setResolvedCity(resolvedCity);
    });
  }, [props.city]);

  const isDayAvailable: Record<string, boolean> = {};
  
  daysOfWeek.forEach(day => {
    isDayAvailable[day] = props.clinic_days.includes(day);
  });

  return (
    <div className="w-[482px] h-[139px] mx-10 my-3 flex-wrap ">
      <div className="w-[482px] h-[139px] top-0 left-0">
        <div className="relative h-[139px] rounded-[15px] ">
          <div className="w-[482px] h-[145px] left-0 bg-violet-100 rounded-[15px] border-violet-300 border-2 absolute top-0 overflow-hidden hover:bg-violet-200">
            <div className="w-[234px] h-[139px] left-[140px] absolute top-0 overflow-hidden">
              <div className="absolute w-[334px] h-[70px] top-[10px] left-[8px]">
                <div className="absolute w-[334px] top-0.5 left-0 font-sans font-bold text-violet-800 text-[17px] tracking-[0] leading-[25.2px]">
                  {props.name}
                </div>
                <div className="absolute w-[334px] top-[26px] left-0 font-sans font-semibold text-violet-800 text-[12px] tracking-[0] leading-[18.2px]">
                  {props.specialization} | {props.yoe} years of experience
                </div>
                <div className="absolute w-auto text-wrap h-auto top-[45px] left-0 font-sans font-semibold text-violet-800 text-[12px] tracking-[0] leading-[16.8px]">
                   {props.clinic},{resolvedCity}
                </div>
              </div>
              <p className="absolute top-[100px] left-[8px] font-sans font-normal text-transparent text-[15px] tracking-[0] leading-[16.8px] whitespace-nowrap">
                {daysOfWeek.map(day=>(<span key={day} className={`mx-1 ${isDayAvailable[day] ? 'text-violet-800 font-bold font-sans' : 'text-violet-400 font-sans font-bold'}`}>{day[0].toUpperCase()}</span>
               ))}
              </p>
            </div>
            <img
              className="absolute rounded-2xl w-[126px] h-[129px] top-[5px] left-[8px] border-4 border-violet-400 object-cover px-0.5 py-0.5"
              alt="Download"
              src={props.profile_pic==null?"/profile.png":props.profile_pic}
            />
            <div className="absolute w-[77px] h-[25px] top-[11px] left-[396px]">
              <div className="relative w-[75px] h-[25px]">
                <div className="absolute w-[72px] h-[25px] top-0 left-0 bg-[#03c04a] rounded-[5px]" />
                <div className="absolute w-[65px] top-[2px] left-[10px] font-sans font-bold text-white text-[14px] tracking-[0] leading-[19.6px] whitespace-nowrap">
                 {props.rating.toFixed(1)} / 5.0
                </div>
              </div>
            </div>
          </div>
          <button className="flex w-[112px] h-[30px] items-center justify-center gap-[8px] px-[16px] py-0 absolute top-[92px] left-[358px] bg-violet-800 rounded-[8px] hover:scale-105" onClick={()=>{
            setPopup(true);
          }}>
            <div className="relative w-fit font-sans font-bold text-white text-[14px] tracking-[0] leading-[19.6px] whitespace-nowrap">
              Book Slot
            </div>
          </button>
        </div>
      </div>
      <Booking trigger={popup} setTrigger={setPopup}
                                        name={props.name}
                                        specialization={props.specialization}
                                        rating={props.rating}
                                        fee={props.fee}
                                        online_fee={props.online_fee}
                                        clinic={props.clinic}
                                        id={props.id}
                                        profile_pic={props.profile_pic}
                                        clinic_days={props.clinic_days} />
    </div>
  );
};
