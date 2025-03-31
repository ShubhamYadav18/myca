import { motion } from 'framer-motion';
import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Tooltip from './UI/Tooltip';
import { Link } from 'react-router-dom';

function Landing() {

    // const navigate = useNavigate();

  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.3" className='w-full text-black h-screen bg-[#F1F1F1] pt-1'>
        <div className='textstructure mt-40 px-20'>
            {["Unlock", " AI- Powered", "Career Insights"].map((item, index)=> {
                return <div className='masker' >
                            <div className='w-fit flex'>
                                {index===1 && (<motion.img initial={{width: 0}} animate={{width: "5.9vw"}} transition={{ease: [0.76, 0, 0.24, 1], duration:1}} src={"Data Analysis.png"} alt="Description of image" className='mr-[1vw] rounded-md w-[7vw] h-[7vw] relative top-[1.1vw]'></motion.img>)}
                                <h1 className='uppercase text-[9vw] leading-[7vw] tracking-tight font-["Test_Founders_Grotesk_X-Condensed"]'>{item}</h1>
                            </div>
                        </div>
            })}
        </div>
        <div className="border-t-[1px] border-[#B1B1B1] font-[Neue_Montreal] mt-20 flex justify-between items-center py-5 px-20">
            {[
                "For students and experienced professionals.", 
                "From initial career exploration to advanced career transitions.",
                ].map((item)=> (
                <p className="text-md font-light tacking-tight capitalize leading-none">{item}</p>
                ))}
                
                <div className="start flex items-center gap-5">
                    <Tooltip text="'Arrow' for returning users. 'Get Started' for new users.">
                    <div className="px-5 py-1 border-[1px] border-[#B1B1B1] rounded-full text-md uppercase">Quick Recommendations</div>
                    </Tooltip>
                    
                    {/* <button 
                    onClick={() => navigate('/trpage')}
                    className="w-8 h-8 flex items-center justify-center border-[1px] border-[#B1B1B1] rounded-full hover:bg-gray-200 transition"
          >         <GoArrowUpRight />
                    </button> */}

                    <Link to="/trpage" className="w-8 h-8 flex items-center justify-center border-[1px] border-[#B1B1B1] rounded-full hover:bg-gray-200 transition">
                    <GoArrowUpRight />
                    </Link>

                </div>
        </div>

        <div className='mt-8 flex justify-center text-md text-zinc-500 hover:text-zinc-400 font-light tracking-tight leading-none gap-2'>Scroll Down <IoIosArrowDown /> </div>
    </div>
  )
}

export default Landing