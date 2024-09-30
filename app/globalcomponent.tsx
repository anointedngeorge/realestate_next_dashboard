import Link from "next/link";
import { toCapitalize } from "./utils/utils";




export const LinkBtn = (prop:{
        title?:string,
        link?:string,
        classname?:string,
        onclick?:(event:any) => any,
    }) => {
    return (
        <Link className={prop.classname? prop.classname : 'btn btn-sm btn-info'} onClick={prop.onclick} href={`${prop.link}`}>{prop.title}</Link>
    )
}

const Button = (prop:{
        title?:string,
        item?:string,
        classname?:string,
        onclick?:(event:any) => any
    }) => {
    return (
        <button className={prop.classname? prop.classname : 'btn btn-sm btn-info'} onClick={prop.onclick} data-item={`${prop.item}`} >{prop.title}</button>
    )
}


export const PageModal = (prop:{src?:string}) => {
    return (
        <dialog id="my_modal_4" className="modal ">
            <div className="modal-box w-11/12 max-w-5xl">

                <iframe src={prop?.src} className="w-full h-screen" ></iframe>
           
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}


interface formInterface {
    containerClassName?:string,
    childrenClassName?:string,
    datamodel?:{
                type?:string,
                name?:string,
                classname?:string,
                placeholder?:string,
                labelname?:string,
                value?:  any,
                onclick?:(event:any) => any,
                onchange?:(event:any) => any,
                onkeyup?:(event:any) => any,
                selectdefault?:{value:any, title:any},
                selectdata?:{value:any, title:any}[],
                selectMapper?:string[]
            }[]
}

interface formModelInterface {
    action?:any,
    models?: formInterface[]
}


const Input = (data:{item:any, index:any, prop:any}) => { 

    return (
        <div  className={data.prop.childrenClassName} >
            <div>
                <label 
                    htmlFor={`id_${data.item.name}`}>
                    {`${toCapitalize(data.item.labelname)}`}
                </label>
            </div>
            <div>
                <input 
                    type={data.item.type}
                    onClick={data.item.onclick}
                    onChange={data.item.onclick}
                    onKeyUp={data.item.onkeyup}
                    placeholder={data.item.placeholder}
                    className={data.item.classname? data.item.classname : 'border-2 border-black p-3 w-full rounded-2xl'} 
                    name={data.item.name} 
                    id={`id_${data.item.name}`}
                    defaultValue={data.item.value}
                />
            </div>
        </div>
    )

}


const Textarea = (data:{item:any, index:any, prop:any}) => { 
    return (
        <div  className={data.prop.childrenClassName} >
            <div>
                <label 
                    htmlFor={`id_${data.item.name}`}>
                    {`${toCapitalize(data.item.labelname)}`}
                </label>
            </div>
            <div>
                <textarea
                    placeholder={data.item.placeholder}
                    className={data.item.classname? data.item.classname : 'border-2 border-black p-3 w-full rounded-2xl'}
                    name={data.item.name} 
                    id={`id_${data.item.name}`}
                >
                </textarea>
            </div>
        </div>
    )

}


const Select = (data:{item:any, index:any, prop:any}) => { 
    return (
        <div  className={data.prop.childrenClassName} >
            <div>
                <label 
                    htmlFor={`id_${data.item.name}`}>
                    {`${toCapitalize(data.item.labelname)}`}
                </label>
            </div>
            <div>
                <select
                    className={data.item.classname? data.item.classname : 'border-2 border-black p-3 w-full rounded-2xl'}
                    name={data.item.name} 
                    id={`id_${data.item.name}`}
                >   

                    {data?.item?.selectdefault ? (
                        <option defaultValue={data?.item?.selectdefault?.value} >{data?.item?.selectdefault?.title}</option>
                    ) : ""}

                    {data?.item?.selectdata?.map((item:any, indx:number) => (
                        <option  value={item.value} key={`option_${data.item.name}_${indx}`}>{item.title}</option>
                    ))}
                </select>
            </div>
        </div>
    )

}

const FormTag:React.FC<formInterface> = (prop) => {

    const formType = (item:any, index:any, prop:any) => {
        switch (item.type) {
            case 'textarea':
                return (
                    <div key={`children_${item.type}_${item.name}_${index}`}>
                        <Textarea item={item} index={index} prop={prop} />
                    </div>
                )
            case 'select':
                return (
                    <div key={`children_${item.type}_${item.name}_${index}`}>
                        <Select item={item} index={index} prop={prop} />
                    </div>
                )
        
            default:
                return (
                    <div key={`children_${item.type}_${item.name}_${index}`}>
                        <Input item={item} index={index} prop={prop} />
                    </div>
                    
                )
        }
    }

    return (
        <div className={`${prop.containerClassName? prop.containerClassName : 'grid grid-flow-col max-sm:grid-flow-row gap-3'}`}>
            {prop?.datamodel?.map((item, index) => (
                formType(item, index, prop)
            ))}
        </div>
    )
}


export const FormModel:React.FC<formModelInterface> = (prop) => {


    return (
        <div className="flex flex-col space-y-5">
                {prop?.models?.map((item, index) => (
                    <div key={`form_div_${index}`} >
                        <FormTag
                            datamodel={item.datamodel} 
                            containerClassName={item.containerClassName}
                            childrenClassName={item.childrenClassName}
                        />
                    </div>
                ))}
            </div>
    )
}