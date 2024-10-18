import { createContext } from 'react';
import { toast } from 'react-toastify';
 

export const cartStorageName = "cartdata";
export const checkoutStorageName = "checkoutcartdata";
export const ThemeContext =  createContext<any>(null)

// export const Token2 = globalThis?.sessionStorage?.getItem("apptoken")
// console.log(Token2);

export interface toastify {
    message:string
}



export const APIBASEURl = `${process.env.NEXT_PUBLIC_APIBASEURl}/api/v1`;


export const externalurls = {
    'token':`${APIBASEURl}/auth/token`,
    'profile':`${APIBASEURl}/auth`,

    'propertylist':`${APIBASEURl}/properties/property/list/`,
    'propertyadd':`${APIBASEURl}/properties/property/add/`,

    'realtorlist':`${APIBASEURl}/account/realtors/list/`,
    'realtoradd':`${APIBASEURl}/account/realtors/add/`,
    'userlist':`${APIBASEURl}/account/user/list/`,

    'clientlist':`${APIBASEURl}/account/clients/list/`,
    'clientadd':`${APIBASEURl}/account/clients/add/`,
    
    'saleslist':`${APIBASEURl}/sale/sales/list/`,
    'salesadd':`${APIBASEURl}/sale/sales/add/`,
    
    // commissions

    'commission':`${APIBASEURl}/sale/commissions`,
    // summary
    'summary':`${APIBASEURl}/summary/summary/`,

}


export interface postInterface {
    url:string,
    headers:{ [key:string]:any},
    body:{ [key:string]:any} ,
}

export interface postInterfaceWithImage {
    url:string,
    headers:{ [key:string]:any},
    body:any ,
}

export interface customssrgetInterface {
    url:string,
    headers:{ [key:string]:any},
    mutatetime?:number,
}


export interface cookieInterface {
    name:string,
    value:string,
    path?:string,
    maxtime?:number
    
}


export interface customTableInterface {
    thead?:any[] | undefined,
    tbody?:any[],
    mapper?:any[],
    data?:[{[key:string]: any}]
    show_thead?:boolean,
    title?:string,
    actions?:{name:string, link:string, onclick?:(event:any) => void, id?:string}[],
    placeholder_values?:{[keys:string]:any},
    is_searchable?:boolean,
}

