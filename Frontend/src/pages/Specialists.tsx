import axios from "axios" 
import { useState,useEffect } from "react"
import { BACKEND_URL } from "../config"
import { useParams } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { SidebarItem } from "../components/Sidebar"
import { DocCard } from "../components/DocCard"
import { Clock4,  HomeIcon, PhoneIncoming, UserCircle } from 'lucide-react';

type docsplType={
    id:string,
    name:string,
    latitude:number,
    longitude:number,
    specialization:string,
    experience:string,
    clinic:string,
    rating:number,
    fee:number,
    online_fee:number,
    profile_pic:string,
    clinic_days:string[],
}
type basicInfo={
    email:string,
    name:string,
}

interface SpecializationMapping {
    [abbreviation: string]: string;
  }
  
  const specializationMapping: SpecializationMapping = {
    NL: "Neurologist",
    PL: "Pulmonologist",
    CL: "Cardiologist",
    DL: "Dermatologist",
    SG: "Surgeon",
    OL: "Oncologist",
    GP: "General Physician",
    ENT: "ENT Specialist",
    GY: "Gynecologist",
    NPL: "Nephrologist",
    DE: "Dentist",
    OP: "Ophthalmologist",
    OR: "Orthopedist",
    PSY: "Psychiatrist",
    GEL: "Gastroenterologist",
    DC: "Diabetes Consultant"
  };
  
function convert(doctor: docsplType): void {
    const fullSpecialization = specializationMapping[doctor.specialization];
    if (fullSpecialization) {
      doctor.specialization = fullSpecialization;
    }
}
export const DocSpl=()=>{
    const {type}=useParams();
    console.log("Hii");
    console.log(type);
    const [loading,setLoading]=useState(true);
    const [doctors,setDoctors]=useState<docsplType[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/patient/doctors/${type}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setDoctors(res.data);
            setLoading(false);
        })
    },[]);
    const [patIntro,setPatIntro]=useState<basicInfo>({
        email:"",
        name:""
    });
    doctors.forEach(doctor=>{
        convert(doctor)
    })
    async function fetchCity(doctor:docsplType):Promise<string>{
        try {
            const response = await axios.get(`https://api-bdc.net/data/reverse-geocode?latitude=${doctor.latitude}&longitude=${doctor.longitude}&localityLanguage=en&key=bdc_2ea2200a8bec4bf69c4d4534c535f042`);
            const city = response.data.city;
            return city;
        } catch (error) {
            // Handle errors here if needed
            console.error("Error fetching city:", error);
            return ""; // Or any default value indicating failure
        }
    }
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/patient/details/get`,{
            headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setPatIntro(c=>({
            ...c,
            email:res.data.email,
            name:res.data.name
            }));
            setLoading(false);
        })
    },[])
    if(loading){
        return <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
        <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    </div>
    }
    return <div className="flex">
        <Sidebar name={patIntro.name} email={patIntro.email}>
            <hr className='my-2'/>
            <SidebarItem icon = {<HomeIcon size={20} />} text ='Home' active path="/pat/dashboard"/>
            <SidebarItem icon = {<UserCircle size={20} />} text ='Profile' path="/pat/profile"/>
            <SidebarItem icon = {<PhoneIncoming size={20} />} text ='Online Appointments' path="/pat/online_appointments" /> 
            <SidebarItem icon = {<Clock4 size={20} />} text ='Offline Appointments' path="/pat/appointments" /> 
        </Sidebar>
        <div className="flex justify-center items-center h-screen w-full bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)), url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`}}>
            <div className='overflow-y-scroll h-screen w-[500px] rounded-2xl flex flex-col no-scrollbar items-center my-6 border-black bg-indigo-100'>
                        <div >
                            {doctors.map(doctor=>
                                
                                <DocCard key={doctor.id}
                                    name={doctor.name}
                                    id={doctor.id}
                                    specialization={doctor.specialization}
                                    yoe={doctor.experience}
                                    clinic={doctor.clinic}
                                    fee={doctor.fee}
                                    online_fee={doctor.online_fee}
                                    clinic_days={doctor.clinic_days}
                                    rating={doctor.rating}
                                    profile_pic={doctor.profile_pic}
                                    city={fetchCity(doctor)}
                                     />
                                    
                            )}
                        </div>
            </div>
        </div>
        
    </div>
 }