import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    title: 'Enterprise Scaling',
    company: 'TechGlobal Inc.',
    description:
      'Migrated from a monolithic architecture to microservices using HorizonX, reducing deployment time by 78% and increasing system reliability.',
    metrics: [
      '400% faster API responses',
      '78% reduction in deployment time',
      '99.99% uptime achieved',
    ],
    color: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Startup Growth',
    company: 'NexGen Solutions',
    description:
      'Launched MVP in just 3 weeks with a small development team, enabling rapid iteration and successful seed funding round.',
    metrics: ['3-week MVP launch', '85% code reusability', '$2.1M seed funding secured'],
    color: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'E-commerce Transformation',
    company: 'ShopEase Platform',
    description:
      'Rebuilt legacy shopping platform on HorizonX, handling 10x previous transaction volume during peak sales events.',
    metrics: [
      '10x transaction capacity',
      '63% improved conversion rate',
      '4.8/5 customer satisfaction',
    ],
    color: 'from-orange-600 to-amber-600',
  },
];

export const CaseStudies = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="case-studies" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how organizations leverage HorizonX to transform their development processes and
            achieve extraordinary results.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {caseStudies.map((study, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg bg-white/5 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div
                    className={`h-2.5 w-20 rounded-full bg-gradient-to-r ${study.color} mb-4`}
                  ></div>
                  <CardTitle>{study.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-foreground/80">
                    {study.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-muted-foreground">{study.description}</p>
                  <div className="mt-4 space-y-3">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-sm font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
