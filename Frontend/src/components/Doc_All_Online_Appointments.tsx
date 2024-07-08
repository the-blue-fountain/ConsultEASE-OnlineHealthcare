import {
  CheckCircle2,
    ChevronsUpDownIcon,
    Clock10Icon,
  } from "lucide-react";
  import {
    Card,
    CardHeader,
    Typography,
    CardBody,
  } from "@material-tailwind/react";

  import { useState,useEffect} from "react";
  import axios from "axios";
  import { BACKEND_URL } from "../config";
import { ImagePopupButton2 } from "./PopUp";
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

   
  const TABLE_HEAD = ["Patient Name", "Prescription", "Time",  "Meeting Link","Date", "Status"]
   

   
  export const  Doc_All_Online_appointments=()=>{
    const [loading,setLoading]=useState(true);
    const [appointments,setAppointments]=useState<onlineappointmentType[]>([]);
    //const [docInfo,setDocInfo]=useState<doctorInfotype>();
    const [patNames, setPatNames] = useState<{ [key: string]: string }>({});
    const [status,setStatus]=useState<{[key:string]:string}>({});
    const [selectedFile, setSelectedFile] = useState<{[key:string]:File | null}>({});
    const [locked, setLocked] = useState<{[key:string]:boolean}>({});
    let prescription_url:string;
      

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/doctor/dashboard/online/all`,{
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        }).then((res)=>{
          const sortedAppointments = res.data.sort((a:onlineappointmentType, b:onlineappointmentType) => {
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
        if(appointment.prescription==null){
          setLocked((prev) => ({...prev, [appointment.id]: false }));
        }else{
          setLocked((prev) => ({...prev, [appointment.id]: true }));
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

    function fetchdate(appointment_date:string):string{
      const date=appointment_date.split('T')[0];
      return date;
    }

    async function handlePrescription(id:string){
      if(selectedFile[id]==null)return;
    try{
      const formdata=new FormData();
      formdata.append('upload',selectedFile[id] as File);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const response=await axios.post(`${BACKEND_URL}/upload`,formdata,config);
      console.log(response.data);
      prescription_url=response.data.url;
    }catch(e){
      alert("Unable to upload certificate");
    }
    }

    async function uploadPrescription(id:string){
      setLoading(true);
      await handlePrescription(id);
      setLoading(false);
      try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/doctor/dashboard/${id}/online/prescription`,{
          prescription:prescription_url
        },{
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        });
        const json=response.data;
        if(json.message){
          alert(json.message);
        }
      }
      catch(e){
        alert("Unable to upload prescription");
      }

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
          All Online Appointments
        </Typography>
        
      </div>
    </div>
  </CardHeader>
  <CardBody className="rounded-none shadow-none border-none px-0 py-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <div className="max-h-[584px] mb-0 pb-0 overflow-auto no-scrollbar">
      <table className="mt-4 mb-0 w-full min-w-max table-auto text-left">
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
              //const [selectedfile,setSelectedfile]=useState<File|null>(null);
              
              const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;
                if (files && files.length > 0) {
                  setSelectedFile((prev) => ({ ...prev, [appointment.id]: files[0] }));
                } 
              };
            
              const handleLock = () => {
                setLocked((prev) => ({...prev, [appointment.id]: true }));
                uploadPrescription(appointment.id);
              };

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
                  <div className="overflow-hidden overflow-y-hidden flex flex-row gap-[5px]">
                    {status[appointment.id]==="Completed" &&
                    (
                      <>
                          {!selectedFile[appointment.id] && (
                            <div>
                              {locked[appointment.id] && (
                                <div className="flex flex-row"><ImagePopupButton2 imageUrl={appointment.prescription}/>
                                <div className="font-sans font-bold pt-1.5 pl-2 text-violet-900 text-[14px]">Uploaded!</div></div>
                              )}
                            </div>
                          )}
                          {!locked[appointment.id] && (<input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="text-center whitespace-nowrap items-center px-3 rounded-lg w-[250px] overflow-x-hidden font-sans font-medium text-violet-900 bg-violet-200"
                            onChange={handleFileChange}
                            disabled={locked[appointment.id]}
                          />)}
                          {selectedFile[appointment.id] && (
                            <div>
                              {!locked[appointment.id] && (
                                <button className="text-center whitespace-nowrap items-center text-green-900 bg-green-400 rounded-full hover:scale-105 hover:bg-green-600 mt-1" onClick={handleLock}>
                                  <CheckCircle2/>
                                </button>
                              )}
                              {locked[appointment.id] && (
                                <div className="flex flex-row"><ImagePopupButton2 imageUrl={appointment.prescription}/>
                                <div className="font-sans font-bold pt-1.5 pl-2 text-violet-900 text-[14px]">Uploaded!</div></div>
                              )}
                            </div>
                          )}

                      </>
                    ) 
                    }
                  </div>
                  </td>
                  <td className={classes}>
                  <div className="flex items-center">
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={appointment.appointment_time as string}
                        
                        className="py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    </div>
                  </td>
                  <td className={classes}>
                  <div className="w-[195px] h-7 flex flex-row flex-wrap bg-violet-100 rounded-full shadow-md">
                    <input className="px-2 py-1 w-[160px] text-sm font-sans font-semibold text-violet-700 text-[12.5px] h-7 border-none rounded-full" placeholder={appointment.meeting_link==null? "G-Meet Code here":appointment.meeting_link}  ></input>
                    <button className={`${appointment.meeting_link==null || appointment.completed?"bg-gray-300":"bg-green-300 hover:bg-green-400 text-green-700"}  mx-[140px] text-sm font-semibold py-[2px] px-3 h-7 top-[-28px] rounded-full align-right text-center relative z-10`} onClick={() =>{ if(appointment.meeting_link!=null && !appointment.completed){ window.location.href = appointment.meeting_link; }}}>
                      {status[appointment.id]==='Completed'?"Expired":"Join"}
                    </button>
                  </div>
                  </td>
                  <td className={classes}>                    
                <Typography variant="small" color="blue-gray" className="font-sans font-semibold flex"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <Clock10Icon className="h-5 w-5 mr-1.5 mt-0.5" />
                      {fetchdate(appointment.appointment_date)}
                    </Typography>
                </td>
                  <td className={classes + ' items-center content-center align-middle justify-center'}>
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