import Link from "next/link";


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