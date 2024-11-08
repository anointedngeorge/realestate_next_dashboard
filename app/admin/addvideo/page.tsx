"use client"
import { addnewsales } from '@/app/actions/auth'
import { useCustomActionState } from '@/app/custom_hooks'
import { FormModel } from '@/app/globalcomponent'
// import { APIBASEURl, externalurls } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import {useSearchParams} from 'next/navigation'
import React, {Suspense } from 'react'


// const Token = globalThis?.sessionStorage?.getItem("apptoken")


const AddPropertyVideo = () => {
    // const [clientlist, setClientList] = useState<{title:string, value:string}[]>();
    // const [plotlist, setPlotList] = useState<{title:string, value:string}[]>();
    const query = useSearchParams()
    const ID = query.get("id")

    // const {ssrdata} = useCustomSSR({url:`${externalurls.clientlist}`, headers:{
    //     "Authorization":`Bearer ${Token} `
    // }});

    // const {ssrdata:plotdata} = useCustomSSR({url:`${APIBASEURl}/properties/property/${ID}/list/`, headers:{
    //     "Authorization":`Bearer ${Token}`
    // }});


    // useEffect(() => {
    //     let container:{title:string, value:string}[] = [];
    //     let containerplot:{title:string, value:string}[] = [];
    //     ssrdata?.map((item:{id:string, first_name:string}, index:number) => {
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
                <LineTitle heading={'Add New Video'}  />
                {/* {JSON.stringify(plotdata)} */}
            </div>
            <div className='flex flex-col space-y-3 mt-3'>
               <form action={action} >
                <input type="text" defaultValue={`${ID}`} name='property_id' hidden />
                    <FormModel  models={[
                        {datamodel:[
                            {labelname:'Title', name:'title', type:'text', placeholder:'Title'},
                            {labelname:'Video Type', name:'video_type', type:'select', selectdata:[
                                {title:'Link', value:'link'},
                                {title:'Embeded', value:'embeded'},
                            ]},
                        
                        ]},

                        {datamodel:[
                            {labelname:'Code', name:'video_link_or_embed', type:'textarea' },
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
    {/* <PageModal src={modalLink} />                 */}
    </>
  )
}

const Home = () => { 
    return (
        <Suspense fallback="....">
            <AddPropertyVideo  />
        </Suspense>
    )

}

export default Home
