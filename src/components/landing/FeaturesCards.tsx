import { Zap, Shield, Users, Sparkles, Globe } from 'lucide-react';
import { ScrollWrapper } from '@/components';

export const FeaturesCards = () => {
  const features = [
    {
      icon: Zap,
      title: 'SCOSTA Smart ID',
      description: 'Tamper-proof smart cards with encrypted biometric storage.',
      delay: 200,
    },
    {
      icon: Shield,
      title: 'Smart Card Reader',
      description: 'Real-time data, flexible security, and limitless biometric scans.',
      delay: 400,
    },
    {
      icon: Users,
      title: 'Custom Software',
      description: 'Tailored features to fit your unique campus workflow.',
      delay: 600,
    },
    {
      icon: Sparkles,
      title: 'Seamless Campus Life',
      description: 'Smart, secure, and student-centric digital ecosystem.',
      delay: 800,
    },
    {
      icon: Globe,
      title: 'AI Insights',
      description: 'Learns from feedback to deliver smarter interventions.',
      delay: 1000,
    },
  ];

  return (
    <div className="relative py-24 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollWrapper animationType="slideUp" className="text-center mb-16" threshold={0.2}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why <span className="bg-primary bg-clip-text text-transparent">Seamless?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of unified business operations with our comprehensive platform
            designed for modern teams
          </p>
        </ScrollWrapper>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <ScrollWrapper
                key={index}
                animationType="slideUp"
                delay={feature.delay}
                threshold={0.2}
              >
                <div
                  className={`group p-8 bg-primary/10 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border backdrop-blur-sm relative overflow-hidden`}
                >
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-card opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div
                    className={`w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10`}
                  >
                    <IconComponent className="w-6 h-6 text-foreground" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {feature.description}
                  </p>
                </div>
              </ScrollWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};
