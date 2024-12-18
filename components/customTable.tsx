"use client"
import React from 'react'
import { customTableInterface } from '@/app/interface'
import { CiMenuKebab } from "react-icons/ci";
import Link from 'next/link';
import { object } from 'zod';
// import { nullable } from 'zod';


interface theadInterface {
    head?:string[] | Record<string, string>[],
    body?:string[] | Record<string, string>[],
    mapper?:string[] | Record<string, string>[] | [],
    actions?:{name:string, link:string, onclick?:(event:React.MouseEvent<HTMLAnchorElement>) => void, id?: string}[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    placeholder_values?: any 
    onclick?: () => string
}


const Thead:React.FC<theadInterface> = (prop) => {
    return (
        <thead className='bg-secondary-content'>
            <tr>
                <th>#</th>
                <th>...</th>
                {prop?.head?.map((data, i:number) => (
                    <th key={`t${data}${i}`}>
                        {`${data}`.toUpperCase()}
                    </th>
                ))}
                
            </tr>
        </thead>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Td= (prop:{data:any, mapper?:any[]}) => {
    return (
        <>
            {prop.mapper? prop.mapper?.map((item:string, i) => (
                <td key={`nn${i}`}>
                    {`${eval(`prop.data.${item}`)}`}
                </td>
            )) : ''}
        </>
    )
}

const Tbody:React.FC<theadInterface> = (prop) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const placeholder_values = prop.placeholder_values;

    const eval_data =  (path:string, data:object) => {
        try {
            
            if(typeof data == 'object'){
                return  eval(path)
            }
        } catch (error) {
            console.log("catch")
            return '1'
        }
    }

    const url =  (urllink?: string, data?:object | string) => {

                if(typeof data == "object") {
                    let formattedurl:string = "";
                            Object.keys(placeholder_values)?.map( (item:string) => {
                            const e =  eval_data(placeholder_values[item], data)
                            formattedurl += urllink?.replaceAll(item, e )
                        }
                    )
                    return formattedurl
                } 
            }

    return (
        <tbody>
            {prop?.body?.map((data, i:number) => (
                <tr key={`trk${i}`}>
                    <td>{i + 1}</td>
                    <td  key={`trkd${i}`}>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="m-1">
                                <CiMenuKebab />
                            </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    {prop?.actions?.map((dx, indx:number) => (
                                        <li key={`span_id_${indx}`} >
                                            <Link 
                                                onClick={dx.onclick}
                                                id={`${url(dx.id, data)}`}
                                                href={`${url(dx.link, data)}`}
                                            >
                                                {dx.name}
                                                {/* {JSON.stringify(url(dx.id, data))} */}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    </td>
                    {/*  */}
                    <Td key={`tf${i}`} data={data} mapper={prop?.mapper} />
                </tr>
            ))}
        </tbody>
    )
}


const CustomTable:React.FC<customTableInterface> = (props) => {
  return (
        <div className='flex flex-col space-y-10 '>
            <div className='flex flex-row place-content-end'>
                    <div>
                        <input
                            hidden={props.is_searchable}
                            type="text" className='p-2 input-sm rounded-lg border-2 text-black placeholder:text-black' 
                            placeholder='Search...' 
                        />
                    </div>
            </div>

            <div className="overflow-x-auto min-h-44">
                {props.title? (
                    <h3>{props.title || '...'}</h3>
                ) : ''}
                <table className="table table-zebra " >
                    <Thead head={props?.thead} />
                    <Tbody 
                        body={props?.tbody} 
                        mapper={props?.mapper} 
                        placeholder_values={props.placeholder_values} 
                        actions={props?.actions}
                    />
                </table>
            </div>
            
            {/*  */}
            {false? (
                <div className='flex flex-row place-content-end'>
                <div className="join">
                    <button className="join-item btn">1</button>
                    <button className="join-item btn btn-active">2</button>
                    <button className="join-item btn">3</button>
                    <button className="join-item btn">4</button>
                </div>
            </div>
            ) : ''}
            {/*  */}
        </div>
  )
}

export default CustomTable
