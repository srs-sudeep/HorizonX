import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container relative z-10">
        <div className="blur-container">
          <div className="max-w-3xl mx-auto text-center mb-10 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight gradient-text">
              Supercharge Your React & FastAPI Development
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              HorizonX is a high-performance, full-stack boilerplate that combines React with
              FastAPI, enabling rapid development of scalable microservice applications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Github size={18} /> Star on GitHub
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground">
              <div className="flex -space-x-2 mr-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-background bg-horizonx-${200 + i * 100}`}
                  ></div>
                ))}
              </div>
              <span>
                <strong className="font-medium text-foreground">2,500+</strong> developers already
                using HorizonX
              </span>
            </div>
          </div>
        </div>

        {/* Code preview */}
        <div className="mx-auto max-w-4xl mt-12 bg-black/80 backdrop-blur-md rounded-xl border border-horizonx-700/20 shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-white/70 text-sm">example.tsx</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto text-green-300">
            <code>{`// HorizonX makes it simple to integrate React with FastAPI
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';

// Define your store with Zustand
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Use TanStack Query for data fetching
export const UserProfile = () => {
  const { user, setUser } = useStore();
  
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('/api/user');
      return res.json();
    },
  });

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold">Welcome, {data?.name}</h2>
      {/* Your component content */}
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-horizonx-400/20 via-background to-background"></div>
    </section>
  );
};
