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


export const addnewsales = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);
 
  const postRequest:postInterface =  {
    url:`${externalurls.salesadd}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    globalThis.location.reload();
  } else {
    alert(`${req?.statusText}`);
  }
  
}





export const addnewrealtors = async (state: FormState, formData: FormData) => {
  const postRequest:postInterface =  {
    url:`${externalurls.realtoradd}`,
    headers:{
      "Authorization": `Bearer ${Token}`
    },
    body:formData
  }

  const req = await postdataWithImage(postRequest);

  if (req?.ok) {
    alert("Created");
  } else {
    alert(`${req?.statusText}`);
  }
  
}


export const addnewclient = async (state: FormState, formData: FormData) => {
  const postRequest:postInterface =  {
    url:`${externalurls.clientadd}`,
    headers:{
      "Authorization": `Bearer ${Token}`
    },
    body:formData
  }

  const req = await postdataWithImage(postRequest);

  if (req?.ok) {
    alert('Created!');
  } else {
    alert(`${req?.statusText}`);
  }
  
}


export const addnewproperty = async (state: FormState, formData: FormData) => {
  const data:any = formprops(formData);
  console.log(data)
  const postRequest:postInterface =  {
    url:`${externalurls.propertyadd}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    alert(`Created!`);
    // globalThis.location.reload();
  } else {
    alert(`${req?.statusText}`);
  }
  
}
