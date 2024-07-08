import { ChangeEvent, useState } from "react";
import { doctorInfotype } from "../InputTypes/info";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SkeletonLoader } from "./Skeleton1";
type daysAvailable ={
  monday:boolean,
  tuesday:boolean,
  wednesday:boolean,
  thursday:boolean,
  friday:boolean,
  saturday:boolean,
  sunday:boolean
}

export  const Doc_Info=({email,name}:{email:string,name:string})=> {
  const navigate=useNavigate();
  

  const [docInfo,setDocInfo]=useState<doctorInfotype>({
    mobile:"",
    age:0,
    gender:"",
    latitude:0,
    longitude:0,
    specialization:"",
    experience:"",
    clinic:"",
    fee:0,
    online_fee:0,
    clinic_days:[]
  })
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
  const [certificate,setCertificate]=useState<File|null>(null);
  const [loading,setLoading]=useState(false);
  let fileurl:string,cfurl:string;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    } 
  };
  const handleCertificateChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setCertificate(event.target.files[0]);
    }
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
  function handleDropdownSpecialization(event:ChangeEvent<HTMLSelectElement>){
    setDocInfo(c=>({
      ...c,
      specialization:event.target.value
    }));
  }
  function handleDropdownGender(event:ChangeEvent<HTMLSelectElement>){
    setDocInfo(c=>({
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
      console.log(clinicDaysString);     
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
      fileurl=response.data.url;
    }catch(e){
      alert("Unable to upload image");
    }
  }
  async function handleCertificate(){
    if(certificate==null)return;
    try{
      const formdata=new FormData();
      formdata.append('upload',certificate);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const response=await axios.post(`${BACKEND_URL}/upload`,formdata,config);
      console.log(response.data);
      cfurl=response.data.url;
    }catch(e){
      alert("Unable to upload certificate");
    }
  }
  async function handleRequest(){
    setLoading(true);
    await handleImage()
    await handleCertificate()
    setLoading(false);
    const nullEntries = Object.entries(docInfo).filter(([key, value]) => {
      // Skip latitude and longitude properties
      if (key === 'latitude' || key === 'longitude') {
          return false;
      }
      // Check for null, empty string, or zero value
      return value === null || value === "" || value === 0;
  });
  
  if (nullEntries.length > 0) {
      alert("Please fill in all the details");
      return;
  }
  
    try {
      console.log(fileurl,cfurl);
      // Wait for both location and clinic days to be processed
      const [location,clinicDays]=await Promise.all([getLocation(),handleClinicdays()]);
      
      // Now both location and clinic days are updated
      try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/doctor/details/add`,
        {
          mobile:docInfo.mobile,
          age:docInfo.age,
          gender:docInfo.gender,
          latitude:location.latitude,
          longitude:location.longitude,
          specialization:docInfo.specialization,
          experience:docInfo.experience,
          clinic:docInfo.clinic,
          fee:docInfo.fee,
          online_fee:docInfo.online_fee,
          clinic_days:clinicDays,
          profile_pic:fileurl,
          medical_certificate:cfurl
        },{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          },
        });
        const json=response.data;
        if(json.error){
          alert(json.error);
          navigate('/doc/info');
        }
         else if(json.message){
          alert(json.message);
          navigate('/doc/dashboard');

        }
      }catch(e){
        alert("Can't Update details");
      }
      
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  if(loading){
    return <SkeletonLoader />
  }
  return (
    <div className="w-screen h-screen ">
      <div className="w-screen h-screen">
        <div className="relative h-screen overflow-hidden">
          <div className="absolute w-screen h-full top-0 left-0 bg-violet-800 items-center">
          <img
              className="absolute w-[275px] h-[275px] top-[200px] left-[50px] object-cover rounded-full align-middle"
              alt="Profile"
              src={selectedFile ? URL.createObjectURL(selectedFile) : "/profile.png"} />
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
            <div className="absolute top-[22px] left-[90px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#eeeeee] text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Welcome to OMCS
            </div>
            <div className="absolute top-[165px] w-[380px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              {email}
            </div>
            <div className="absolute top-[135px] w-[380px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              {name}
            </div>
          </div>
          <div className="absolute w-[2200px] h-screen left-[363px] bg-violet-100">
            <input className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[116px] left-[25px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"  
            onChange={(e)=>{
              setDocInfo(c=>({
                  ...c,
                  mobile:e.target.value
              }))
            }} placeholder="Mobile Number" />
            <div className="mt-4">
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  className="sr-only"
                  id="certificate"
                  accept="image/*"
                  onChange={handleCertificateChange}
                />
                <label
                  htmlFor="certificate"
                  className="w-[370px] h-[32px] px-[16px] py-[8px] absolute top-[410px] left-[25px] font-sans font-bold inline-flex text-[15px] text-center whitespace-nowrap items-center text-violet-900 bg-violet-400 gap-[16px] rounded-[10px] hover:scale-105 hover:bg-violet-600"
                >
                  Upload your Medical Certificate to Verify
                </label>
                <img
                className="w-[20px] h-[20px] mt-[-2.50px] mb-[-2.50px] absolute top-[418px] left-[355px] object-cover"
                alt="Attach"
                src="/attach.png"
              />
              <div className="absolute top-[415px] left-[400px]"> {certificate?.name} </div>
              </div>
            </div>
            <button className="w-[172px] h-[32px] px-[16px] py-[8px] absolute top-[550px] left-[218px] bg-violet-400 flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] hover:scale-105" onClick={handleRequest}>
              <div className="relative w-[141px]  mt-[1.00px] mr-[1px] text-white text-[16px] text-center leading-[22.4px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                Confirm &amp; Save
              </div>
            </button>
            <input className="w-[288px] h-[30px] px-[16px] py-[8px] absolute top-[204px] left-[25px] bg-white flex items-center gap-[16px] font-sans font-semibold text-violet-500 rounded-[10px] border border-solid border-[#e0e0e0]" 
            onChange={(e)=>{
              setDocInfo(c=>({
                  ...c,
                  clinic:e.target.value
              }))
            }} placeholder="Clinic Name"/> 
            <div className="w-[532px] h-[35px] top-[354px] left-[25px] absolute rounded-[10px]">
              <div  className="w-[532px] h-[35px] px-[16px] py-[3px] absolute top-0 left-0 bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]">
                <div className="relative w-[122px] text-[#8f99f8] text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  Consulation Fee
                </div>
                <input className="flex w-[132px] items-center gap-[16px] px-[16px] py-[2px] relative self-stretch text-center bg-white font-sans font-semibold text-violet-500 rounded-[10px] border border-solid border-[#e0e0e0]" 
                onChange={(e)=>{
                  setDocInfo(c=>({
                      ...c,
                      fee:parseInt(e.target.value)
                  }))
                }} placeholder="Offline"/>                
                <input className="flex w-[132px] items-center gap-[16px] px-[16px] py-[2px] relative self-stretch text-center bg-white font-sans font-semibold text-violet-500 rounded-[10px] border border-solid border-[#e0e0e0]" 
                onChange={(e)=>{
                  setDocInfo(c=>({
                      ...c,
                      online_fee:parseInt(e.target.value)
                  }))
                }} placeholder="Online"/>  
                </div>            
              <div className="absolute w-[77px] top-[5px] left-[445px] text-[#8f99f8] text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                Rupees(₹)
              </div>
            </div>
            <div className="w-[532px] h-[39px] px-[16px] py-[8px] absolute top-[248px] left-[25px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]">
              <div className="relative w-[83px] h-[21px] text-[#8f99f8] text-[14px] leading-[19.6px] whitespace-nowrap [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                Availability
              </div>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.sunday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleSunday}>
                <div className="relative w-[40px]  mt-[1.00px] mr-[1px] text-white text-[14px] leading-[19.6px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  SUN
                </div>
              </button>
              <button className={`w-[45px] h-[30px] px-[5px] py-[8px] relative hover:scale-110 mt-[-3.50px] mb-[-3.50px] ${days.monday? 'bg-green-400':'bg-violet-400'} flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]`} onClick={handleMonday} >
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
            <div className="w-[533px] h-[39px] top-[301px] left-[24px] absolute rounded-[10px]">
              <div className="w-[533px] h-[39px] px-[16px] py-[8px] absolute top-0 left-0 bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]">
                <div className="relative w-[450px] h-[21px] text-[#8f99f8] text-[14px] leading-[19.6px] whitespace-nowrap [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  Address
                </div>
              </div>
              <button onClick={getLocation}>
                <img
                  className="absolute w-[32px] h-[34px] top-[3px] left-[488px] object-cover hover:scale-110"
                  alt="Location"
                  src="/location.png"
                />
              </button>
              
            </div>
            <input className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[204px] left-[333px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500" 
            onChange={(e)=>{
              setDocInfo(c=>({
                  ...c,
                  experience:e.target.value
              }))
            }} placeholder="Years of Experience"/>
            <input className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[116px] left-[333px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500" 
            onChange={(e)=>{
              setDocInfo(c=>({
                  ...c,
                  age:parseInt(e.target.value)
              }))
            }} placeholder="Age" />
            <div className="flex w-[293px] h-[30px] items-center gap-[16px] px-[4px] py-[8px] absolute top-[160px] left-[25px] bg-white rounded-[10px] border border-solid border-[#e0e0e0]">
              <form className="relative text-[#8f99f8] text-[14px] leading-[2px] font-sans font-semibold">
                <select id="specialization" className=" flex h-full w-[290px] items-center gap-[16px] px-[12px] py-[2px] border-none text-violet-700 text-sm font-sans font-semibold rounded-lg p-1" onChange={handleDropdownSpecialization}>
                <option selected>Specialization</option>
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
            <div className="flex w-[224px] h-[30px] items-center gap-[16px] px-[4px] py-[8px] absolute top-[160px] left-[333px] bg-white rounded-[10px] border border-solid border-[#e0e0e0]">
              <div className="relative flex-1 mt-[-6.00px] mb-[-4.00px] text-[#8f99f8] text-[14px] leading-[24px] font-bold tracking-[0]">
              <form className="relative text-[#8f99f8] text-[14px] font-sans font-semibold">
                <select id="specialization" className=" flex h-full w-[220px] items-center gap-[16px] px-[12px] py-[2px] border-none text-violet-700 text-sm font-sans font-semibold rounded-lg p-1" onChange={handleDropdownGender} >
                <option selected>Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            </form>              
            </div>
            </div>
            <div className="absolute top-[29px] left-[172px] [font-family:'Inter-Bold',Helvetica] font-bold text-violet-800 text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Enter your Personal Details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};