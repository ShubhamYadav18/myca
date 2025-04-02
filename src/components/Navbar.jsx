import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed z-[999] w-full px-20 py-4 text-black font-['Neue_Montreal'] flex justify-between items-center backdrop-blur-xl">
      <div className="logo">
        <Link to="/" className="text-lg lowercase font-light hover:text-[#0E71D3]">
        mycareerai
        </Link>
      </div>
      <div className="links flex gap-5">
        <Link to="/cta2" className="text-md capitalize font-light   hover:text-[#0E71D3]">
          Get Started
        </Link>
        <Link to="/" className="text-md capitalize font-light   hover:text-[#0E71D3]">
          Home
        </Link>
        <Link to="/hiw" className="text-md capitalize font-light   hover:text-[#0E71D3]">
          How it works
        </Link>
        <Link to="/aboutpage" className="text-md capitalize font-light   hover:text-[#0E71D3]">
          About Us
        </Link>
        <Link to="/contactpage" className="text-md capitalize font-light ml-40  hover:text-[#0E71D3]">
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
