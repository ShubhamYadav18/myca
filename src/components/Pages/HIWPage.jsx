import React from "react";

const HIWPage = () => {
  const steps = [
    {
      icon: "fas fa-sign-in-alt",
      title: "Log in",
      description: "The challenge facing online banks is to meet the needs.",
    },
    {
      icon: "fas fa-cannabis",
      title: "Select Service",
      description: "The challenge facing online banks is to meet the needs.",
    },
    {
      icon: "fas fa-camera",
      title: "Select Amount",
      description: "The challenge facing online banks is to meet the needs.",
    },
    {
      icon: "fas fa-random",
      title: "Payment",
      description: "The challenge facing online banks is to meet the needs.",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-20 px-6">
      <div className="text-center max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
        <p className="mt-4 text-lg text-gray-600">
          Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis
          eligendi qui nihil repellendus dicta sapiente.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 w-full max-w-6xl">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white text-2xl shadow-lg">
              <i className={step.icon}></i>
            </div>
            <h5 className="mt-4 text-xl font-bold text-gray-900">{step.title}</h5>
            <p className="mt-2 text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HIWPage;
