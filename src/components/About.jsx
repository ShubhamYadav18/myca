import React from 'react'

function About() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".5" className='w-full bg-[#E6F0FB] rounded-3xl text-black -mt-60'>
        <h1 className='pr-20 pl-20 pt-20 font-["Neue_Montreal"] text-[3vw] leading-[3.8vw] tracking-tight' >Welcome to the future of
          career exploration. We understand that your career journey is deeply personal and constantly evolving. 
          That's why we've developed an AI-driven platform that goes beyond traditional assessments.
        </h1>

        <div className='w-full flex gap-5 border-t-[1px] pt-10 mt-20 border-zinc-300'>
            <div className='w-1/2 p-20 '>
                <h1 className='text-6xl font-["Neue_Montreal"]' >Our Approach</h1>
                <button className='flex uppercase gap-10 items-center px-7 py-2 bg-zinc-900 mt-10 rounded-full text-white '>Read More
                    <div className='w-2 h-2 bg-zinc-300 rounded-full'></div>
                </button>
            </div>
            <div className='w-1/2 h-[70vh] p-20'>
            <div className='w-full h-full bg-zinc-500 rounded-2xl'></div>
            </div>
        </div>
    </div>
  )
}

export default About