"use client"

import FrontendLayout from "@/components/frontend/Layout";





const OfficeCard = () => {
  return (
    <div className="card card-compact bg-base-100 w-full  shadow-xl ">
    <figure>
    <iframe className="object-cover border-none" style={{
      width:'100%',
      height:'350px'
    }} src="https://www.youtube.com/embed/cmvO4tXtLRw?si=UQhKyM8-GPKKy05R" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
    </figure>
    <div className="card-body">
      <h2 className="card-title text-center">Asaba Office Headquater</h2>
      
      {/* <div className="card-actions justify-center flex flex-row space-x-3">
        <div>
            <span>
                <IoMdPlay size={24} />
            </span>
        </div>
      </div> */}
    </div>
  </div>
  )
}



export default function Home() {

  // 
  return (
    <FrontendLayout>
      <div className="flex flex-col space-y-10 ">
        <div className="shrink-0 w-full h-72 flex items-center place-content-center " style={{
            backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
        }}>
          {/* <div className="hero-overlay bg-opacity-75 w-full"></div> */}
          <h3 className="font-bold text-5xl bg-black bg-opacity-45 text-red-100 px-24 py-3 rounded-lg z-40">Our tevevision</h3>
          
          {/* <p>Any Questions Or remarks? Just Write us a message!</p> */}
        </div>

        <div className="p-8 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <OfficeCard />
              <OfficeCard />
              <OfficeCard />
        </div>

      </div>
    </FrontendLayout>
  );
}
