// "use client"

import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { RiLockPasswordFill } from "react-icons/ri";
import  {signup}  from "@/app/actions/auth";
import { useCustomActionState } from "@/app/custom_hooks";
import Image from "next/image";


interface dataprops {
    name:string,
    label?:string,
    placeholder?:string,
    type:string,
    required?:boolean,
    Icon?:IconType
}

interface LogincInterface {
    title?:string,
    sub_title?:string,
}


const FormInput:React.FC<dataprops>  = (props) => {
  const Icon = props.Icon
  return (
      <div className="w-auto p-3 rounded-badge bg-white">
        
          <div className="flex flex-grow w-80 place-content-between items-center px-3">
              <div className="w-72">
                  <label 
                      htmlFor={`#id_${props.name}`}
                      className="text-black font-semibold"
                   >{`${props.label}`}</label>
                  <input 
                        type={`${props.type}`}
                        name={`${props.name}`}
                        id={`id_${props.name}`}
                        placeholder={`${props.placeholder}`} 
                        className="w-full h-full focus:outline-none border-none focus:border-none text-sm text-black font-bold font-inter"
                        required={props.required}
                   />
            </div>
            <div>
                {Icon? <Icon size={25} /> : ''}
            </div>
          </div>
      </div>
  )
}



const Login1:React.FC<LogincInterface> = (prop) => {
    const {state, action, status, EnumMessage} = useCustomActionState({fn:signup})

  return (
    <main className="p-32 flex place-content-center">
        <div className="w-1/2 max-sm:w-auto drop-shadow-lg lg:bg-gray-100 rounded-lg p-8">
            <div className="flex flex-col place-content-center items-center space-y-10">
                <div className="text-center ">
                    <div className="flex place-content-center">
                    <div className="w-28 h-28 rounded-full border-2 relative">
                        <Image src={'/logo/logo.png'} fill={true} alt="..." />
                    </div>
                    </div>
                    {/* <h3 className="text-lg font-inter font-bold text-red-600">{prop?.title}</h3> */}
                    <p><strong><b>{prop?.sub_title}</b></strong></p>
                </div>
                <div >
                    <form action={action} >
                        <div className="flex flex-col space-y-5">
                            <div>
                                <FormInput 
                                    name={"username"} 
                                    type={"text"} 
                                    placeholder="Email Address"
                                    label="Email Address"
                                    required={true}
                                    Icon={MdEmail}
                                />
                                {state?.errors?.username && <p>{state.errors.username}</p>}
                            </div>
                            <div>
                                <FormInput 
                                    name={"password"} 
                                    type={"password"} 
                                    placeholder="**********"
                                    label="Password"
                                    required={true}
                                    Icon={RiLockPasswordFill}
                                />
                                {state?.errors?.password}
                                {state?.errors?.password && (
                                    <div>
                                    <p>Password must:</p>
                                    
                                    <ul>
                                        {state.errors.password.map((error:string) => (
                                        <li key={error}>- {error}</li>
                                        ))}
                                    </ul>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                            <button 
                                className="btn border-none bg-red-600 text-white px-14 text-lg font-inter" 
                                type="submit"
                                // disabled={status === EnumMessage.LOADING}
                            >
                                {status === EnumMessage.LOADING && "Loading..."}
                                {status === EnumMessage.SUCCESS && "Success!"}
                                {status === EnumMessage.ERROR && "Error"}
                                {!status && "Sign In"}
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
  );
}

export default Login1;


