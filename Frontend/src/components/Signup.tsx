import { useNavigate } from 'react-router-dom';
import  {useState} from 'react'
import * as Components from './Slider';
import { Signuptype } from '../InputTypes/auth';
import { BACKEND_URL } from '../config';
import axios from 'axios'
import { Eye,EyeOff } from 'lucide-react';

export const Authentication=()=>{
  const navigate=useNavigate();
  //const [alert, setalert] = useState(null); // Alert is an object
  const [signIn, toggle] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [postInputs,setPostInputs]=useState<Signuptype>({
    email:"",
    password:"",
    name:"",
    type:""
  
  });
  //const [mytype,setMytype] = useState("Doctor");
  const [passwordcheck,setPasswordcheck] = useState("");
  const handleTypeChange = (newType:string) => {
    setPostInputs(c=>({
      ...c,
      type:newType
    }))
  };
  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Your form submission logic here
  };
  async function handleSignup(){
    if(postInputs.password!=passwordcheck){
      alert("Password did not match");
    }
    else if(postInputs.type==""){
      alert("Account type not selected");
    }
    else{
      //console.log(postInputs);
      try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/auth/signup`,postInputs);
        const json=response.data;
        if(json.message){
          alert(json.message);
        }else{
          await axios.post(`${BACKEND_URL}/intromail`,{
            email:postInputs.email,
            name:postInputs.name,
          });
          localStorage.setItem("token",json.jwt);
          if(postInputs.type=="Doctor"){
            navigate("/doc/info");
          }
          else{
            navigate("/pat/info");
          }
        }
      }catch(e){
        alert("Error while signing");
      }
    }
  }

  async function handleSignin(){
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/auth/signin`,postInputs);
      const json=response.data;
      if(json.message){
        alert(json.message);
      }else{
        localStorage.setItem("token",json.jwt);
        let t="";
        if(json.type=="Doctor"){
          t="doc";
        }
        else{
          t="pat";
        }
        navigate(`/${t}/dashboard`);
      }
    }catch(e){
      alert("Error while signing");
    }

  }
  // const showalert = (title, message, type) => 
  // {
  //   setalert(
  //     {
  //       msg : message,
  //       type : type,
  //       title : title
  //     }
  //   )
  // }

  return (
    <>
    {/* <Alert alt = {alert} /> */}
    <div className="flex justify-center items-center h-screen w-screen bg-cover bg-center" style={{backgroundImage: `url('https://img.freepik.com/premium-photo/blue-sky-blur-gradient-background_585272-66.jpg')`}}>
      <div className ='flex flex-col items-center	'>
      <Components.Container>
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form onSubmit={handleSubmit}>
                      <Components.Title>Create Account</Components.Title>
                      <Components.Input type='text' placeholder='Name' onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            name:e.target.value
                        }))
                      }} />
                      <Components.Input type='email' placeholder='Email' onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            email:e.target.value
                        }))
                      }}/>
                      <Components.Input type='password'  placeholder='Password' onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            password:e.target.value
                        }))
                      }} />
                      <Components.Input type='password' placeholder='Confirm Password' onChange={(e)=>{
                        setPasswordcheck(e.target.value)
                      }}/>
                      <Components.Anchor>
                        <div className='font-sans font-semibold text-[11.5px] text-slate-500 p-0 m-o'>Note: Password length should be min 8 characters</div>
                      </Components.Anchor>
                      <Components.selector type={postInputs} onTypeChange={handleTypeChange}  />
                      <Components.Button onClick={handleSignup}>Sign Up</Components.Button>
                      
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form onSubmit={handleSubmit}> 
                       <Components.Title>Sign in</Components.Title>
                       <Components.Input type='email' placeholder='Email' onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            email:e.target.value
                        }))
                      }}/>
                       <Components.Input type={showPassword ? 'text' : 'password'}  placeholder='Password' onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            password:e.target.value
                        }))
                      }}/>
                      <button 
                        type="button" 
                        onClick={handleTogglePassword} 
                        style={{ position: 'absolute', left: '305px', top: '53%', transform: 'translateY(-50%)' }}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                       {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
                       <Components.Button onClick={handleSignin}>Sign In</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>New Here?</Components.Title>
                        <Components.Paragraph>
                             <strong>Register today to gain access to our uninterrupted medical bookings and doctor appointments on one go. Sign up with your personal details for free to get started!</strong>
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>

          </Components.Container>
    </div> 
    </div>
  </>
  );
}

