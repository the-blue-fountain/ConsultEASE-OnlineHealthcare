import  { useState, useEffect } from 'react';

const Alert = ({ type, message, duration = 5000 }:{type:string,message:string,duration?:number}) => {
  const [closed, setClosed] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClosed(true);
    }, duration);

    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 10);
    }, 10);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration]);

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) {
    return null; // If closed, don't render anything
  }

  let alertClasses = '';
  let closeButtonClasses = '';

  switch (type) {
    case 'info':
      alertClasses = 'bg-blue-50 text-blue-800';
      closeButtonClasses = 'bg-blue-50 text-blue-500 hover:bg-blue-200';
      break;
    case 'error':
      alertClasses = 'bg-red-50 text-red-800';
      closeButtonClasses = 'bg-red-50 text-red-500 hover:bg-red-200';
      break;
    case 'success':
      alertClasses = 'bg-green-50 text-green-800';
      closeButtonClasses = 'bg-green-50 text-green-500 hover:bg-green-200';
      break;
    case 'warning':
      alertClasses = 'bg-yellow-50 text-yellow-800';
      closeButtonClasses = 'bg-yellow-50 text-yellow-500 hover:bg-yellow-200';
      break;
    default:
      alertClasses = 'bg-gray-50 text-gray-800';
      closeButtonClasses = 'bg-gray-50 text-gray-500 hover:bg-gray-200';
  }

  const timePercentage = (remainingTime / duration) * 100;

  return (
    <div className="relative">
    <div className={`fixed top-0 left-0 right-0 px-4 py-2 mx-auto max-w-sm ${alertClasses} rounded-lg shadow-md z-50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="sr-only">Info</span>
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          type="button"
          className={`-mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-opacity-50 p-1.5 hover:bg-opacity-50 inline-flex items-center justify-center h-8 w-8 ${closeButtonClasses}`}
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <div className="mt-2 h-1 bg-gray-200 rounded-full">
        <div
           className={`h-1 rounded-full ${type === 'info' ? 'bg-blue-400' : type === 'error' ? 'bg-red-400' : type === 'success' ? 'bg-green-400' : type === 'warning' ? 'bg-yellow-400' : 'bg-gray-400'}`}
          style={{ width: `${timePercentage}%` }}
        />
      </div>
    </div>
    </div>
  );
};

export default Alert;
