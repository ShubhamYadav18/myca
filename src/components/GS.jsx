import React from "react";

const GS = () => {
  return (
    <section data-scroll data-scroll-section data-scroll-speed="0"
			className="light font-['Neue_Montreal'] tracking-tight text-white py-40 rounded-tl-3xl rounded-tr-3xl -mt-80"
			style={{
				background: "#1F2937",
				backgroundSize: "cover"
			}}
		>
			<div className="container px-4 text-center">
				<h2 className="text-6xl leading-none mb-12 uppercase font-bold">
					Your future awaits Get on board
				</h2>
				 
				<div className="items-center -mt-10 mb-20">
					<button className="uppercase gap-10 mx-2 px-7 py-2 border border-[#3A4C60] hover:bg-[#3A4C60] mt-10 rounded-full">
						Without Questions
					</button>
					<button className="uppercase gap-10 mx-2 px-7 py-2 border border-[#3A4C60] hover:bg-[#3A4C60] mt-10 rounded-full">
						With Questions
					</button>
				</div>
			</div>
		</section>
  );
};

export default GS;
