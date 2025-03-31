import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId"); // ✅ Extract userId from URL

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const educationLevels = [
    "Less than a High School Diploma",
    "High School Diploma",
    "Post-Secondary Certificate - Award",
    "Some College Courses",
    "Associate's Degree (or other 2-year degree)",
    "Bachelor's Degree",
    "Post-Baccalaureate Certificate - Award",
    "Master's Degree",
    "Post-Master's Certificate - Award",
    "First Professional Degree - Award",
    "Doctoral Degree",
    "Post-Doctoral Training",
  ];

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getEducationCategory/${userId}`);
        const data = await response.json();
        if (data.educationCategory) {
          setSelectedCategory(data.educationCategory);
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("❌ Error fetching education category:", error);
      }
    };

    if (userId) {
      fetchEducationData();
    }
  }, [userId]);

  const handleSave = async () => {
    if (!userId) {
      alert("❌ User ID not found. Try refreshing the page.");
      return;
    }

    if (!selectedCategory) {
      alert("❌ Please select an education level before saving.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/storeResponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, educationCategory: selectedCategory }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Education category saved!");
        setIsSubmitted(true);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error saving education category:", error);
    }
  };

  const handleGetRecommendations = async () => {
    if (!userId) {
      alert("❌ User ID not found. Try refreshing the page.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/getRecommendations/${userId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("✅ Recommendations received:", data);
        // Navigate to the recommendation page with userId
        navigate(`/trpage?userId=${userId}`, { state: { recommendations: data } });
      } else {
        alert(`❌ Error fetching recommendations: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error getting recommendations:", error);
    }
  };

  return (
    <div className="education-container pt-10 text-black">
      <h2 className="education-title">Select Your Education Level</h2>

      {!isSubmitted ? (
        <>
          <select
            className="education-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select Education Level --</option>
            {educationLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>

          <div className="education-buttons">
            <button className="education-button save-button" onClick={handleSave}>
              Save Education
            </button>
          </div>
        </>
      ) : (
        <div className="education-buttons">
          <button
            className="education-button fetch-button"
            onClick={handleGetRecommendations} // ✅ Fetch recommendations and navigate
          >
            Get Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default EPage;
