import {
    ChevronsUpDownIcon,
    Clock10Icon, 
    BookX,
    NewspaperIcon
  } from "lucide-react";
  import {
    Card,
    CardHeader,
    Typography,
    CardBody,
  } from "@material-tailwind/react";
  import { useState,useEffect} from "react";
  import { doctorFullInfotype } from "../InputTypes/info";
  import { BACKEND_URL } from "../config";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
import { SkeletonLoader2 } from "./Skeleton2";

  type appointmentType={
    id:string,
    patientId:string,
    doctorId:string,
    Symptoms:string,
    appointment_date:string,
    appointment_time:string,
    feedback:number,
    completed:boolean,
    confirmed:boolean,
    rejected:boolean,
    feedback_given:boolean
  }
  
  
  
export function convert(spl: string): string{
  if (spl === "NL") {
    return "Neurologist";
  } else if (spl === "PL") {
      return "Pulmonologist";
  } else if (spl === "CL") {
      return "Cardiologist";
  } else if (spl === "DL") {
      return "Dermatologist";
  } else if (spl === "SG") {
      return "Surgeon";
  } else if (spl === "OL") {
      return "Oncologist";
  } else if (spl === "GP") {
      return "General Physician";
  } else if (spl === "ENT") {
      return "ENT Specialist";
  } else if (spl === "GY") {
      return "Gynecologist";
  } else if (spl === "NPL") {
      return "Nephrologist";
  } else if (spl === "DE") {
      return "Dentist";
  } else if (spl === "OP") {
      return "Ophthalmologist";
  } else if (spl === "OR") {
      return "Orthopedist";
  } else if (spl === "PSY") {
      return "Psychiatrist";
  } else if (spl === "GEL") {
      return "Gastroenterologist";
  } else if (spl === "DC") {
      return "Diabetes Consultant";
  } else {
      return "Specialization not found";
}
}
   
