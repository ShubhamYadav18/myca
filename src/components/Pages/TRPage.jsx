import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TRPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId"); // ✅ Extract userId from URL

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) {
        setError("❌ Error: User ID not found.");
        setLoading(false);
        return;
      }

      try {
        console.log(`📡 Fetching recommendations for user: ${userId}`);
        const response = await fetch(`http://localhost:5000/api/getRecommendations/${userId}`);
        const data = await response.json();

        console.log("✅ Raw API Response:", data); // Debugging

        // ✅ Extract recommendations from object
        if (data && data.recommendations && Array.isArray(data.recommendations)) {
          setRecommendations(data.recommendations);
        } else {
          console.error("❌ Unexpected API response format:", data);
          setError("❌ No recommendations found.");
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error);
        setError("❌ Failed to fetch recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-white uppercase">Your Career Recommendations</h1>

      {loading && <p className="text-gray-300">⏳ Loading recommendations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && recommendations.length === 0 && (
        <p className="text-gray-300">❌ No recommendations available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"></div>

            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                {rec["Occupation Title"] || "Unknown Career"} {/* ✅ Dynamic title */}
              </h3>

              <p className="text-center text-gray-600 px-3 py-2">
                {rec["Career Pathway"] || "No description available."} {/* ✅ Dynamic career pathway */}
              </p>

              <p className="text-center text-gray-600 px-3 py-2">
                Cluster: {rec["Career Cluster"] || "N/A"} {/* ✅ Dynamic career cluster */}
              </p>

              <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  Similarity: {(rec["final_similarity"] * 100).toFixed(2)}% {/* ✅ Display similarity score */}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TRPage;
