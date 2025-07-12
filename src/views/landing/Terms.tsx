import React, { useState } from 'react';
import {
  Shield,
  FileText,
  Scale,
  Users,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  X,
} from 'lucide-react';

const Terms: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: CheckCircle, color: 'blue' },
    { id: 'services', title: 'Description of Services', icon: Globe, color: 'emerald' },
    { id: 'user-accounts', title: 'User Accounts', icon: Users, color: 'violet' },
    { id: 'acceptable-use', title: 'Acceptable Use Policy', icon: AlertCircle, color: 'amber' },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: Shield, color: 'rose' },
    { id: 'privacy', title: 'Privacy & Data Protection', icon: Shield, color: 'indigo' },
    { id: 'payment', title: 'Payment Terms', icon: Scale, color: 'teal' },
    { id: 'liability', title: 'Limitation of Liability', icon: AlertCircle, color: 'orange' },
    { id: 'termination', title: 'Termination', icon: AlertCircle, color: 'red' },
    { id: 'governing-law', title: 'Governing Law', icon: Scale, color: 'cyan' },
    { id: 'contact', title: 'Contact Information', icon: FileText, color: 'slate' },
  ];

  return (
    <div>
      <div className="min-h-screen bg-card transition-all duration-300 pt-24">
        {/* Header */}
        <div className="flex justify-center pt-8 pb-8">
          <div className="relative group ">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
              <span className="inline-block px-12 py-4 text-muted-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                Terms & Conditions
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground group-hover:w-full transition-all duration-700 ease-out"></span>
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mx-auto leading-relaxed  text-center">
              Please read these terms carefully before using our services
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated: June 19, 2025</span>
            </div>
          </div>
        </div>
        {/* Mobile Menu Button */}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div
              className={`lg:w-72 ${isSidebarOpen ? 'block' : 'hidden lg:block'} fixed lg:relative top-0 left-0 h-full lg:h-auto z-40 lg:z-auto`}
            >
              <div className="lg:sticky lg:top-6 h-full lg:h-auto">
                <div className="h-full lg:h-auto bg-background backdrop-blur-sm lg:backdrop-blur-md rounded-none lg:rounded-2xl border-r lg:border border-slate-200 dark:border-slate-700 p-6 lg:shadow-lg">
                  <div className="flex items-center justify-between lg:justify-start mb-6 lg:mb-4">
                    <h3 className="text-lg font-medium text-foreground flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-primary" />
                      Navigation
                    </h3>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="lg:hidden w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-primary" />
                    </button>
                  </div>

                  <nav className="space-y-1">
                    {sections.map((section, index) => {
                      return (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className="group flex items-center px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                        >
                          <span className="flex items-center justify-center w-6 h-6 mr-3 text-xs font-medium text-muted-foreground group-hover:text-primary">
                            {index + 1}
                          </span>
                          <span className="flex-1 truncate">{section.title}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:max-w-none">
              <div className="bg-background backdrop-blur-sm rounded-2xl border border-border shadow-lg">
                {/* Content Sections */}
                <div className="p-8 lg:p-12 space-y-12">
                  <section id="acceptance">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-chip-blue/10 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-chip-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">
                          Acceptance of Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          By accessing and using TechVision's services, you accept and agree to be
                          bound by the terms and provision of this agreement. If you do not agree to
                          abide by the above, please do not use this service.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="services">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">
                          Description of Services
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          TechVision provides comprehensive technology consulting, software
                          development, web development, mobile application development, and related
                          digital services.
                        </p>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-success rounded-full mr-3"></div>
                            Custom software development
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-success rounded-full mr-3"></div>
                            Web & mobile applications
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-success rounded-full mr-3"></div>
                            Technology consulting
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-success rounded-full mr-3"></div>
                            Digital transformation
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="user-accounts">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-chip-purple/10 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-chip-purple" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">User Accounts</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          When you create an account with us, you must provide information that is
                          accurate, complete, and current at all times. You are responsible for
                          safeguarding the password and maintaining the confidentiality of your
                          account.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="acceptable-use">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-chip-yellow/10 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-chip-yellow" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">
                          Acceptable Use Policy
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          You may not use our service for any illegal or unauthorized purpose. You
                          agree to comply with all local laws regarding online conduct and
                          acceptable content.
                        </p>
                        <div className="bg-chip-yellow/10 border border-chip-yellow/30 rounded-lg p-4">
                          <p className="text-sm text-chip-yellow">
                            Prohibited activities include transmitting spam, viruses, or harmful
                            code; attempting unauthorized access; harassment; or disrupting our
                            services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="intellectual-property">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">
                          Intellectual Property Rights
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          The service and its original content, features, and functionality are and
                          will remain the exclusive property of TechVision and its licensors. Our
                          trademarks and trade dress may not be used without our prior written
                          consent.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="privacy">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">
                          Privacy and Data Protection
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          Your privacy is important to us. Our Privacy Policy explains how we
                          collect, use, and protect your information when you use our service. By
                          using our service, you agree to the collection and use of information in
                          accordance with our Privacy Policy.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="payment">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-chip-blue/10 rounded-xl flex items-center justify-center">
                        <Scale className="w-5 h-5 text-chip-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">Payment Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          Payment terms are specified in individual service agreements. Unless
                          otherwise agreed, payments are due within 30 days of invoice date. Late
                          payments may incur additional charges.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="liability">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-chip-yellow/10 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-chip-yellow" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">
                          Limitation of Liability
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          In no event shall TechVision, nor its directors, employees, partners,
                          agents, suppliers, or affiliates, be liable for any indirect, incidental,
                          special, consequential, or punitive damages resulting from your use of the
                          service.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="termination">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">Termination</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          We may terminate or suspend your account and bar access to the service
                          immediately, without prior notice or liability, under our sole discretion,
                          for any reason whatsoever, including if you breach the Terms.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="governing-law">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-chip-purple/10 rounded-xl flex items-center justify-center">
                        <Scale className="w-5 h-5 text-chip-purple" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">Governing Law</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          These Terms shall be interpreted and governed by the laws of India. Any
                          disputes relating to these terms and conditions shall be subject to the
                          jurisdiction of the courts of Chhattisgarh, India.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="contact">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-foreground/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-foreground mb-3">
                          Contact Information
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          If you have any questions about these Terms and Conditions, please contact
                          us:
                        </p>
                        <div className="bg-card rounded-lg p-4 border border-border">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-foreground mb-1">TechVision</p>
                              <p className="text-muted-foreground leading-relaxed">
                                TechVision Plaza, Floor 15
                                <br />
                                Innovation District
                                <br />
                                Durg, Chhattisgarh 491001, India
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                <span className="font-medium">Email:</span> legal@techvision.com
                                <br />
                                <span className="font-medium">Phone:</span> +91 788 123 4567
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-8 bg-secondary border border-border rounded-2xl p-8 text-center backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Important Notice</h3>
                <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
                  These terms may be updated from time to time. Continued use of our services after
                  changes constitutes acceptance of the new terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/20 z-30"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Terms;
