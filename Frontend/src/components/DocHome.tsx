import { useNavigate } from "react-router-dom";

export const Doc_Home = ({name}:{name:string}) => {
  const navigate=useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-full bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)), url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`}}>
    <div className="relative w-[1100px] h-[650px]">
      <div className = "relative w-[1102px] h-[650px] top-0 left-0">
        <div className="relative w-[1100px] h-[650px]">
          <div className="absolute w-[1100px] h-[650px] top-0 left-0">
            <div className="relative h-[650px] bg-[#7a5cfc6c] rounded-[15px] overflow-hidden">
              <div className="absolute top-[30px] left-[34px] [font-family:'Inter-Bold',Helvetica] font-bold text-violet-900 text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
                Welcome {name},
              </div>
              <img
                className="w-[460px] h-[287px] top-[207px] left-[25px] absolute object-cover"
                alt="Image"
                src="/queue.png"
              />
              <button className="absolute w-[400px] h-[35px] top-[330px] left-[550px] text-white bg-gradient-to-br from-violet-800 to-purple-600 hover:bg-gradient-to-bl font-sans font-bold rounded-full text-[18px] px-5 py-1 text-center mb-2 transition duration-300 ease-in-out transform hover:scale-105" onClick={()=>navigate('/doc/pending/online')}> View Online Appointment Requests </button>
              <button className="absolute w-[400px] h-[35px] top-[380px] left-[550px] text-white bg-gradient-to-br from-violet-800 to-purple-600 hover:bg-gradient-to-bl font-sans font-bold rounded-full text-[18px] px-5 py-1 text-center mb-2 transition duration-300 ease-in-out transform hover:scale-105" onClick={()=>navigate('/doc/pending/offline')}> View Offline Appointment Requests </button>
              <div className="absolute w-[1076px] h-[132px] top-[504px] left-[14px] rounded-[10px] overflow-hidden hover:scale-105 bg-violet-200">
                <div className="relative w-[830px] h-[87px] top-[21px] left-[176px] flex flex-col items-start gap-[5px]">
                  <p className="text-[#b92d2c] text-[15px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
                    <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-[#b92d2c] text-[15px] tracking-[0]">
                      Your expertise combined with the convenience of ConsultEASE&nbsp;&nbsp;is transforming healthcare
                      delivery, one virtual
                      <br />
                    </span>
                  </p>
                  <p className="text-[#b92d2c] text-[15px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
                    <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-[#b92d2c] text-[15px] tracking-[0]">
                      consultation at a time.Your commitment to excellence not only ensures superior care but also
                      propels our mission
                      <br />
                    </span>
                  </p>
                  <p className="text-[#b92d2c] text-[15px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
                    <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-[#b92d2c] text-[15px] tracking-[0]">
                      to democratize healthcare, making it accessible and convenient for all. Thank you for being an
                      integral part of this
                      <br />
                    </span>
                  </p>
                  <p className="text-[#b92d2c] text-[15px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
                    <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-[#b92d2c] text-[15px] tracking-[0]">
                      transformative journey.
                    </span>
                  </p>
                </div>
              </div>
              <div className="absolute w-[507px] h-[51px] top-[240px] left-[523px] flex flex-col items-start gap-[5px]">
                <p className="text-violet-900 text-[25px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
                  <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-violet-900 text-[25px] tracking-[0]">
                    Head to waiting queue of appointments!
                    <br />
                  </span>
                </p>
                <p className="text-violet-900 text-[25px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
                  <span className="text-[15px]">Accept or reject requested appointments based on your convenience</span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute w-[878px] h-[76px] top-[111px] left-[36px] flex flex-col items-start gap-[5px]">
            <p className="text-violet-900 text-[18px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
              <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-violet-900 text-[18px] tracking-[0]">
                You&#39;re now logged into the heart of ConsultEASE,&nbsp;&nbsp;your trusted Online Medical Consultation
                System!
                <br />
              </span>
            </p>
            <p className="text-violet-900 text-[18px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
              <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-violet-900 text-[18px] tracking-[0]">
                From here, you have the power to connect with patients, provide expert medical advice,
                <br />
              </span>
            </p>
            <p className="text-violet-900 text-[18px] relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] leading-[normal]">
              <span className="[font-family:'Inter-Bold',Helvetica] font-bold text-violet-900 text-[18px] tracking-[0]">
                and make a real difference in people&#39;s lives, all from the convenience of your screen.
              </span>
            </p>
          </div>
          <img
            className="w-[167px] h-[125px] top-[508px] left-[10px] absolute object-cover"
            alt="Image"
            src="/heart.png"
          />
        </div>
      </div>
    </div>
      </div>
  );
};
