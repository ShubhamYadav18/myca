import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CTA2 = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const generateUserId = async () => {
      // Generate a fresh user ID on every new page load
      try {
        const response = await fetch("http://localhost:5000/api/createUser", { method: "POST" });
        const data = await response.json();
        setUserId(data.userId);
        sessionStorage.setItem("userId", data.userId); // Store user ID only for this session
      } catch (error) {
        console.error("❌ Error generating user ID:", error);
      }
    };

    // Prevent duplicate API calls in React Strict Mode
    if (!sessionStorage.getItem("userId_created")) {
      sessionStorage.setItem("userId_created", "true");
      generateUserId();
    }
  }, []);

  return (
    <section className="ezy__cta2 light py-14 w-full h-screen bg-[#F1F1F1] text-black font-[Neue_Montreal]">
      <div className="container px-4">
        <div className="">
          <div className="grid grid-cols-12">
            <div className="col-span-12 m-20 bg-white rounded-3xl">
              <div className="py-12 px-6 m-20 text-center">
                <h2 className="text-6xl tracking-tight uppercase leading-none mb-6">
                   Choose your preference
                </h2>

                <div className="p-10 uppercase">
                  <Link to="/" className="text-md border hover:bg-[#F1F1F1] px-7 py-2 rounded-full">
                    Without Questions
                  </Link>

                  {/* Pass user ID as a URL parameter */}
                  <Link 
                    to={userId ? `/ptpage?userId=${userId}` : "/ptpage"} 
                    className="text-md border hover:bg-[#F1F1F1] px-7 py-2 ml-10 rounded-full"
                  >
                    With Questions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA2;
