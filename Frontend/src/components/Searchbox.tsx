import { DocCard } from "./DocCard"
import { SearchIcon } from "lucide-react"
import { useState,useEffect } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

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

export const SearchBox=()=>{
    const [doctors,setDoctors]=useState<docsplType[]>([]);
    const [filter,setFilter]=useState("");
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/patient/doctors/all?filter=`+filter,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setDoctors(res.data);
        })
    },[filter]);
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
    

    return (
        <div className='bg-violet-50 h-screen flex flex-col flex-grow items-center z-0'>
            <div className="flex flex-row items-center my-4">
                        <div className="flex border-none px-2 py-3 border-violet-200 rounded">
                            <input
                                type="text"
                                className="block w-[400px] px-4 py-2 text-violet-700 bg-white border rounded-full focus:border-violet-400 focus:ring-violet-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Search by Name..."
                                onChange={(e)=>{
                                    setFilter(e.target.value);
                                }}
                            />
                            <button className="px-4 mx-2 text-white bg-violet-600 hover:bg-violet-800  border-l rounded-full ">
                                <SearchIcon/>
                            </button>
                        </div>
            </div>
            <div className='overflow-y-scroll h-[670px] w-[500px] z-0 rounded-2xl flex flex-col no-scrollbar items-center my-2 border-violet-900 border bg-violet-100 shadow-sm'>
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
    )
}