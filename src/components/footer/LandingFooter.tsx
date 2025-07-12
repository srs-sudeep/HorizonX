import { AppLogo } from '@/components';
import { Github, Twitter, Slack } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="bg-background text-muted-foreground py-16 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-10 mb-12 text-center md:text-left">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <AppLogo horizontal className="mx-auto md:mx-0 mb-6" />
            <p className="max-w-md mx-auto md:mx-0 text-sm leading-relaxed">
              HorizonX is a modern full-stack boilerplate for building high-performance web
              applications with React and FastAPI.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Slack" className="hover:text-foreground transition-colors">
                <Slack size={20} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="flex justify-between min-w-fit">
            <div>
              <h4 className="text-foreground font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Discord Server
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contribute
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Sponsor
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} HorizonX. MIT Licensed.</p>
          <div className="flex flex-row sm:flex-row gap-2 sm:gap-6 ">
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
