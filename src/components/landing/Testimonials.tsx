import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "HorizonX has completely transformed our development process. We've cut our time-to-market in half and dramatically improved code quality.",
    author: 'Sarah Johnson',
    role: 'CTO',
    company: 'DataStream Inc.',
  },
  {
    quote:
      "The most impressive part of HorizonX is how it scales with your team. We started with 3 developers and now have 30, and it's just as effective.",
    author: 'Michael Chen',
    role: 'Lead Developer',
    company: 'TechFusion',
  },
  {
    quote:
      'We evaluated several boilerplates for our startup, but HorizonX stood out with its thoughtful architecture and developer experience.',
    author: 'Priya Patel',
    role: 'Engineering Manager',
    company: 'NovaTech Solutions',
  },
  {
    quote:
      'Moving our legacy app to HorizonX was surprisingly smooth. The documentation is excellent and the community is incredibly helpful.',
    author: 'David Rodriguez',
    role: 'Software Architect',
    company: 'Elevate Digital',
  },
  {
    quote:
      "HorizonX's built-in performance optimization saved us countless hours. Our app is faster and our team is more productive.",
    author: 'Emma Wilson',
    role: 'VP of Engineering',
    company: 'GrowthForge',
  },
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollSpeed = 0.5;
    let animationFrameId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (!containerRef.current) return;

      scrollPos += scrollSpeed;
      const maxScroll = containerRef.current.scrollWidth / 2;

      if (scrollPos >= maxScroll) {
        scrollPos = 0;
      }

      containerRef.current.scrollLeft = scrollPos;
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Developers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who've already transformed their workflow with HorizonX.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full overflow-x-hidden">
        <div className="flex gap-6 py-4 w-max animate-scroll">
          {/* First set of testimonials */}
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-80 flex-shrink-0 rounded-xl p-6 bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <blockquote>
                <p className="text-lg mb-4">{testimonial.quote}</p>
                <footer>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
