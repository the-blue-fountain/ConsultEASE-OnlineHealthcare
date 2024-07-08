import React,{useState} from 'react'
import { patientFullInfotype, patientUpdateType } from '../InputTypes/info';
import axios from 'axios';
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { BACKEND_URL } from '../config';
import { SkeletonLoader } from './Skeleton1';



export const  Pat_Update:React.FC<patientFullInfotype>=(props)=>{
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [loading,setLoading]=useState(false);
  const [address,setAddress] = useState("Loading...");
  const [updatelocation,setUpdateLocation]=useState(false);
  const [password,setPassword] = useState("");
  const [confirmspassword, setConfirmspassword] = useState("");
  const [patUpdate,setPatUpdate]=useState<patientUpdateType>({
    mobile:props.mobile,
    age:props.age,
    gender:props.gender,
    latitude:props.latitude,
    longitude:props.longitude,
    password:props.password
  })
  let profile_url=props.profile_pic;
  if(props.profile_pic==null){
    profile_url="/profile.png";
  }
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    } 
  };
  function handleDropdownGender(event:ChangeEvent<HTMLSelectElement>){
    setPatUpdate(c=>({
    ...c,
       gender:event.target.value
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
  async function fetchAddress({latitude,longitude}:{latitude:number,longitude:number}){
    try{
      const response=await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=8efc2e425d0c40358eb66c6e347d4789`);
      const {city,state,postcode,country}=response.data.results[0].components;
      setAddress(`${city} ${state} ${postcode} ${country}`);

    }catch(e){
      console.error("Error fetching address",e);
    }
  }
  async function handleRequest(){
    if(password!=confirmspassword){
      alert("Password did not match");
      return;
    }
    setLoading(true);
    await handleImage();
    setLoading(false);
    if(updatelocation){
      const location =await getLocation();
      const {latitude,longitude}=location;
      setAddress("Loading...");
      fetchAddress({latitude,longitude});
      try{
        const response=await axios.put(`${BACKEND_URL}/api/v1/patient/details/update`,{
          password:password==""?patUpdate.password:password,
          mobile:patUpdate.mobile,
          age:patUpdate.age,
          gender:patUpdate.gender,
          latitude:latitude,
          longitude:longitude,
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
    }else{
      try{
        const response=await axios.put(`${BACKEND_URL}/api/v1/patient/details/update`,{
          password:password==""?patUpdate.password:password,
          mobile:patUpdate.mobile,
          age:patUpdate.age,
          gender:patUpdate.gender,
          latitude:patUpdate.latitude,
          longitude:patUpdate.longitude,
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


  useEffect(()=>{
    const {latitude,longitude}=props;
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
                  Change Photo
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
            <button className="w-[183px] h-[32px] px-[16px] py-[8px] absolute top-[550px] left-[218px] bg-violet-400 flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] hover:scale-105" onClick={handleRequest}>
              <div className="relative w-[141px]  mt-[1.00px] mr-[1px] text-white text-[16px] text-center leading-[22.4px] [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                Confirm &amp; Save
              </div>
            </button>

            <div className="w-[400px] h-[30px] px-[16px] py-[8px] absolute top-[340px] left-[24px] font-sans font-bold text-violet-900"> Address </div>
            <div className="w-[533px] h-[39px] top-[380px] left-[24px] absolute rounded-[10px]">
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
            <div className="w-[400px] h-[30px] px-[16px] py-[8px] absolute top-[120px] left-[65px] font-sans font-bold text-violet-900"> Age </div>
            <input className="w-[400px] h-[30px] px-[16px] py-[8px] absolute top-[155px] left-[65px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500" 
            onChange={(e)=>{
              setPatUpdate(c=>({
                  ...c,
                  age:parseInt(e.target.value)
              }))
            }} value={isNaN(patUpdate.age) ? "" : patUpdate.age.toString()} type="number"/>

            <div className="w-[400px] h-[30px] px-[16px] py-[8px] absolute top-[255px] left-[65px] font-sans font-bold text-violet-900"> Mobile Number </div>
            <input className="w-[400px] h-[30px] px-[16px] py-[8px] absolute top-[290px] left-[65px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500" 
            onChange={(e)=>{
              setPatUpdate(c=>({
                  ...c,
                  mobile:e.target.value
              }))
            }} value={patUpdate.mobile}/>
            
            <div className="w-[400px] h-[30px] px-[16px] py-[8px] absolute top-[185px] left-[65px] font-sans font-bold text-violet-900"> Gender </div>
            <div className="flex w-[400px] h-[30px] items-center gap-[16px] px-[4px] py-[8px] absolute top-[220px] left-[65px] bg-white rounded-[10px] border border-solid border-[#e0e0e0]">
              <div className="relative flex-1 mt-[-6.00px] mb-[-4.00px] text-[#8f99f8] text-[14px] leading-[24px] font-bold tracking-[0]">
              <form className="relative text-[#8f99f8] text-[14px] font-sans font-semibold">
                <select id="specialization" className=" flex h-full w-[390px] items-center gap-[16px] px-[12px] py-[2px] border-none text-violet-700 text-sm font-sans font-semibold rounded-lg p-1" onChange={handleDropdownGender} >
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
            <button 
              className="w-[183px] h-[32px] px-[16px] py-[8px] absolute top-[505px] left-[218px] bg-violet-400 flex items-center gap-[16px] rounded-[10px] border-none hover:scale-105 hover:bg-violet-500"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              <div className="relative w-[380px] mt-[-3.00px] mb-[-1.00px] text-white text-[14px] text-center whitespace-nowrap font-sans font-bold">
                Change Password
              </div>
            </button>
            {showPasswordFields && (
              <>
                <div className="w-[150px] h-[30px] px-[16px] py-[8px] absolute top-[420px] left-[25px] font-sans font-bold text-violet-800">
                  New Password
                </div>
                <input
                  className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[460px] left-[25px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"
                  onChange={(e)=>setPassword(e.target.value)}placeholder="New Password"
                />
                <div className="w-[293px] h-[30px] px-[16px] py-[8px] absolute top-[420px] left-[333px] font-sans font-bold text-violet-800">
                  Confirm New Password
                </div>
                <input
                  className="w-[224px] h-[30px] px-[16px] py-[8px] absolute top-[460px] left-[333px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"
                   onChange={(e)=>setConfirmspassword(e.target.value)} placeholder="Confirm New Password"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};