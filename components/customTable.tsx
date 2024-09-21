"use client"
import React from 'react'
import { customTableInterface } from '@/app/interface'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";


interface theadInterface {
    head?:any[] | undefined,
    body?:any[],
    mapper? :any[],
    actions?:{name:string, link:string}[],
    placeholder_values?:any,
}


const Thead:React.FC<theadInterface> = (prop) => {
    return (
        <thead className='bg-secondary-content'>
            <tr>
                <th>#</th>
                {prop?.head?.map((data:any, i:number) => (
                    <th key={`t${data}${i}`}>
                        {`${data}`}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

const Td= (prop:{data:any, mapper?:any[]}) => {
    return (
        <>
            {prop.mapper?.map((item, i) => (
                <td key={`nn${i}`}>
                    {`${eval(`prop.data.${item}`)}`}
                </td>
            ))}
        </>
    )
}

const Tbody:React.FC<theadInterface> = (prop) => {
    
    const url = (url:string, data:any) => {
        let formattedurl:string = "";
        Object.keys(prop.placeholder_values).map((item) => {
            formattedurl = url.replaceAll(item, eval(`${prop.placeholder_values[item]}`))
        })
        return  formattedurl;
    }

    return (
        <tbody>
            <>
                {prop?.body?.map((data, i:number) => (
                    <tr key={`trk${i}`}>
                        <td>{i + 1}</td>
                        <Td key={`tf${i}`} data={data} mapper={prop.mapper} />
                        <td  key={`trkd${i}`}>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="m-1">
                                    <CiMenuKebab />
                                </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        {prop?.actions?.map((dx, indx:number) => (
                                            <li  key={`span_id_${indx}`}><a href={`${url(dx.link, data)}`}>{dx.name}</a></li>
                                        ))}
                                    </ul>
                             </div>
                        </td>
                    </tr>
                ))}
            </>
        </tbody>
    )
}


const CustomTable:React.FC<customTableInterface> = (props) => {
  return (
   <div className="overflow-x-auto">
        {props.title? (
            <h3>{props.title || '...'}</h3>
        ) : ''}
         <table className="table table-zebra" >
            <Thead head={props?.thead} />
            <Tbody 
                body={props?.tbody} 
                mapper={props?.mapper} 
                placeholder_values={props.placeholder_values} 
                actions={props?.actions}
            />
        </table>
   </div>
  )
}

export default CustomTable
