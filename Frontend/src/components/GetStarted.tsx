import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
  const navigate=useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-cover bg-center" style={{backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`}}>
        <div className="relative w-[1275px] h-[650px]">
          <div className="absolute w-[1210px] h-[650px] top-0 left-[35px] bg-[#c1b1ff9a] rounded-[40px] overflow-hidden">
            <div className="absolute w-[619px] h-[626px] top-[24px] left-[591px]">
              <img
                className="w-[619px] h-[523px] top-[103px] left-0 absolute object-cover"
                alt="Image"
                src="/doctor.png"
              />
              <img
                className="w-[157px] h-[154px] top-0 left-[431px] absolute object-cover"
                alt="Image"
                src="/Logo.png"
              />
            </div>
                <button className="absolute w-[339px] h-[55px] top-[498px] left-[103px] text-white bg-gradient-to-br from-violet-800 to-purple-600 hover:bg-gradient-to-bl font-sans font-bold rounded-full text-[24px] px-5 py-2.5 text-center me-2 mb-2 transition duration-300 ease-in-out transform hover:scale-105" onClick={()=>navigate('/auth')}> Get Started </button>
          </div>
          <div className="absolute w-[1030px] top-[23px] left-[41px] font-sans font-bold text-[#3428a3] text-[75px] text-center tracking-[0] leading-[normal]">
            Welcome to ConsultEASE!
          </div>
          <p className="absolute w-[972px] top-[123px] left-[-40px] font-sans font-bold text-[#3428a3] text-[35px] text-center whitespace-nowrap">
            Your Gateway to Convenient Healthcare!
          </p>
          <div className="flex flex-col items-start gap-[2px] absolute w-[735px] h-[195px] top-[190px] left-[120px]">
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-bold">
                Experience the future of healthcare with ConsultEASE,
                <br />
              </span>
            </p>
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-bold">
                your comprehensive Online Medical Consultation System!
                <br />
              </span>
            </p>
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-sans font-bold text-[18px]">
                <br />
              </span>
            </p>
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-sans font-bold text-[18px]">
                {" "}
                <br />
              </span>
            </p>
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-sans font-bold text-[18px]">
                {" "}
                Say Goodbye to long waiting queues and
                <br />
              </span>
            </p>
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-sans font-bold text-[18px]">
                {" "}
                inconvenient clinic visits. ConsultEASE
                <br />
              </span>
            </p>
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-sans font-bold text-[18px]">
                {" "}
                brings the expertise of qualified healthcare
                <br />
              </span>
            </p>
            <p className="relative self-stretch font-sans font-normal text-[#27459b] text-[20px] tracking-[0] leading-[normal]">
              <span className="font-sans font-bold text-[18px]">
                {" "}
                professionals to your fingertips.
              </span>
            </p>
          </div>
        </div>
      </div>
  );
};
