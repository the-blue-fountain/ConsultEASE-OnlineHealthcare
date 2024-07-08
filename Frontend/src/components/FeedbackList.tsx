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

  
  import Rating from '@mui/material/Rating';
  import Stack from '@mui/material/Stack';
  import { useState,useEffect } from "react";
  import { BACKEND_URL } from "../config";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
import { SkeletonLoader2 } from "./Skeleton2";
  type feedbackType={
    id: string,
    patientId:string,
    appointment_date:string,
    appointment_time:string,
    punctuality:string,
    clarity:string,
    comfort:string,
    communication:string,
    comments:string,
    feedback_give:boolean,
    feedback:number
    type:string
  }

   
  const TABLE_HEAD = ["Patient Name", "Rating Given", "Meeting Type","Date and Time", "Feedback"]
   
 
   
  export const FeedbackList=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [appointments,setAppointments]=useState<feedbackType[]>([]);
    const [patNames, setPatNames] = useState<{ [key: string]: string }>({});
    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/v1/doctor/dashboard/feedback`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      }).then((res)=>{
        const offlineAppointments = res.data.offline.map((appointment: feedbackType) => ({
          ...appointment,
          type: 'Offline'
        }));
        const onlineAppointments = res.data.online.map((appointment: feedbackType) => ({
         ...appointment,
          type: 'Online'
        }));
        const allAppointments=[...offlineAppointments,...onlineAppointments];
        setAppointments(allAppointments);
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
    function convertTo12HourFormat(time24: string): string {
      // Split the time string into hours and minutes
      const [hours, minutes] = time24.split(':').map(Number);
  
      // Check if hours are greater than 12 to determine AM or PM
      const meridiem = hours >= 12 ? 'PM' : 'AM';
  
      // Convert hours to 12-hour format
      const hours12 = hours % 12 || 12;
  
      // Format the time in 12-hour format
      const time12 = `${hours12}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
  
      return time12;
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
                Feedback of Appointments
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
                        className="flex items-center justify-between gap-2 font-sans font-bold text-[14px] text-white leading-none"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
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
                  (appointment)=>{
                    const classes = "p-2 border-b border-violet-200 bg-violet-50";

                    return (
                      <tr key={appointment.id}>
                        <td className={classes}>
                          <div className="flex items-center">
                            <div className="flex flex-col">
                              <Typography
                                className="font-sans font-bold text-violet-900 text-[15px]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                              >
                                {patNames[appointment.patientId]}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes} >
                        <Stack spacing={2}>
                        <Rating name="half-rating" defaultValue={appointment.feedback} precision={1} disabled/>
                        </Stack>
                        </td>
                        <td className={classes}>
                        <div className="items-center font-sans font-bold text-violet-700 pl-4 text-[15px]">
                          {appointment.type}
                        </div>
                        </td>
                        <td className={classes}>                    
                          <Typography variant="small" color="blue-gray" className="font-sans font-semibold flex"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <Clock10Icon className="h-5 w-5 mr-1.5 mt-0.5" />
                                {fetchdate(appointment.appointment_date)} | {convertTo12HourFormat(appointment.appointment_time)}
                          </Typography>
                      </td>
                        <td className={classes}>
                        <button className={'bg-violet-900 p-2 hover:scale-105 font-sans ml-4 text-[13px] text-violet-50 rounded-full font-semibold' }
                         onClick={()=>{navigate(`/doc/feedbacks/${appointment.id}`)}}>View Feedback</button>                 
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