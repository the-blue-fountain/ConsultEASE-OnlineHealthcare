import { EyeIcon } from 'lucide-react';
import  { useState } from 'react';

const PopupImage = ({ imageUrl, onClose }:{imageUrl:string,onClose:()=>void}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 max-w-md rounded-lg">
        <img src={imageUrl} alt="Popup" className="max-w-full h-auto" />
        <button onClick={onClose} className="absolute top-0 right-0 m-2 px-2 py-1 bg-red-500 hover:scale-105 text-white rounded-lg">X</button>
      </div>
    </div>
  );
};

export const ImagePopupButton = ({ imageUrl, msg }:{imageUrl:string,msg:string}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative">
      <button onClick={togglePopup} className="px-4 py-0.5 h-[32px] hover:scale-105 text-violet-900 hover:bg-violet-600 bg-violet-400 rounded-[10px]">
        {msg}
      </button>
      {showPopup && <PopupImage imageUrl={imageUrl} onClose={togglePopup} />}
    </div>
  );
};

export const ImagePopupButton2 = ({ imageUrl }:{imageUrl:string}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative">
      <button onClick={togglePopup} className="p-2 h-[32px] hover:scale-105 text-white hover:bg-violet-800 bg-violet-900 rounded-full">
        <EyeIcon className="h-[16px] w-[16px]"/>
      </button>
      {showPopup && <PopupImage imageUrl={imageUrl} onClose={togglePopup} />}
    </div>
  );
};


