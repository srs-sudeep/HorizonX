import { Badge } from '@/components/ui/badge';
import { Zap, Database, Server, GitBranch, Code, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Full-Stack Integration',
    description:
      'Seamlessly connect React frontend with FastAPI backend using pre-configured TanStack Query patterns.',
    icon: <Code className="h-10 w-10 text-horizonx-600" />,
  },
  {
    title: 'Microservice Ready',
    description:
      'Built-in support for microservice architecture with Kong API Gateway and Docker containerization.',
    icon: <Server className="h-10 w-10 text-horizonx-600" />,
  },
  {
    title: 'High Performance',
    description:
      'Lightning-fast development and runtime performance with Vite, UV, Ruff, and optimized SQLAlchemy.',
    icon: <Zap className="h-10 w-10 text-horizonx-600" />,
  },
  {
    title: 'Scalable State Management',
    description:
      'Effortlessly manage application state with Zustand stores and React Query for server state.',
    icon: <GitBranch className="h-10 w-10 text-horizonx-600" />,
  },
  {
    title: 'Enterprise-Grade Database',
    description:
      'Production-ready PostgreSQL integration with SQLAlchemy ORM for robust data management.',
    icon: <Database className="h-10 w-10 text-horizonx-600" />,
  },
  {
    title: 'Secure by Default',
    description:
      'Implements best security practices with authentication, authorization, and data protection built in.',
    icon: <Lock className="h-10 w-10 text-horizonx-600" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Everything You Need to Build Modern Applications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            HorizonX combines the best tools and practices from both frontend and backend
            development to provide a complete solution for building robust applications.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-horizonx-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-horizonx-400/20"
              variants={item}
            >
              <div className="p-3 mb-4 bg-horizonx-500/10 rounded-lg self-start w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
