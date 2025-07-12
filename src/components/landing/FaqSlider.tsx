import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSlider = () => {
  const faqs = [
    {
      question: 'What is HorizonX',
      answer: 'This is a microservice designed for students of IIT Bhilai',
    },
    {
      question: 'How can we reach IIT Bhilai',
      answer: 'Come to durg railway station then take auto to IIT Bhilai',
    },
    {
      question: 'What is HorizonX',
      answer: 'This is a microservice designed for students of IIT Bhilai',
    },
    {
      question: 'How can we reach IIT Bhilai',
      answer: 'Come to durg railway station then take auto to IIT Bhilai',
    },
    {
      question: 'What is HorizonX',
      answer: 'This is a microservice designed for students of IIT Bhilai',
    },
    {
      question: 'How can we reach IIT Bhilai',
      answer: 'Come to durg railway station then take auto to IIT Bhilai',
    },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
      <section className="w-full px-4 py-12 bg-card">
        <h2 className="text-3xl font-semibold text-center mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-full border border-border rounded-xl p-4 shadow-sm bg-background transition "
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full text-left cursor-pointer"
              >
                <h3 className="text-lg font-medium text-muted-foreground">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openIndex === index && <p className="mt-3 text-muted-foreground">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
