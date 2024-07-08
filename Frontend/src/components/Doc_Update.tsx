import React from 'react'
import { doctorFullInfotype } from '../InputTypes/info';
import { doctorUpdateType } from '../InputTypes/info';
import { convert } from './Pat_Appointments';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { BACKEND_URL } from '../config';
import { ImagePopupButton } from './PopUp';
import { SkeletonLoader } from './Skeleton1';


type daysAvailable ={
  monday:boolean,
  tuesday:boolean,
  wednesday:boolean,
  thursday:boolean,
  friday:boolean,
  saturday:boolean,
  sunday:boolean
}



export const Doc_Update:React.FC<doctorFullInfotype>=(props)=>{
  const [docUpdate,setDocUpdate]=useState<doctorUpdateType>({
    mobile:props.mobile,
    age:props.age,
    gender:props.gender,
    latitude:props.latitude,
    longitude:props.longitude,
    specialization:props.specialization,
    experience:props.experience,
    clinic:props.clinic,
    fee:props.fee,
    online_fee:props.online_fee,
    clinic_days:props.clinic_days,
    password:props.password,
    profile_pic:props.profile_pic
  });
  let profile_url=props.profile_pic;
  if(props.profile_pic==null){
    profile_url="/profile.png";
  }
  const [days,setDays]=useState<daysAvailable>({
    monday:false,
    tuesday:false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false,
    sunday:false
  });
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    } 
  };
  const [address,setAddress] =useState("Loading...");
  const [updatelocation,setUpdateLocation]=useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password,setPassword] = useState("");
  const [loading,setLoading]=useState(false);
  const [confirmspassword, setConfirmspassword] = useState("");
  function handleDropdownSpecialization(event:ChangeEvent<HTMLSelectElement>){
    setDocUpdate(c=>({
      ...c,
      specialization:event.target.value
    }));
  }
  function handleDropdownGender(event:ChangeEvent<HTMLSelectElement>){
    setDocUpdate(c=>({
    ...c,
       gender:event.target.value
    }));
  }
  function handleMonday(){
    setDays(c=>({
      ...c,
      monday:!c.monday
    }));
  }
  function handleTuesday(){
    setDays(c=>({
      ...c,
      tuesday:!c.tuesday
    }));
  }
  function handleWedesday(){
    setDays(c=>({
      ...c,
      wednesday:!c.wednesday
    }));
  }
  function handleThursday(){
    setDays(c=>({
      ...c,
      thursday:!c.thursday
    }));
  }
  function handleFriday(){
    setDays(c=>({
      ...c,
      friday:!c.friday
    }));
  }
  function handleSaturday(){
    setDays(c=>({
      ...c,
      saturday:!c.saturday
    }));
  }
  function handleSunday(){
    setDays(c=>({
      ...c,
      sunday:!c.sunday
    }));
  }
  function getLocation(){
    return new Promise<{latitude:number,longitude:number}>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({latitude:position.coords.latitude,
            longitude:position.coords.longitude}); // Resolve the promise when location is received
          },
          (error) => {
            console.log(error.message);
            reject(error); // Reject the promise in case of error
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser");
        reject(new Error("Geolocation not supported"));
      }
    });
    
  }
  function handleClinicdays(){
    return new Promise<string[]>((resolve) => {
      let clinicDaysString = '';
      if (days.monday) clinicDaysString += 'mon ';
      if (days.tuesday) clinicDaysString += 'tue ';
      if (days.wednesday) clinicDaysString += 'wed ';
      if (days.thursday) clinicDaysString += 'thu ';
      if (days.friday) clinicDaysString += 'fri ';
      if (days.saturday) clinicDaysString += 'sat ';
      if (days.sunday) clinicDaysString += 'sun ';
      
      clinicDaysString = clinicDaysString.trim();  
      let arr = clinicDaysString.split(' ');
      resolve(arr); // Resolve the promise once clinic days are processed
    });
  }
  async function handleImage(){
    if(selectedFile==null)return;
    try{
      const formdata=new FormData();
      formdata.append('upload',selectedFile);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const response=await axios.post(`${BACKEND_URL}/upload`,formdata,config);
      profile_url=response.data.url;
    }catch(e){
      alert("Unable to upload image");
    }
  }
  async function handleRequest(){
    if(password!=confirmspassword){
      alert("Password did not match");
      return;
    }
    // if(password===confirmspassword && password!=""){
    //   setDocUpdate(c=>({
    //     ...c,
    //     password:password
    //   }))
    // }
    setLoading(true);
    await handleImage();
    setLoading(false);
    if(updatelocation){
      const [location,clinicdays]=await Promise.all([getLocation(),handleClinicdays()]);
      const{latitude,longitude}=location;
      setAddress("Loading...");
      fetchAddress({latitude,longitude});
      try{
        const response=await axios.put(`${BACKEND_URL}/api/v1/doctor/details/update`,{
          password:password==""?docUpdate.password:password,
          mobile:docUpdate.mobile,
          age:docUpdate.age,
          gender:docUpdate.gender,
          latitude:latitude,
          longitude:longitude,
          specialization:docUpdate.specialization,
          experience:docUpdate.experience,
          clinic:docUpdate.clinic,
          fee:docUpdate.fee,
          online_fee:docUpdate.online_fee,
          clinic_days:clinicdays,
          profile_pic:profile_url=="/profile.png"?null:profile_url
        },{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          }
        });
        const json=response.data;
        if(json.message){
          alert(json.message);
        }
      }catch(e){
        alert("Error while processing");
      }
    }
    else{
      const clinicdays = await handleClinicdays();
      console.log(clinicdays);
      try{
        const response=await axios.put(`${BACKEND_URL}/api/v1/doctor/details/update`,{
          password:password==""?docUpdate.password:password,
          mobile:docUpdate.mobile,
          age:docUpdate.age,
          gender:docUpdate.gender,
          latitude:docUpdate.latitude,
          longitude:docUpdate.longitude,
          specialization:docUpdate.specialization,
          experience:docUpdate.experience,
          clinic:docUpdate.clinic,
          fee:docUpdate.fee,
          online_fee:docUpdate.online_fee,
          clinic_days:clinicdays,
          profile_pic:profile_url=="/profile.png"?null:profile_url
        },{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          }
        });
        const json=response.data;
        if(json.message){
          alert(json.message);
        }
      }catch(e){
        alert("Error while processing");
      }
    }
  }
  async function fetchAddress({latitude,longitude}:{latitude:number,longitude:number}){
    try{
      const response=await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=8efc2e425d0c40358eb66c6e347d4789`);
      const {city,state,postcode,country}=response.data.results[0].components;
      setAddress(`${city} ${state} ${postcode} ${country}`);

    }catch(e){
      console.error("Error fetching address",e);
    }
  }

  useEffect(()=>{
    
    if(props.clinic_days.includes("mon")){
      handleMonday();
    }
    if(props.clinic_days.includes("tue")){
      handleTuesday();
    }
    if(props.clinic_days.includes("wed")){
      handleWedesday();
    }
    if(props.clinic_days.includes("thu")){
      handleThursday();
    }
    if(props.clinic_days.includes("fri")){
      handleFriday();
    }
    if(props.clinic_days.includes("sat")){
      handleSaturday();
    }
    if(props.clinic_days.includes("sun")){
      handleSunday();
    }
    const {latitude,longitude} = props;
    fetchAddress({latitude,longitude});
  },[]);
  if(loading){
    return <SkeletonLoader />
  }
  return (
    <div className="w-full h-screen ">
      <div className="w-full h-screen">
        <div className="relative h-screen overflow-hidden bg-violet-100">
          <div className="absolute w-[380px] h-full top-0 left-0 bg-violet-800 items-center">
          <img
              className="absolute w-[275px] h-[275px] top-[200px] left-[50px] object-cover rounded-full align-middle"
              alt="Profile"
              src={selectedFile ? URL.createObjectURL(selectedFile) : profile_url}
            />
            <div className="mt-4">
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  className="sr-only"
                  id="profile_photo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profile_photo"
                  className="w-[129px] h-[32px] px-[16px] py-[8px] absolute top-[500px] left-[117px] font-sans font-bold inline-flex text-[15px] text-center whitespace-nowrap items-center text-violet-900 bg-violet-400 gap-[16px] rounded-[10px] hover:scale-105 hover:bg-violet-600"
                >
                  Select Photo
                </label>
              </div>
            </div>
            <button className="w-[129px] h-[32px] px-[16px] py-[8px] absolute top-[550px] left-[117px] bg-red-500 flex items-center gap-[16px] rounded-[10px] border-none hover:scale-105 hover:bg-violet-500]" onClick={()=>{
              setSelectedFile(null);
              profile_url="/profile.png";
            }}>
              <div className="relative w-[380px] mt-[-3.00px] mb-[-1.00px] text-white text-[14px] text-center whitespace-nowrap font-sans font-bold">
                Remove Photo
              </div>
            </button>
            <div className="relative mt-[-3.00px] ml-[-12.00px] top-[600px] text-white text-[14px] text-center whitespace-nowrap font-sans font-bold">
              <ImagePopupButton imageUrl={props.medical_certificate} msg="View Certificate"/>
              </div>
            <div className="absolute top-[22px] w-full [font-family:'Inter-Bold',Helvetica] font-bold text-[#eeeeee] text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Edit your Profile
            </div>
            <div className="absolute top-[165px] w-full [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              {props.email}
            </div>
            <div className="absolute top-[135px] w-full [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              {props.name}
            </div>
          </div>
          <div className="absolute w-[2200px] h-screen left-[363px] mx-44 bg-violet-100">
          <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[80px] left-[25px] font-sans font-bold text-violet-800">Mobile Number</div>
            <input className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[116px] left-[25px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"  
            onChange={(e)=>{
              setDocUpdate(c=>({
                  ...c,
                  mobile:e.target.value
              }))
            }} value={docUpdate.mobile}/>
            <button className="w-[183px] h-[32px] px-[16px] py-[8px] absolute top-[600px] left-[218px] bg-violet-400 flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] hover:scale-105" onClick={handleRequest}>
              <div className="relative w-[141px]  mt-[1.00px] mr-[1px] text-white text-[16px] text-center leading-[22.4px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                Confirm &amp; Save
              </div>
            </button>
            <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[210px] left-[25px] font-sans font-bold text-violet-800">Clinic Name</div>
            <input className="w-[288px] h-[30px] px-[16px] py-[8px] absolute top-[245px] left-[25px] bg-white flex items-center gap-[16px] font-sans font-semibold text-violet-500 rounded-[10px] border border-solid border-[#e0e0e0]" 
            onChange={(e)=>{
              setDocUpdate(c=>({
                  ...c,
                  clinic:e.target.value
              }))
            }} value={docUpdate.clinic}/> 
            
            <div className="w-[532px] h-[39px] px-[16px] py-[8px] absolute top-[440px] left-[25px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]">
              <div className="relative w-[83px] h-[21px] text-[#8f99f8] text-[14px] leading-[19.6px] whitespace-nowrap [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                Availability
              </div>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.sunday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleSunday}>
                <div className="relative w-[40px]  mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  SUN
                </div>
              </button>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.monday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleMonday}>
                <div className="relative w-[40px]  mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  MON
                </div>
              </button>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.tuesday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleTuesday}>
                <div className="relative w-[40px]  mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  TUE
                </div>
              </button>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.wednesday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleWedesday}>
                <div className="relative w-[40px]  mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  WED
                </div>
              </button>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.thursday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleThursday}>
                <div className="relative w-[40px]  mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  THU
                </div>
              </button>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.friday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleFriday}>
                <div className="relative w-[40px] mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  FRI
                </div>
              </button>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] mr-[-10.00px] ${days.saturday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleSaturday}>
                <div className="relative w-[40px]  mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  SAT
                </div>
              </button>
            </div>
            <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[272px] left-[25px] font-sans font-bold text-violet-800">Address</div>
            <div className="w-[533px] h-[39px] top-[308px] left-[24px] absolute rounded-[10px]">
              <div className="w-[533px] h-[39px] px-[16px] py-[8px] absolute top-0 left-0 bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]">
                <div className="relative w-[450px] h-[21px] text-[#8f99f8] text-[14px] leading-[19.6px] whitespace-nowrap [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  {address}
                </div>
              </div>
              <button onClick={()=>setUpdateLocation(true)}>
              <img
                className="absolute w-[32px] h-[34px] top-[3px] left-[488px] object-cover hover:scale-110"
                alt="Location"
                src="/location.png"
              />
              </button>
            </div>
            <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[210px] left-[333px] font-sans font-bold text-violet-800">Years of Experience</div>
            <input className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[245px] left-[333px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500" 
            onChange={(e)=>{
              setDocUpdate(c=>({
                  ...c,
                  experience:e.target.value
              }))
            }} value={docUpdate.experience}/>
            <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[80px] left-[333px] font-sans font-bold text-violet-800">Age</div>
            <input className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[116px] left-[333px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500" 
            onChange={(e)=>{
              setDocUpdate(c=>({
                  ...c,
                  age:parseInt(e.target.value)
              }))
            }} value={isNaN(docUpdate.age) ? "" : docUpdate.age.toString()} type="number" />
            <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[145px] left-[25px] font-sans font-bold text-violet-800">Specialization</div>
            <div className="flex w-[293px] h-[30px] items-center gap-[16px] px-[4px] py-[8px] absolute top-[183px] left-[25px] bg-white rounded-[10px] border border-solid border-[#e0e0e0]">
              <form className="relative text-[#8f99f8] text-[14px] leading-[2px] font-sans font-semibold">
                <select id="specialization" className=" flex h-full w-[290px] items-center gap-[16px] px-[12px] py-[2px] border-none text-violet-700 text-sm font-sans font-semibold rounded-lg p-1" onChange={handleDropdownSpecialization}>
                <option selected>{convert(props.specialization)}</option>
                <option value="NL">Neurologist</option>
                <option value="PL">Pulmonologist</option>
                <option value="CL">Cardiologist</option>
                <option value="DL">Dermatologist</option>
                <option value="SG">Surgeon</option>
                <option value="OL">Oncologist</option>
                <option value="GP">General Physician</option>
                <option value="ENT">ENT Specialist</option>
                <option value="GY">Gynecologist</option>
                <option value="NPL">Nephrologist</option>
                <option value="DE">Dentist</option>
                <option value="OP">Ophthalmologist</option>
                <option value="OR">Orthopedist</option>
                <option value="PSY">Psychiatrist</option>
                <option value="GEL">Gastroenterologist</option>
                <option value="DC">Diabetes Consultant</option>
            </select>
            </form>
            </div>
            <div className="w-[150px] h-[20px] px-[16px] py-[8px] absolute top-[350px] left-[25px] font-sans font-bold text-violet-800">Offline Fee</div>
            <div className="w-[293px] h-[20px] px-[16px] py-[8px] absolute top-[350px] left-[333px] font-sans font-bold text-violet-800">Online Fee</div>
            <input className="w-[224px] h-[30px] px-[16px] py-[2px] absolute top-[400px] left-[25px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"  
            onChange={(e)=>{
              setDocUpdate(c=>({
                  ...c,
                  fee:parseInt(e.target.value)
              }))
             
            }} value={isNaN(docUpdate.fee) ? "" : docUpdate.fee} type="number"/>
            <input className="w-[224px] h-[30px] px-[16px] py-[2px] absolute top-[400px] left-[333px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"  
            onChange={(e)=>{
              setDocUpdate(c=>({
                  ...c,
                  online_fee:parseInt(e.target.value)
              }))
              console.log(docUpdate.online_fee);
            }} value={isNaN(docUpdate.online_fee) ? "" : docUpdate.online_fee} type="number"/>
            <button 
              className="w-[183px] h-[32px] px-[16px] py-[8px] absolute top-[560px] left-[218px] bg-violet-400 flex items-center gap-[16px] rounded-[10px] border-none hover:scale-105 hover:bg-violet-500"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              <div className="relative w-[380px] mt-[-3.00px] mb-[-1.00px] text-white text-[14px] text-center whitespace-nowrap font-sans font-bold">
                Change Password
              </div>
            </button>
            {showPasswordFields && (
              <>
                <div className="w-[150px] h-[30px] px-[16px] py-[8px] absolute top-[480px] left-[25px] font-sans font-bold text-violet-800">
                  New Password
                </div>
                <input
                  className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[515px] left-[25px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }} placeholder="New Password"
                />
                <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[480px] left-[333px] font-sans font-bold text-violet-800">
                  Confirm New Password
                </div>
                <input
                  className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[515px] left-[333px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"
                  onChange={(e)=>{
                    setConfirmspassword(e.target.value)
                  }}placeholder="Confirm New Password"
                />
              </>
            )}
          
            <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[145px] left-[333px] font-sans font-bold text-violet-800">Gender</div>
            <div className="flex w-[224px] h-[30px] items-center gap-[16px] px-[4px] py-[8px] absolute top-[183px] left-[333px] bg-white rounded-[10px] border border-solid border-[#e0e0e0]">
              <div className="relative flex-1 mt-[-6.00px] mb-[-4.00px] text-[#8f99f8] text-[14px] leading-[24px] font-bold tracking-[0]">
              <form className="relative text-[#8f99f8] text-[14px] font-sans font-semibold">
                <select id="specialization" className=" flex h-full w-[220px] items-center gap-[16px] px-[12px] py-[2px] border-none text-violet-700 text-sm font-sans font-semibold rounded-lg p-1" onChange={handleDropdownGender}>
                <option selected>{props.gender=="M"?"Male":"Female"}</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            </form>              
            </div>
            </div>
            <div className="absolute top-[29px] left-[156px] [font-family:'Inter-Bold',Helvetica] font-bold text-violet-800 text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Update your Personal Details here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};