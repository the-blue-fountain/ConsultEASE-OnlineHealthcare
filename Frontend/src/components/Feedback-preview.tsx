import  { useState,useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { BACKEND_URL } from '../config';
import axios from "axios";


type feedbacktype={
  punctuality:string,
  clarity:string,
  Comfort:string,
  Communication:string,
  Comments:string
  feedback:number
}
export const FeedbackPreview = ({appointmentid}:{appointmentid:string}) => {
  const [loading,setLoading]=useState(true);
  const [feedback, setFeedback] = useState<feedbacktype>({
    punctuality: '',
    clarity: '',
    Comfort: '',
    Communication: '',
    Comments: '',
    feedback:0
  });
  //const [rating,setRating]=useState(3);
  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/doctor/feedback/${appointmentid}`).then((res)=>{
      setFeedback(res.data);
      setLoading(false);
    })
  },[]);
  if(loading){
    return  <div className="flex justify-center items-center min-h-screen">
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

  return (
    <div className="mx-auto my-1.5 w-[700px] bg-violet-50 rounded-2xl py-3 align-middle mt-14 h-[700px] px-4">
      <h2 className="text-[26px] font-semibold font-sans text-violet-950 mb-2 text-center">Feedback Review</h2>
      <form >
        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How would you rate the punctuality of your appointment?</label>
          <div className = "bg-white w-[400px] px-2 py-0.5 font-sans font-bold text-violet-800 rounded-full h-8">{feedback.punctuality}</div>
        </div>

        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How satisfied are you with the clarity of information provided by the doctor?</label>
          <div className = "bg-white w-[400px] px-2 py-0.5 font-sans font-bold text-violet-800 rounded-full h-8">{feedback.clarity}</div>
        </div>

        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How comfortable did you feel discussing your concerns with the doctor during the appointment?</label>
          <div className = "bg-white w-[400px] px-2 py-0.5 font-sans font-bold text-violet-800 rounded-full h-8">{feedback.Comfort}</div>
        </div>

        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How effective was the doctor's communication in addressing your questions and concerns?</label>
          <div className = "bg-white w-[400px] px-2 py-0.5 font-sans font-bold text-violet-800 rounded-full h-8">{feedback.Communication}</div>
        </div>

        <div className="mb-4 flex flex-row">
          <label className='text-[15px] mr-2 font-sans font-semibold text-violet-900'>Overall Rating: </label>
          <Stack spacing={1}>
            <Rating name="overallSatisfaction" value={feedback.feedback} disabled precision={1} />
          </Stack>
        </div>

        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={feedback.Comments}
            className="mt-1 block w-full px-2 border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            rows={3}
          ></textarea>
        </div>

      </form>
    </div>
  );
};

