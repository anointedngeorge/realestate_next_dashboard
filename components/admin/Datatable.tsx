import React, { useEffect } from 'react'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';



interface tableInterface {
    head?: any[],
    tbody?:any[][],
    mapper?:[],
    caption?:string,

}



const Datatable:React.FC<tableInterface> = (prop) => {

    useEffect( () => {
        $(document).ready(function() {
            $('#example').DataTable();
        });
    }, [] )

  return (
    <div className='overflow-x-auto font-bold text-black'>
        <table className="table-auto table table-zebra p-3">
            <thead>
                <tr>
                    {prop.head?.map((item, index) => (
                        <th key={`item_${index}`}>{`${item}`.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {prop?.tbody?.map((item, index) => (
                    <tr key={`itemtr_${index}`}>
                        {item.map((e, i) => (
                            <td key={`e_${i}`}>{i}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
    </table>
    </div>
  )
}

export default Datatable
