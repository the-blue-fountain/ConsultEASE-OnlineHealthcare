import { useNavigate } from "react-router-dom";

export const DocTypes=()=>{
  const navigate=useNavigate();
  return (
    <div className={`relative w-[536px] h-[780px] mx-5 my-4 rounded-[15px] bg-violet-50`}>
      <div className="absolute w-[498px] h-[596px] top-[120px] left-[19px]">
        <div className="absolute w-[497px] h-[137px] my-5 top-0 left-px">
          <div className="top-0 left-[129px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/PL")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Pulmonologist"
                  src="/DocTypes/Pulmonologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Pulmonologist
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-0 flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/NL")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Neurologist"
                  src="/DocTypes/Neurologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                Neurologist
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-[258px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/CL")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Cardiologist"
                  src="/DocTypes/Cardiologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Cardiologist
                </div>
              </button>
            </div>
          </div>
          <div className="top-[2px] left-[387px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/DL")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Dermatologist"
                  src="/DocTypes/Dermatologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Dermatologist
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute w-[497px] h-[137px] my-5 top-[153px] left-px">
          <div className="top-0 left-[129px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/OL")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Oncologist"
                  src="/DocTypes/Oncologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Oncologist
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-0 flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/SG")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Surgeon"
                  src="/DocTypes/Surgeon.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Surgeon
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-[258px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/GP")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Physician"
                  src="/DocTypes/Physician.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[11px] tracking-[0] leading-[18px] whitespace-nowrap">
                  General Physician
                </div>
              </button>
            </div>
          </div>
          <div className="top-[2px] left-[387px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/ENT")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="ENT_Specialist"
                  src="/DocTypes/ENT_Specialist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  ENT Specialist
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute w-[497px] h-[137px] my-5 top-[306px] left-0">
          <div className="top-0 left-[129px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/NPL")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Nephrologist"
                  src="/DocTypes/Nephrologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Nephrologist
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-0 flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/GY")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Gynecologist"
                  src="/DocTypes/Gynecologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                Gynecologist
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-[258px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/DE")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Dentist"
                  src="/DocTypes/Dentist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Dentist
                </div>
              </button>
            </div>
          </div>
          <div className="top-[2px] left-[387px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/OP")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Ophthalmologist"
                  src="/DocTypes/Ophthalmologist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Ophthalmologist
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute w-[497px] h-[137px] my-5 top-[459px] left-0">
          <div className="top-0 left-[129px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/PSY")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Psychiatrist"
                  src="/DocTypes/Psychiatrist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Psychiatrist
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-0 flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/OR")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Orthopedist"
                  src="/DocTypes/Orthopedist.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Orthopedist
                </div>
              </button>
            </div>
          </div>
          <div className="top-0 left-[258px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/GEL")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Gastroenterology"
                  src="/DocTypes/Gastro.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                Gastroenterology
                </div>
              </button>
            </div>
          </div>
          <div className="top-[2px] left-[387px] flex w-[110px] h-[135px] items-center justify-center gap-[8px] p-[10px] absolute bg-violet-100 rounded-[8px] shadow-button-shadow">
            <div className="relative w-[92.5px] h-[110.5px] ml-[-0.25px] mr-[-2.25px]">
              <button className="relative w-[90px] h-[111px] hover:scale-105" onClick={()=>navigate("/pat/dashboard/DC")}>
                <img
                  className="absolute w-[82px] h-[90px] top-0 left-[4px] object-cover"
                  alt="Diabetes Consult"
                  src="/DocTypes/Diabeties.png"
                />
                <div className="absolute w-[90px] h-[21px] top-[90px] left-0 font-sans my-1 font-bold text-violet-950 text-[11.5px] tracking-[0] leading-[18px] whitespace-nowrap">
                  Diabetes Consult
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-[535px] h-[39px] top-[25px] left-0 font-sans font-bold text-violet-900 text-[30px] text-center tracking-[0] leading-[45px] whitespace-nowrap">
        Choose Doctor Speciality
      </div>
    </div>
  );
};
