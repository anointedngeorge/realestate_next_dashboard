import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { useRouter } from 'next/router';
import { notify, postdata, postdataWithImage, setupsessiondb } from '../function';
import {cartStorageName, checkoutStorageName, externalurls, postInterface} from "../interface"
import { FaMdb } from 'react-icons/fa';


const Token = globalThis?.sessionStorage?.getItem("apptoken")

const formprops = (formdata: FormData) => {
  let container: { [key: string]: any } = {};
  const data:any = formdata.entries();
  for (const [key, value] of data) {
    container[key] = value;
  }
  return container;
};



export const signup = async (state: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const username = formData.get('username');
  const password = formData.get('password');


  const postRequest:postInterface =  {
    url:`${externalurls.token}`,
    headers:{
      "Content-Type":"application/json",
    },
    body: {
      username,
      password,
    }
  }
  const req = await postdata(postRequest);
  
  if (req?.ok) {
    const j = await req.json();
    const token = j['token'];
    setupsessiondb({name:'apptoken', value:token})
    globalThis.location.href = "/admin";
  } 
  
  else {
    globalThis.location.href = "/login";
  }
  
}


// export const brand = async (state: FormState, formData: FormData) => {
//   const data:any = formprops(formData);

//   const postRequest:postInterface =  {
//     url:`${externalurls.brand}`,
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization": `Bearer ${Token}`
//     },
//     body:data
//   }

//   const req = await postdata(postRequest);

//   if (req?.ok) {
//     notify({message:'Created!'});
//   } else {
//     notify({message:`${req?.statusText}`});
//   }
  
// }

