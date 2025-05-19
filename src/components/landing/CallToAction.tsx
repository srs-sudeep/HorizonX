import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-horizonx-800 to-horizonx-900 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-horizonx-600/30 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-horizonx-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Building with HorizonX?
              </h2>
              <p className="text-gray-200 mb-8">
                Join thousands of developers who are already using HorizonX to build faster, more
                reliable applications with less code and fewer headaches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-horizonx-800 hover:bg-gray-100">
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 hover:border-white gap-2"
                >
                  View Documentation <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
