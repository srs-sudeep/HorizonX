import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <section className="relative py-20 px-4 flex-1 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Background gradient circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 mb-8">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Welcome to HorizonX
            </span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Elevate Your Digital Experience
          </h1>
          
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your workflow with our comprehensive platform. Experience seamless integration, powerful analytics, and intuitive design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8 text-lg h-12">
              <Link to="/login" className="gap-2">
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 text-lg h-12">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Gain deep insights with real-time data visualization and reporting
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Industry-leading security measures to protect your sensitive data
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Optimized performance for seamless user experience
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="h-12" />
            <img src="https://www.vectorlogo.zone/logos/shopify/shopify-ar21.svg" alt="Shopify" className="h-12" />
            <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" alt="Stripe" className="h-12" />
            <img src="https://www.vectorlogo.zone/logos/hubspot/hubspot-ar21.svg" alt="HubSpot" className="h-12" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;