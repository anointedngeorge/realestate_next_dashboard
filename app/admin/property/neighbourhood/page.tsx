"use client"
import { addnewsales } from '@/app/actions/auth'
import { useCustomActionState } from '@/app/custom_hooks'
import { FormModel } from '@/app/globalcomponent'
import { LineTitle } from '@/components/admin/LineTitle'
import {useSearchParams} from 'next/navigation'
import React, {Suspense } from 'react'


// const Token = globalThis?.sessionStorage?.getItem("apptoken")


const AddInstallation = () => {
    // const [clientlist, setClientList] = useState<{title:any, value:any}[]>();
    // const [plotlist, setPlotList] = useState<{title:any, value:any}[]>();
    const query = useSearchParams()
    const ID = query.get("id")

    // const {ssrdata} = useCustomSSR({url:`${externalurls.clientlist}`, headers:{
    //     "Authorization":`Bearer ${Token} `
    // }});

    // const {ssrdata:plotdata} = useCustomSSR({url:`${APIBASEURl}/properties/property/${ID}/list/`, headers:{
    //     "Authorization":`Bearer ${Token}`
    // }});


    // useEffect(() => {
    //     let container:any = [];
    //     let containerplot:any = [];
    //     ssrdata?.map((item:any, index:number) => {
    //         container.push({title:item?.first_name, value:item?.id })
    //     })
    //     setClientList(container);

    //     containerplot.push({title:plotdata?.estate, value:plotdata?.id })
    //     setPlotList(containerplot);

    // }, [ssrdata, plotdata])


    const {action} = useCustomActionState({fn:addnewsales});


  return (
    < >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'Add Neighbourhood'}  />
                {/* {JSON.stringify(plotdata)} */}
            </div>
            <div className='flex flex-col space-y-3 mt-3'>
               <form action={action} >
                <input type="text" defaultValue={`${ID}`} name='property_id' hidden />
                    <FormModel  models={[
                        {datamodel:[
                            {labelname:'name', name:'name', type:'text', placeholder:'name'},
                        ]},
                    ]}  />
                    <br />
                    <div id='message'></div>
                    <div className="flex flex-row place-content-between">
                        <div>
                            <button className='btn text-info' type="submit">Submit</button>
                        </div>
                        
                    </div>
                    <br />
               </form>
            </div>
        </main>
    {/* <PageModal src={modalLink} />  */}
    </>
  )
}

const Home = () => { 
    return (
        <Suspense fallback="....">
            <AddInstallation  />
        </Suspense>
    )

}

export default Home
