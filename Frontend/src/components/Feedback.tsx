import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

type feedbacktype={
    punctuality:string,
    clarity:string,
    comfort:string,
    communication:string,
    comments:string
}
export const FeedbackForm = ({appointmentid}:{appointmentid:string}) => {
  const navigate=useNavigate();
  const [feedback, setFeedback] = useState<feedbacktype>({
    punctuality: '',
    clarity: '',
    comfort: '',
    communication: '',
    comments: ''
  });
  const [rating,setRating]=useState(0);
  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if(event){}
    if (newValue !== null) {
      setRating(newValue);
  }
};
const handledocRating=async()=>{
  try{
    await axios.post(`${BACKEND_URL}/api/v1/patient/book/offline/appointments/${appointmentid}`,{
      rating:rating
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log("Request Done");
  }catch(e){
    alert("Error occured in updating doctor's rating");
  }
}

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    console.log(appointmentid);
     e.preventDefault();
    // // Handle form submission logic here
    // console.log('Submitting feedback:', feedback);
    // console.log('Rating:',rating)
    // // Reset form fields after submission
    try{
      console.log("In first route");
      const response=await axios.post(`${BACKEND_URL}/api/v1/patient/book/offline/feedback/${appointmentid}`,{
        punctuality:feedback.punctuality,
        clarity:feedback.clarity,
        comfort:feedback.comfort,
        comments:feedback.comments,
        communication:feedback.communication
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Request Done");
      const json=response.data;
      console.log(json);
      if(json.message){
        alert(json.message);
      }
    }catch(e){
      alert("Error occured in processing feedback");
    }
    handledocRating();
    navigate('/pat/appointments');

    // setFeedback(c=>({
    //   ...c,
    //   punctuality: '',
    //   clarity: '',
    //   comfort: '',
    //   communication: '',
    //   comments: ''
    // }));
  };

  return (
    <div className="max-w-md mx-auto my-1.5 w-[600px] bg-violet-50 rounded-2xl px-3 py-3">
      <h2 className="text-[26px] font-semibold font-sans text-violet-950 mb-2 text-center">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How would you rate the punctuality of your appointment?</label>
          <div className="mt-1 grid grid-cols-5 gap-16 bg-violet-100 w-auto h-auto pl-2 pr-24 py-2 rounded-xl">
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="punctuality"
                value="Poor"
                checked={feedback.punctuality === 'Poor'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Poor</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="punctuality"
                value="Bad"
                checked={feedback.punctuality === 'Bad'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Bad</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="punctuality"
                value="Average"
                checked={feedback.punctuality === 'Average'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Average</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="punctuality"
                value="Good"
                checked={feedback.punctuality === 'Good'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Good</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="punctuality"
                value="Excellent"
                checked={feedback.punctuality === 'Excellent'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Excellent</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How satisfied are you with the clarity of information provided by the doctor?</label>
          <div className="mt-1 grid grid-cols-5 gap-16 bg-violet-100 w-auto h-auto pl-2 pr-24 py-2 rounded-xl">
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="clarity"
                value="Poor"
                checked={feedback.clarity === 'Poor'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Poor</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="clarity"
                value="Bad"
                checked={feedback.clarity === 'Bad'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Bad</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="clarity"
                value="Average"
                checked={feedback.clarity === 'Average'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Average</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="clarity"
                value="Good"
                checked={feedback.clarity === 'Good'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Good</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="clarity"
                value="Excellent"
                checked={feedback.clarity === 'Excellent'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Excellent</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How comfortable did you feel discussing your concerns with the doctor during the appointment?</label>
          <div className="mt-1 grid grid-cols-5 gap-16 bg-violet-100 w-auto h-auto pl-2 pr-24 py-2 rounded-xl">
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="comfort"
                value="Poor"
                checked={feedback.comfort === 'Poor'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Poor</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="comfort"
                value="Bad"
                checked={feedback.comfort === 'Bad'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Bad</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="comfort"
                value="Average"
                checked={feedback.comfort === 'Average'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Average</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="comfort"
                value="Good"
                checked={feedback.comfort === 'Good'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Good</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="comfort"
                value="Excellent"
                checked={feedback.comfort === 'Excellent'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Excellent</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[14px] mb-1.5 font-sans font-semibold text-violet-900">How effective was the doctor's communication in addressing your questions and concerns?</label>
          <div className="mt-1 grid grid-cols-5 gap-16 bg-violet-100 w-auto h-auto pl-2 pr-24 py-2 rounded-xl">
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="communication"
                value="Poor"
                checked={feedback.communication === 'Poor'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Poor</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="communication"
                value="Bad"
                checked={feedback.communication === 'Bad'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Bad</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="communication"
                value="Average"
                checked={feedback.communication === 'Average'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Average</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="communication"
                value="Good"
                checked={feedback.communication === 'Good'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-4 font-sans font-medium text-[12px]">Good</span>
            </label>
            <label className="inline-flex items-center mx-3">
              <input
                type="radio"
                name="communication"
                value="Excellent"
                checked={feedback.communication === 'Excellent'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-violet-600 focus:ring-violet-500"
              />
              <span className="ml-3 font-sans font-medium text-[12px]">Excellent</span>
            </label>
          </div>
        </div>
        <div className="mb-4 flex flex-row">
        <label className='text-[15px] mr-2 font-sans font-semibold text-violet-900'>Overall Rating: </label>
        <Stack spacing={1}>
        <Rating name="half-rating" defaultValue={0} precision={1} onChange={handleRatingChange} />
        </Stack>
        </div>

        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={feedback.comments}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            rows={3}
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

