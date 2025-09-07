import React, { useState } from 'react';

const faqsData = [
  {
    question: "What is FutureX 2025?",
    answer: "FutureX 2025 is the premier annual techfest that brings together the brightest minds in technology, innovation, and futuristic concepts. It's a platform for students, professionals, and enthusiasts to showcase their skills, learn about cutting-edge technology, and network with industry leaders."
  },
  {
    question: "Who can participate in the events?",
    answer: "Participation is open to everyone! Whether you are a college student, a high school enthusiast, a working professional, or just a tech hobbyist, you are welcome to register and participate in our events and workshops."
  },
  {
    question: "How do I register for an event?",
    answer: "You can register for any event by visiting the 'Events' page on our website. Click on the event you're interested in, and you will find a 'Register Now' button which will guide you through the registration process."
  },
  {
    question: "Is there a registration fee?",
    answer: "Most of our events are free to participate in. However, some specialized workshops or competitions might have a nominal fee to cover material costs. Please check the specific event details for more information."
  },
  {
    question: "What are the prizes for the winners?",
    answer: "We have exciting prizes for the winners of our competitions, including cash rewards, tech gadgets, internship opportunities with leading tech companies, and exclusive FutureX merchandise. The prize pool varies for each event."
  }
];

const Faqs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pt-24 pb-12 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 uppercase" style={{ textShadow: '0 0 10px #A020F0, 0 0 20px #A020F0' }}>
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <div key={index} className="border-2 border-purple-500/50 rounded-lg overflow-hidden shadow-lg shadow-purple-500/10 transition-all duration-300 hover:shadow-purple-500/30">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left p-5 bg-gray-900/50 hover:bg-purple-900/30 focus:outline-none"
              >
                <span className="text-lg font-medium text-cyan-300">{faq.question}</span>
                <span className={`transform transition-transform duration-300 text-purple-400 ${openFaq === index ? 'rotate-180' : 'rotate-0'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="p-5 bg-black text-gray-300 text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;

