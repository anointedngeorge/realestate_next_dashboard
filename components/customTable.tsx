"use client"

import { customTableInterface } from '@/app/interface'
import React from 'react'


interface theadInterface {
    head?:any[] | undefined,
    body?:any[],
    mapper? :any[],
    actions?:any[]
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
    return (
        <tbody>
            <>
                {prop?.body?.map((data, i:number) => (
                    <tr key={`trk${i}`}>
                        <td>{i + 1}</td>
                        <Td key={`tf${i}`} data={data} mapper={prop.mapper} />
                        <td>
                            {prop?.actions?.map((dx, indx:number) => (
                                <span>{JSON.stringify(`${dx}`.split('$'))}</span>
                            ))}
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
            <Tbody body={props?.tbody} mapper={props?.mapper} actions={props?.actions} />
        </table>
   </div>
  )
}

export default CustomTable