const TABLE_HEAD = ["Doctor Name", "Specialization", "Status", "Date and Time","Location", "Action"];
   
   
  export const  Pat_Appointment=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [appointments,setAppointments]=useState<appointmentType[]>([]);
    const [doclist,setDoclist]=useState<{[key:string]:doctorFullInfotype}>({});
    const [status,setStatus]=useState<{[key:string]:string}>({});
    const [city,setCity]=useState<{[key:string]:string}>({});
    const [country,setCountry]=useState<{[key:string]:string}>({});
    const currentdate=new Date();

    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/v1/patient/book/offline/appointments`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      }).then((res)=>{
        //console.log(res.data);
        const sortedAppointments = res.data.sort((a:appointmentType, b:appointmentType) => {
          // Convert appointment_date strings to Date objects
          const dateA = new Date(a.appointment_date).getTime();
          const dateB = new Date(b.appointment_date).getTime();
          // Compare appointment dates
          return dateB - dateA;
        });
        setAppointments(sortedAppointments);
        setLoading(false);
      })
    },[]);
    
    
    useEffect(() => {
      const fetchDoctors = async (docId: string) => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/doctor/get/${docId}`);
          setDoclist(prev => ({ ...prev, [docId]: res.data }));
        } catch (error) {
          console.error('Error fetching doctor info:', error);
        }
      }
  
      appointments.forEach(appointment => {
        if(!doclist[appointment.doctorId]){
          fetchDoctors(appointment.doctorId);
        }
        if (appointment.completed) {
          setStatus(prev => ({ ...prev, [appointment.id]: 'Completed' }));
        } else if (appointment.confirmed) {
          setStatus(prev => ({ ...prev, [appointment.id]: 'Confirmed' }));
        } else if (appointment.rejected) {
          setStatus(prev => ({ ...prev, [appointment.id]: 'Rejected' }));
        } else {
          setStatus(prev => ({ ...prev, [appointment.id]: 'Pending' }));
        }
      });
    }, [appointments]);

    useEffect(()=>{
      const fetchAddress=async(docId:string)=>{
        try{
            const response = await axios.get(`https://api-bdc.net/data/reverse-geocode?latitude=${doclist[docId].latitude}&longitude=${doclist[docId].longitude}&localityLanguage=en&key=bdc_2ea2200a8bec4bf69c4d4534c535f042`);
            setCity(prev=>({...prev,[docId]:response.data.city}));
            setCountry(prev=>({...prev,[docId]:response.data.countryName}));

        }catch(e){
          console.error("Error fetching address",e);
        }
      }
      appointments.forEach(appointment=>{
        if(!city[appointment.doctorId]){
          fetchAddress(appointment.doctorId);
        }

      });
      

    },[doclist]);

    function fetchdate(appointment_date:string):string{
      const date=appointment_date.split('T')[0];
      return date;
    }
    function fetchtime(time24:string):string{
      var splitTime = time24.split(":");
      var hours = parseInt(splitTime[0]);
      var minutesInt = parseInt(splitTime[1]);

      // Determine whether it's AM or PM
      var period = hours < 12 ? "AM" : "PM";

      // Convert hours to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be converted to 12

      // Add leading zero to minutes if necessary
      var minutes = minutesInt < 10 ? "0" + minutesInt : minutesInt;

      // Return the formatted time
      return hours + ":" + minutes + " " + period;
    }
    function feedback_button(appointment_date:string):boolean{
      const date=new Date(appointment_date);
      const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
      const differenceInMilliseconds = currentdate.getTime() - date.getTime();
      if(differenceInMilliseconds<=thirtyDaysInMilliseconds) return true;
      else return false;
    }
    async function handleDelete(appointmentid:string){
      try{
        const response=await axios.delete(`${BACKEND_URL}/api/v1/patient/book/offline/delete/${appointmentid}`,{
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        })
        const json=response.data;
        if(json.message){
          alert(json.message);
        }
        window.location.reload();
      }catch(e){
        console.error("Error deleting appointment",e);
      }

    }

    if(loading){
      return <SkeletonLoader2 />
    }
    return (
    <Card className="h-full w-full mx-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} shadow={false}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="flex items-center justify-between ">
          <div>
            <Typography className="text-[20px] font-sans font-bold text-violet-900"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Requested Appointments
            </Typography>
            <Typography color="gray" className="font-sans"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              See information about all booked appointments
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="rounded-none shadow-none border-none px-0 pb-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="max-h-[584px] overflow-auto no-scrollbar">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-3 border-r-[2px] border-violet-700 transition-colors bg-violet-900"
                  >
                    <Typography
                      className="flex items-center justify-between gap-2 font-sans font-bold text-[14px] text-white leading-none"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronsUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map(
                (appointment) => {
                  const classes = "p-2 border-b border-violet-200 bg-violet-50";
                  
                  //console.log(appointment);
                  // console.log(doclist);
                  if(!doclist[appointment.doctorId]) {
                    return <div>Null</div>
                  }
                  return (
                    <tr key={appointment.id}>
                      <td className={classes}>
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <Typography
                              className="font-sans font-bold text-violet-900 text-[15px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                              {doclist[appointment.doctorId].name}
                            </Typography>
                            <Typography
                              className="font-sans font-semibold text-violet-900 opacity-65 text-[13px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                              {doclist[appointment.doctorId].experience} Years of Experience | Rating: {doclist[appointment.doctorId].rating.toFixed(1)} / 5.0
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography className="font-sans font-bold text-violet-900 text-[14px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {convert(doclist[appointment.doctorId].specialization)}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max content-center min-w-[40px]">
                          <div
                            className={`${
                              status[appointment.id] === 'Confirmed' ? 'bg-green-200 text-green-900' :
                                status[appointment.id] === 'Rejected' ? 'bg-red-200 text-red-900' :
                                  status[appointment.id] === 'Completed' ? 'bg-violet-200 text-violet-900' :
                                    status[appointment.id] === 'Pending' ? 'bg-gray-200 text-gray-900' :
                                      ''
                              } font-sans font-semibold text-[13.5px] py-1.5 px-3 w-[120px] text-center rounded-2xl hover:scale-105 align-middle `}>
                            {status[appointment.id]}
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-sans font-semibold flex"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                          <Clock10Icon className="h-5 w-5 mr-1.5 mt-0.5" />
                          {status[appointment.id] === 'Confirmed' || status[appointment.id] === 'Completed' ? `${fetchdate(appointment.appointment_date)} | ${fetchtime(appointment.appointment_time)}` : `${fetchdate(appointment.appointment_date)} | --`}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          className="font-sans font-bold text-violet-900 text-[14px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                          {doclist[appointment.doctorId].clinic}
                        </Typography>
                        <Typography
                          className="font-sans font-semibold text-violet-900 opacity-65 text-[13px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                          {/* {printAddress(doclist[appointment.doctorId].latitude, doclist[appointment.doctorId].longitude)} */}
                          {city[appointment.doctorId]}, {country[appointment.doctorId]}
                        </Typography>
                      </td>
                      <td className={classes + ' items-center content-center align-middle justify-center'}>
                    {(status[appointment.id] === 'Pending') &&
                      <button className="hover:scale-110 h-4 justify-center flex flex-row "onClick={()=>handleDelete(appointment.id)}>
                      <BookX className="h-4 w-5 mx-3 align-middle"/>
                      <div>Cancel Slot</div>
                    </button>}
                      {(status[appointment.id] === 'Completed' && feedback_button(appointment.appointment_date)) &&
                      <button  className="hover:scale-110 justify-center h-4 flex flex-row " onClick={()=>{
                        if(!appointment.feedback_given){
                          navigate(`/pat/offline/feedback/${appointment.id}`)
                        }
                        }}>
                      <NewspaperIcon className="h-4 w-5 mx-3 align-middle"/>
                      <div>{appointment.feedback_given==true?"Feedback Done!":"Give Feedback"}</div>
                    </button>}
                  </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>

    );
  }