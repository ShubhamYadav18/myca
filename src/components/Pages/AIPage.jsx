import React, { useState } from "react";
// import "./AIComponent.css"; // Import the new CSS file

function AIPage({ userId, onReceiveRecommendations }) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text before saving.");
      return;
    }
    setLoading(true);
    try {
      // Save input text to MongoDB collection "User_Responses"
      const saveResponse = await fetch("http://localhost:5000/api/saveUserResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text: inputText }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save user response.");
      }

      // Fetch recommendations after analysis
      const fetchResponse = await fetch(`http://localhost:5000/api/getRecommendations/${userId}`);
      const data = await fetchResponse.json();

      if (fetchResponse.ok) {
        onReceiveRecommendations(data.recommendations);
      } else {
        console.error("❌ Error fetching AI recommendations:", data.error);
        alert("Failed to fetch recommendations.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      alert("Error connecting to the server.");
    }
    setLoading(false);
  };

  return (
    <div className="ai-container p-40 flex flex-col items-center justify-center min-h-screen text-black">
      <div>
      <textarea
        className="ai-textarea resize-none border border-gray-300 rounded-xl p-4 w-[800px] h-[400px] text-lg 
             bg-white/10 backdrop-blur-lg text-white placeholder-black 
             shadow-lg transition-all duration-300 ease-in-out 
             focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
        rows="15"
        placeholder="Tell about yourself in 50 words..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      </div>
      <div>
      <button className="ai-button" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Get Recommendations"}
      </button>
      </div>
    </div>
  );
}

export default AIPage;
