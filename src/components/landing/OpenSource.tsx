import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Heart } from 'lucide-react';

export const OpenSource = () => {
  return (
    <section id="open-source" className="py-20 bg-horizonx-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-horizonx-800/50 via-horizonx-950 to-horizonx-950 z-0"></div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-horizonx-500 text-horizonx-400 mb-4">
            100% Open Source
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-horizonx-400 to-horizonx-300 bg-clip-text text-transparent">
            Free for Everyone, Forever
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            HorizonX is built by developers, for developers. We believe in the power of
            community-driven software and have committed to keeping HorizonX completely free and
            open source.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-horizonx-900/70 backdrop-blur-sm rounded-xl border border-horizonx-800 p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-horizonx-400 mb-2">10k+</div>
              <p className="text-gray-400">GitHub Stars</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-horizonx-400 mb-2">150+</div>
              <p className="text-gray-400">Contributors</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-horizonx-400 mb-2">2.5k+</div>
              <p className="text-gray-400">Active Users</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent border-horizonx-500 text-horizonx-400 hover:bg-horizonx-800"
            >
              <Github size={18} /> Star on GitHub
            </Button>
            <Button size="lg" className="gap-2 bg-horizonx-600 hover:bg-horizonx-700">
              <Heart size={18} /> Sponsor the Project
            </Button>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Our Open Source Promise</h3>
          <p className="text-gray-300 mb-6">
            We're committed to maintaining HorizonX as a free, open-source project that anyone can
            use, modify, and contribute to. No premium features, no hidden restrictions - just
            powerful software that helps developers build amazing applications quickly.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="outline" className="border-horizonx-700 bg-horizonx-900/50">
              MIT License
            </Badge>
            <Badge variant="outline" className="border-horizonx-700 bg-horizonx-900/50">
              No Vendor Lock-in
            </Badge>
            <Badge variant="outline" className="border-horizonx-700 bg-horizonx-900/50">
              Community Driven
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
