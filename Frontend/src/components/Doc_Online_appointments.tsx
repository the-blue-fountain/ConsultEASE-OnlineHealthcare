import {
    ChevronsUpDownIcon,
    Clock10Icon,
  } from "lucide-react";
  import {
    Card,
    CardHeader,
    Typography,
    CardBody,
  } from "@material-tailwind/react";

  import ConfirmRejectButtonOnline from "./ConfirmOnlineButton";
  import { useState,useEffect } from "react";
  import axios from "axios";
  import { BACKEND_URL } from "../config";
import { SkeletonLoader2 } from "./Skeleton2";
  type onlineappointmentType={
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
    feedback_given:boolean,
    prescription:string,
    meeting_link:string
  }

   
  const TABLE_HEAD = ["Patient Name", "Symptoms", "Time",  "Meeting Link","Date", "Confirmation"]
   
 
   
  export const  Doc_Online_appointments=()=>{
    const [loading,setLoading]=useState(true);
    const [appointments,setAppointments]=useState<onlineappointmentType[]>([]);
    //const [docInfo,setDocInfo]=useState<doctorInfotype>();
    const [patNames, setPatNames] = useState<{ [key: string]: string }>({});
    const[time,setTime] = useState("");
    const [link,setLink]=useState("");

    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/v1/doctor/dashboard/online`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      }).then((res)=>{
        setAppointments(res.data);
        setLoading(false);
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

    function fetchdate(appointment_date:string):string{
      const date=appointment_date.split('T')[0];
      return date;
    }
    if(loading){
      return <SkeletonLoader2 />
    }


    return (
(<Card className="h-full w-full mx-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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

              return (
                <tr key={appointment.id}>
                  <td className={classes}>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <Typography
                          className="font-sans font-bold text-violet-900 text-[15px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                          {patNames[appointment.patientId]}
                        </Typography>
                        {/* <Typography
                          className="font-sans font-semibold text-violet-900 opacity-65 text-[13px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                          {years} Years of Experience | Rating: {rating} / 5.0
                        </Typography> */}
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
                        value={appointment.appointment_time as string}
                        onChange={(e)=>{
                          setTime(e.target.value);
                          
                        }}
                        className="py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    </div>
                  </td>
                  <td className={classes}>
                  <div className="w-[195px] h-7 flex flex-row flex-wrap bg-violet-100 rounded-full shadow-md">
                    <input className="px-2 py-1 w-[160px] text-sm font-sans font-semibold text-violet-700 text-[12.5px] h-7 border-none rounded-full" placeholder={appointment.meeting_link==null? "G-Meet Code here":appointment.meeting_link} onChange={(e)=>{
                          setLink(e.target.value);
                          
                        }} ></input>
                    <button className={`${appointment.meeting_link==null?"bg-gray-300":"bg-green-300 hover:bg-green-400 text-green-700"}  mx-[140px] text-sm font-semibold py-[2px] px-3 h-7 top-[-28px] rounded-full align-right text-center relative z-10`} onClick={() =>{ if(appointment.meeting_link!=null){ window.location.href = appointment.meeting_link; }}}>
                      Join
                    </button>
                  </div>
                  </td>
                  <td className={classes}>                    
                <Typography variant="small" color="blue-gray" className="font-sans font-semibold flex"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <Clock10Icon className="h-5 w-5 mr-1.5 mt-0.5" />
                      {fetchdate(appointment.appointment_date)}
                    </Typography>
                </td>
                  <td className={classes}>
                    <ConfirmRejectButtonOnline id={appointment.id} time={time} link={link} confirmed={appointment.confirmed} rejected={appointment.rejected} />
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  </CardBody>
</Card>)
    );
  }