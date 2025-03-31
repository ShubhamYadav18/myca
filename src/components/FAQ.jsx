import { useState } from "react";

const faqs = [
  {
    question: "How can I pay for my appointment?",
    answer:
      "You can pay using credit/debit card, online payment services, or insurance, depending on our accepted payment methods.",
  },
  {
    question: "Is the cost of the appointment covered by private health insurance?",
    answer:
      "Coverage depends on your specific health insurance plan. Please check with your provider.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "A referral may be required depending on the type of consultation. Please check with our office for details.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "Our clinic is open Monday to Friday from 9 AM to 5 PM. Weekend availability varies.",
  },
  {
    question: "What can I expect at my first consultation?",
    answer:
      "During your first consultation, we will discuss your medical history, concerns, and the next steps in your treatment plan.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section data-scroll data-scroll-section data-scroll-speed="1" className="-mt-[350px] bg-[#F1F1F1] rounded-tl-3xl rounded-tr-3xl py-10 text-black font-['Neue_Montreal'] leading-none">
      <div className="container max-w-4xl px-6 mx-auto">
        <h1 className="text-center text-6xl text-center capitalize tracking-tight">
          Frequently Asked Questions
        </h1>
        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-[0.8px] border-gray-100 rounded-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-6"
              >
                <h2 className="font-semibold">
                  {faq.question}
                </h2>
                <span className={`text-white bg-zinc-500 rounded-full p-1`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {openIndex === index ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    )}
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div>
                  <hr className="border-gray-200" />
                  <p className="p-6 text-sm">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;