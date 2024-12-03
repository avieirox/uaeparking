import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How to pay for parking in Dubai via SMS?',
    answer: 'To pay for parking in Dubai using SMS, send a message to 7275 (PARK) with your vehicle plate number and the parking zone code. Shortly after, you\'ll receive an SMS confirmation. If you don\'t get a confirmation within five minutes, contact RTA customer service at 800-9090.'
  },
  {
    question: 'Is parking free today in Dubai?',
    answer: 'In Dubai, parking hours generally run from 8:00 AM to 10:00 PM, Saturday to Thursday. However, parking is typically free on Fridays and public holidays in areas managed by the RTA, except for certain high-demand zones where fees still apply.'
  },
  {
    question: 'How can I find my RTA parking zone?',
    answer: 'You can identify your parking zone in Dubai by looking for blue and orange signboards placed in each area. These signs display the zone number and its corresponding code. Alternatively, you can find this information through the RTA\'s website or mobile app.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className="bg-dark-200 rounded-xl shadow-soft hover:shadow-neon transition-all duration-300"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between"
          >
            <span className="text-lg font-semibold text-white">{faq.question}</span>
            <ChevronDown 
              className={`w-5 h-5 text-primary-400 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div 
            className={`px-6 overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'pb-4 max-h-40' : 'max-h-0'
            }`}
          >
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}