import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Community',
    price: 'Free',
    description: 'Perfect for individual developers and open source projects',
    features: [
      'React & FastAPI core features',
      'Basic authentication',
      'Development environment',
      'Community support',
    ],
    mostPopular: false,
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Ideal for small teams and growing projects',
    features: [
      'Everything in Community',
      'Advanced authentication',
      'Database migrations',
      'API documentation',
      'Email support',
      'CI/CD integration',
    ],
    mostPopular: true,
    buttonText: 'Start Free Trial',
    buttonVariant: 'default' as const,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with unique requirements',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'Onboarding assistance',
      'Training sessions',
    ],
    mostPopular: false,
    buttonText: 'Contact Sales',
    buttonVariant: 'outline' as const,
  },
];

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Pricing Plans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple and transparent pricing options designed to fit your needs.
          </p>

          <div className="mt-6 inline-flex items-center p-1 bg-muted rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              Annually
              <span className="ml-1 text-xs font-bold text-primary">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative rounded-xl border ${
                plan.mostPopular ? 'border-primary/50 shadow-lg shadow-primary/10' : 'border-border'
              } overflow-hidden`}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-semibold bg-primary text-white px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-muted-foreground text-sm">{plan.description}</p>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button variant={plan.buttonVariant} className="w-full" size="lg">
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          Need a custom plan?{' '}
          <a href="#" className="text-primary hover:underline">
            Contact our sales team
          </a>{' '}
          for more information.
        </div>
      </div>
    </section>
  );
};
