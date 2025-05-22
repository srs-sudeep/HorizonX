import React, { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const frontendTech = [
  { name: 'React', description: 'UI component library', level: 90 },
  { name: 'Vite', description: 'Fast build tool', level: 95 },
  { name: 'TanStack Query', description: 'Data fetching & caching', level: 85 },
  { name: 'Zustand', description: 'State management', level: 80 },
  { name: 'Tailwind CSS', description: 'Utility-first CSS', level: 90 },
  { name: 'shadcn/ui', description: 'UI component system', level: 88 },
];

const backendTech = [
  { name: 'FastAPI', description: 'Modern Python framework', level: 92 },
  { name: 'SQLAlchemy', description: 'ORM for databases', level: 88 },
  { name: 'PostgreSQL', description: 'Relational database', level: 90 },
  { name: 'UV', description: 'Fast Python package installer', level: 85 },
  { name: 'Ruff', description: 'Fast Python linter', level: 82 },
  { name: 'Swagger', description: 'API documentation', level: 78 },
];

const devOpsTech = [
  { name: 'Docker', description: 'Containerization', level: 94 },
  { name: 'Kong', description: 'API Gateway', level: 87 },
  { name: 'Redis', description: 'In-memory data store', level: 89 },
  { name: 'ELK Stack', description: 'Logging & monitoring', level: 83 },
  { name: 'GitHub Actions', description: 'CI/CD pipelines', level: 86 },
  { name: 'Kubernetes', description: 'Container orchestration', level: 80 },
];

export const TechStack = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const renderTechCards = tech => {
    return tech.map((item, i) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="w-full md:w-1/2 lg:w-1/3 p-2"
      >
        <Card className="border border-horizonx-200 hover:border-horizonx-400 hover:shadow-lg hover:shadow-horizonx-500/20 transition-all duration-300 h-full">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-horizonx-100 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-horizonx-500/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-horizonx-600 flex items-center justify-center text-white font-bold">
                  {item.name.charAt(0)}
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-sm text-center text-muted-foreground mb-4">{item.description}</p>
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-horizonx-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${item.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Efficiency: {item.level}%</div>
          </CardContent>
        </Card>
      </motion.div>
    ));
  };

  return (
    <section
      id="tech-stack"
      ref={ref}
      className="py-20 bg-gradient-to-b from-secondary/30 to-background"
    >
      <div className="container">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Tech Stack
          </Badge>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Built with Modern Technologies
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            HorizonX integrates best-in-class libraries and tools to ensure your application is
            robust, maintainable, and scalable.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs
            defaultValue="frontend"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="devops">DevOps</TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="focus:outline-none">
              <div className="flex flex-wrap -mx-2">{renderTechCards(frontendTech)}</div>

              <Collapsible className="w-full mt-6">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                    <span className="text-sm font-medium">View key frontend features</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <motion.div
                    className="p-4 mt-2 border rounded-md bg-muted/50 text-sm space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>
                      <strong>Lightning-fast rendering</strong> with optimized React components
                    </p>
                    <p>
                      <strong>Smart data fetching</strong> patterns with automatic caching and
                      refetching
                    </p>
                    <p>
                      <strong>Type-safe development</strong> with full TypeScript support
                    </p>
                    <p>
                      <strong>Beautiful UI components</strong> with shadcn/ui and Tailwind CSS
                    </p>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </TabsContent>

            <TabsContent value="backend" className="focus:outline-none">
              <div className="flex flex-wrap -mx-2">{renderTechCards(backendTech)}</div>

              <Collapsible className="w-full mt-6">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                    <span className="text-sm font-medium">View key backend features</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <motion.div
                    className="p-4 mt-2 border rounded-md bg-muted/50 text-sm space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>
                      <strong>Asynchronous processing</strong> for maximum throughput
                    </p>
                    <p>
                      <strong>Automatic API documentation</strong> with Swagger/OpenAPI
                    </p>
                    <p>
                      <strong>Robust data validation</strong> with Pydantic schemas
                    </p>
                    <p>
                      <strong>Database migrations</strong> with Alembic for smooth deployment
                    </p>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </TabsContent>

            <TabsContent value="devops" className="focus:outline-none">
              <div className="flex flex-wrap -mx-2">{renderTechCards(devOpsTech)}</div>

              <Collapsible className="w-full mt-6">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                    <span className="text-sm font-medium">View key DevOps features</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <motion.div
                    className="p-4 mt-2 border rounded-md bg-muted/50 text-sm space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>
                      <strong>One-command deployment</strong> with Docker Compose
                    </p>
                    <p>
                      <strong>Smart API routing</strong> with Kong Gateway
                    </p>
                    <p>
                      <strong>Comprehensive monitoring</strong> with ELK stack
                    </p>
                    <p>
                      <strong>Scalable infrastructure</strong> with Kubernetes support
                    </p>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
