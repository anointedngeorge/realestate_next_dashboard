import React from 'react'

const Hero = () => {
  return (
    <div
        className="hero min-h-screen"
        style={{
            backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}>
        <div className="hero-overlay bg-opacity-75"></div>
        <div className="hero-content text-neutral-content text-center ">
            <div className="max-w-m">
            <h1 className="mb-5 text-8xl max-sm:text-5xl font-bold">Vatican Garden Project</h1>
            <p className="mb-5 text-3xl">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <a className="link text-red-400">Get Started</a>
            </div>
        </div>
        </div>
  )
}

export default Hero
