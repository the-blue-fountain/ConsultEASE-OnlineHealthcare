import {
    ChevronsUpDownIcon,
    CalendarIcon,
  } from "lucide-react";
  import {
    Card,
    CardHeader,
    Typography,
    CardBody,
  } from "@material-tailwind/react";
import ConfirmRejectButton from "./ConfirmButton";
import { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { doctorInfotype } from "../InputTypes/info";
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
}

type addressType={
  city:string,
  locality:string,
  postcode:string,
  countryName:string;
}
   
  const TABLE_HEAD = ["Patient Name", "Symptoms", "Time", "Date & Day","Location", "Confirmation"];
   
 
   
  export const Doc_Appointment:React.FC=():JSX.Element=>{
    const [loading,setLoading]=useState(true);
    const [appointments,setAppointments]=useState<appointmentType[]>([]);
    const [docInfo,setDocInfo]=useState<doctorInfotype>();
    const [patNames, setPatNames] = useState<{ [key: string]: string }>({});
    const [address,setAddress]=useState<addressType>();
    const[time,setTime] = useState("");

    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/v1/doctor/dashboard/`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      }).then((res)=>{
        setAppointments(res.data);
        setLoading(false);
      })
    },[]);
    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/v1/doctor/details/get`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      }).then((res)=>{
        setDocInfo(res.data);
      })
    },[]);
    useEffect(() => {
      const fetchPatientName = async (patId: string) => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/patient/get/${patId}`);
          setPatNames((prev) => ({ ...prev, [patId]: res.data.name }));
        } catch (error) {
          console.error('Error fetching patient name:', error);
          setPatNames((prev) => ({ ...prev, [patId]: '' }));
        }
      };
  
      appointments.forEach((appointment) => {
        fetchPatientName(appointment.patientId);
      });
    }, [appointments]);
    useEffect(()=>{
      async function fetchAddress(){
        try {
          if(docInfo){
            const response = await axios.get(`https://api-bdc.net/data/reverse-geocode?latitude=${docInfo.latitude}&longitude=${docInfo.longitude}&localityLanguage=en&key=bdc_2ea2200a8bec4bf69c4d4534c535f042`);
            setAddress(c=>({
              ...c,
              city:response.data.city,
              locality:response.data.locality,
              postcode:response.data.postcode,
              countryName:response.data.countryName
            }));
          }
        } catch (error) {
          // Handle errors here if needed
          console.error("Error fetching city:", error);
          return ""; // Or any default value indicating failure
        }
      }
      fetchAddress();
    },[docInfo]);
    
    function fetchdate(appointment_date:string):string{
      const date=appointment_date.split('T')[0];
      return date;
    }
    function fetchday(appointment_date:string):string{
      const date=appointment_date.split('T')[0];
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const mydate=new Date(date);
      const dayIndex = mydate.getDay();
      return daysOfWeek[dayIndex];
    }
    function prettyAddress(address:addressType):string{
      return ` ${address.city}, ${address.countryName}, ${address.postcode}`;
    }
    if(loading){
      return <SkeletonLoader2 />
    }
    return (
        <Card className="h-full w-full mx-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
          <CardHeader floated={false} shadow={false}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex items-center justify-between ">
              <div>
                <Typography className="text-[20px] font-sans font-bold text-violet-900"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Upcoming Appointments
                </Typography>
                <Typography color="gray" className="font-sans"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Confirm or Reject appointments for patients
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="rounded-none shadow-none border-none px-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className=" h-[750px] overflow-auto no-scrollbar">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-3 border-r-[2px] border-violet-700 transition-colors bg-violet-900"
                      >
                        <Typography
                          className="flex items-center justify-between gap-2 font-sans font-bold text-[14px] text-white leading-none"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
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
                      const classes = "p-2 ml-1 border-b border-violet-200 bg-violet-50";
                      return (
                        <tr key={appointment.patientId}>
                          <td className={classes}>
                            <div className="flex items-center">
                              <div className="flex flex-col">
                                <Typography
                                  className="font-sans font-bold text-violet-900 text-[15px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                  {patNames[appointment.patientId]}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography className="font-sans font-medium text-violet-900 text-[13.5px] h-11 overflow-y-auto custom-scrollbar"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <p className="w-64 whitespace-normal">{appointment.Symptoms}</p>
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                          <div className="flex items-center">
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={appointment.appointment_time as string }
                                onChange={(e)=>{
                                  setTime(e.target.value);
                                  
                                }}
                                className="py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-sans font-semibold flex"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                              <CalendarIcon className="h-5 w-5 mr-1.5 mt-0.5" />
                              {fetchdate(appointment.appointment_date)} | {fetchday(appointment.appointment_date)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              className="font-sans font-bold text-violet-900 text-[14px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          >
                              {(docInfo)?docInfo.clinic:""}
                            </Typography>
                            <Typography
                              className="font-sans font-semibold text-violet-900 opacity-65 text-[13px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                              {(address)?prettyAddress(address):""}
                            </Typography>
                          </td>
                          <td className={classes + ' items-center content-center align-middle justify-center'}>
                            <ConfirmRejectButton id={appointment.id} time={time} confirmed={appointment.confirmed} rejected={appointment.rejected} />
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