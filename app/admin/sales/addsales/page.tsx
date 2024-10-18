"use client"
import { addnewsales } from '@/app/actions/auth'
import { useCustomActionState, useCustomSSR } from '@/app/custom_hooks'
import { FormModel } from '@/app/globalcomponent'
import { APIBASEURl, externalurls } from '@/app/interface'
import { LineTitle } from '@/components/admin/LineTitle'
import {useSearchParams} from 'next/navigation'
import React, {Suspense, useEffect, useState } from 'react'


const Token = globalThis?.sessionStorage?.getItem("apptoken")


const AddSalesHome = () => {
    const [clientlist, setClientList] = useState<{title:any, value:any}[]>();
    const [plotlist, setPlotList] = useState<{title:any, value:any}[]>();
    const query = useSearchParams()
    const ID = query.get("id")

    const {ssrdata} = useCustomSSR({url:`${externalurls.clientlist}`, headers:{
        "Authorization":`Bearer ${Token} `
    }});

    const {ssrdata:plotdata} = useCustomSSR({url:`${APIBASEURl}/properties/property/${ID}/list/`, headers:{
        "Authorization":`Bearer ${Token}`
    }});


    useEffect(() => {
        let container:any = [];
        let containerplot:any = [];
        ssrdata?.map((item:any, index:number) => {
            container.push({title:item?.first_name, value:item?.id })
        })
        setClientList(container);

        containerplot.push({title:plotdata?.estate, value:plotdata?.id })
        setPlotList(containerplot);

    }, [ssrdata, plotdata])


    const {state, action, status} = useCustomActionState({fn:addnewsales});

    const ProcessedTable = (data:any, title:string) => {
        let table = "";
        table += `<table class='table'><caption className="text-left text-3xl">${title}</caption> <tbody><tr>`;
        
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = data[key];
                table += `<td>${element}</td>`;
            }
        }
        table += "</tr></tbody></table>";
        return table;
    }

   
  return (
    < >
        <main className='flex flex-col space-y-4 h-screen'>
            <div>
                <LineTitle heading={'Add New Sales'}  />
                {/* {JSON.stringify(plotdata)} */}
            </div>
            <div className='flex flex-col space-y-3 mt-3'>
               <form action={action} >
                    <FormModel  models={[
                        {datamodel:[
                            {labelname:'client', name:'client_id', type:'select', selectdata:clientlist},
                            
                            {labelname:'Selling Estates', name:'selling_plots_id', type:'select', selectdata:plotlist},

                            {labelname:'Payment Plans', name:'payment_plans', type:'select', selectdata:[
                                {title:'Outright', value:'outright'},
                                {title:'3', value:'3-Months'},
                                {title:'6', value:'6-Months'},
                                
                            ]},
                        ]},

                        {datamodel:[
                            {labelname:'Purpose', name:'purpose_of_purchase', type:'select', selectdata:[
                                {title:'To Build', value:'build'},
                                {title:'To Resale Later', value:'resale'},
                            ]},
                            {labelname:'Land Use', name:'land_use', type:'select', selectdata:[
                                {title:'Hostel', value:'hostel'},
                                {title:'Clinic', value:'Clinic'},
                                {title:'Mall', value:'Mall'},
                                {title:'Hotel', value:'hotel'},
                                {title:'Commercial Residence', value:'commercial'},
                                {title:'Private Residence', value:'private'},
                                {title:'School', value:'School'},
                            ]},
                        ], },

                        {datamodel:[
                            {labelname:'Plots', selectdata:[
                                {title:'Regular', value:'regular'},
                                {title:'corner', value:'Corner Piece'},
                            ], name:'plots', type:'select'},

                            {labelname:'Plot Size', selectdata:[
                                {title:'451sqm', value:'460sqm'},
                                {title:'460sqm', value:'460sqm'},
                                {title:'300sqm', value:'300sqm'},
                                {title:'500sqm', value:'500sqm'},
                            ], name:'plot_size', type:'select'},

                            {labelname:'Number of Plots',  name:'number_plots', type:'number', value:0},
                        ]},
                        {datamodel:[
                            {labelname:'Selling Price',  name:'selling_price', type:'number', value:0},
                            {labelname:'Discount',  name:'discount', type:'number', value:0},
                            {labelname:'Purchase Price',  name:'purchase_price', type:'number', value:0},
                            {labelname:'Initial Payment',  name:'initial_payment', type:'number', value:0},
                        ]},

                        {datamodel:[
                            {labelname:'First Generation', selectdata:[
                                {title:'15%', value:'15'},
                                {title:'10%', value:'10'},
                                {title:'7%', value:'7'},
                                {title:'5%', value:'5'},
                                {title:'3%', value:'3'},
                            ], name:'first_commission', type:'select'},

                            {labelname:'Second Generation', selectdata:[
                                {title:'15%', value:'15'},
                                {title:'10%', value:'10'},
                                {title:'7%', value:'7'},
                                {title:'5%', value:'5'},
                                {title:'3%', value:'3'},
                                {title:'2%', value:'2'},
                                {title:'1%', value:'1'},
                            ], name:'second_commission', type:'select'},

                            {labelname:'Third Commission', selectdata:[
                                {title:'15%', value:'15'},
                                {title:'10%', value:'10'},
                                {title:'7%', value:'7'},
                                {title:'5%', value:'5'},
                                {title:'3%', value:'3'},
                                {title:'2%', value:'2'},
                                {title:'1%', value:'1'},
                            ], name:'third_commission', type:'select'},
                         
                        ]},
                        {datamodel:[
                            {
                                onkeyup:async (event:any) => {
                                    const referal_code = event.currentTarget.value;
                                    const dt = await fetch(`${APIBASEURl}/account/realtors/${referal_code}/list/`, {
                                        headers: {
                                            "Authorization":`Bearer ${Token}`
                                        }
                                    });
                                    const res = await dt.json();
                                    const modmessage:any = document.getElementById("message")
                                    if (modmessage) {
                                        if (res) {
                                            const commission = res?.process_commission;
                                           let tabled = "";
                                           tabled += ProcessedTable(commission?.first_generation, 'First Generation');
                                           tabled += ProcessedTable(commission?.second_generation, 'Second Generation');
                                           tabled += ProcessedTable(commission?.third_generation, 'Third Generation');
                                            
                                            modmessage.innerHTML = `<div className='p-3 bg-black text-white'>${tabled}</div>`;
                                        }
                                    }
                                },
                                labelname:"Realtors Referal Code",
                                name:'consultant_email_address',
                                type:'text',
                                placeholder:'Realtors Referal Code',
                                
                            },
                        ]},
                    ]}  />
                    <br />
                    <div id='message'></div>
                    <div className="flex flex-row place-content-between">
                        <div>
                            <button className='btn text-info' type="submit">Submit</button>
                        </div>
                        <div><button className='btn text-warning' type="reset">Reset</button></div>
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
            <AddSalesHome  />
        </Suspense>
    )

}

export default Home
