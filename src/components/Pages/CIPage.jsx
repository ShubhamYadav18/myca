import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CIPage = ({ onNext }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId"); // Extract userId from URL

  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const questionsPerPage = 4;

  useEffect(() => {
    fetch("http://localhost:5000/api/riasec-questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("❌ Error fetching questions:", error));
  }, []);

  const handleResponseChange = (index, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [index]: value,
    }));
  };

  const isCurrentPageAnswered = () => {
    return currentQuestions.every((_, index) => responses[startIndex + index] !== undefined);
  };

  const allQuestionsAnswered = () => {
    return questions.every((_, index) => responses[index] !== undefined);
  };

  const calculateRiasecScores = () => {
    const scores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };
    const traitMap = { R: "Realistic", I: "Investigative", A: "Artistic", S: "Social", E: "Enterprising", C: "Conventional" };

    questions.forEach((question, index) => {
      const traitKey = traitMap[question.Trait];
      scores[traitKey] += responses[index] || 0;
    });
    return scores;
  };

  const handleSubmit = async () => {
    if (!allQuestionsAnswered()) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setShowPopup(true);
  };

  const confirmSubmission = async () => {
    const finalScores = { ...calculateRiasecScores(), userId }; // Include userId
    console.log("📤 Submitting RIASEC Scores:", finalScores);
    try {
      const response = await fetch("http://localhost:5000/api/storeResponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalScores),
      });
      const data = await response.json();
      console.log("📥 Server Response:", data);
      if (response.ok) {
        alert("Submission successful! Moving to the next section.");
        if (onNext) onNext(finalScores);
        
        // Navigate to next page with userId
        if (userId) {
          navigate(`/epage?userId=${userId}`);
        } else {
          console.error("❌ Error: userId is missing, navigation aborted.");
          alert("Error: User ID not found. Please try again.");
        }
      } else {
        console.error("❌ Server error:", data.error);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  const labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>RIASEC Personality Test</h2>
      {currentQuestions.length > 0 ? (
        currentQuestions.map((question, i) => (
          <div key={startIndex + i} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <p>{question.Question}</p>
            <div>
              {labels.map((label, j) => (
                <label key={j} style={{ margin: "0 10px" }}>
                  <input
                    type="radio"
                    name={`question-${startIndex + i}`}
                    value={j + 1}
                    checked={responses[startIndex + i] === j + 1}
                    onChange={() => handleResponseChange(startIndex + i, j + 1)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: "10px", padding: "10px", borderRadius: "5px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        {currentPage < totalPages ? (
          <button
            onClick={() => {
              if (isCurrentPageAnswered()) {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              } else {
                alert("Please answer all questions on this page before proceeding.");
              }
            }}
            style={{ marginLeft: "10px", padding: "10px", borderRadius: "5px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{ marginLeft: "10px", padding: "10px", borderRadius: "5px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}
          >
            Submit
          </button>
        )}
      </div>
      {showPopup && (
        <div className="popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="popup-box" style={{ background: "white", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
            <p>Are you sure you want to submit? This action cannot be reversed.</p>
            <button onClick={() => setShowPopup(false)} style={{ marginRight: "10px", padding: "10px", borderRadius: "5px", background: "red", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>
            <button onClick={confirmSubmission} style={{ padding: "10px", borderRadius: "5px", background: "green", color: "white", border: "none", cursor: "pointer" }}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CIPage;
