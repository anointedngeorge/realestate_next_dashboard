import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import {  postdata, postdataWithImage, setupsessiondb } from '../function';
import {APIBASEURl, externalurls, postInterface, postInterfaceWithImage} from "../interface"



const Token = globalThis?.sessionStorage?.getItem("apptoken")



const formprops = (formData: FormData): Record<string, FormDataEntryValue> => {
  const container: Record<string, FormDataEntryValue> = {};
  const data  = Array.from(formData.entries());
  
  for (const [key, value] of data) {
    container[key] = value;
  }

  return container;
};


// const formprops2 = (formdata: FormData) => {
//   let container:{name:string, value:string}[] = [];
//   const data:any = formdata.entries();
//   for (const [key, value] of data) {
//       const dataprepare =  {name:key, value:value}
//       container.push(dataprepare)
//   }
//   return container;
// };


export const signup = async (state: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
        errors: validatedFields?.error?.flatten()?.fieldErrors ,
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
      "username": username,
      "password": password,
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
  const data:Record<string, FormDataEntryValue>  = formprops(formData);
 
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
  const postRequest:postInterfaceWithImage =  {
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
  const postRequest:postInterfaceWithImage =  {
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
  const data:Record<string, FormDataEntryValue>  = formprops(formData);

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



export const addPropertyImages = async (state: FormState, formData: FormData) => {
  
  const postRequest:postInterfaceWithImage =  {
    url:`${APIBASEURl}/properties/property/media/`,
    
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





export const addSettings = async (state: FormState, formData: FormData) => {
  const data:Record<string, FormDataEntryValue >  = formprops(formData);
  
  const postRequest:postInterface =  {
    url:`${APIBASEURl}/control/settings/add/`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${Token}`
    },
    body:data
  }

  const req = await postdata(postRequest);

  if (req?.ok) {
    const mes = await req?.json()
    alert(mes.message);
  } else {
    const mes = await req?.json()
    alert(mes.message);
  }

}