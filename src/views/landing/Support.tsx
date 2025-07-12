import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageSquare,
  BookOpen,
  Settings,
  CreditCard,
  User,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const SupportPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const faqData: Record<string, FAQItem[]> = {
    general: [
      {
        question: 'What is Seamless and how does it work?',
        answer:
          'Seamless is a comprehensive productivity application that helps you manage tasks, collaborate with teams, and streamline your workflow. It works by integrating multiple productivity tools into one seamless experience, allowing you to switch between different modes like task management, document editing, and team communication without losing context.',
      },
      {
        question: 'How do I get started with Seamless?',
        answer:
          "Getting started is simple! Download the app from our website, create your account, and follow the guided onboarding process. You'll be able to import existing data from other productivity tools and set up your workspace in under 5 minutes.",
      },
      {
        question: 'Is my data secure with Seamless?',
        answer:
          'Absolutely. We use enterprise-grade encryption (AES-256) for all data in transit and at rest. Your data is stored in secure, SOC 2 compliant data centers, and we never share your personal information with third parties.',
      },
      {
        question: 'Can I use Seamless offline?',
        answer:
          "Yes! Seamless offers robust offline functionality. You can access your recent documents, tasks, and notes even without an internet connection. All changes sync automatically when you're back online.",
      },
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer:
          "Click on 'Forgot Password' on the login screen, enter your email address, and we'll send you a secure reset link. The link expires in 24 hours for security purposes.",
      },
      {
        question: 'Can I change my email address?',
        answer:
          "Yes, go to Settings > Account > Email Address. You'll need to verify your new email address before the change takes effect. Your login credentials will update automatically.",
      },
      {
        question: 'How do I delete my account?',
        answer:
          "We're sorry to see you go! Go to Settings > Account > Privacy & Security > Delete Account. Please note that this action is irreversible and all your data will be permanently deleted after 30 days.",
      },
    ],
    billing: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through Stripe.',
      },
      {
        question: 'Can I get a refund?',
        answer:
          'Yes! We offer a 30-day money-back guarantee for all new subscriptions. Contact our support team within 30 days of your purchase for a full refund, no questions asked.',
      },
      {
        question: 'How do I upgrade or downgrade my plan?',
        answer:
          'Visit Settings > Billing to change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.',
      },
    ],
    technical: [
      {
        question: 'What are the system requirements?',
        answer:
          'Seamless works on Windows 10+, macOS 10.14+, and Linux (Ubuntu 18.04+). For mobile, we support iOS 12+ and Android 8+. We recommend at least 4GB RAM and 2GB free storage space.',
      },
      {
        question: 'Why is the app running slowly?',
        answer:
          'Try closing other applications to free up memory, ensure you have the latest version installed, and check your internet connection. If issues persist, try clearing the app cache in Settings > Advanced > Clear Cache.',
      },
      {
        question: 'How do I sync across devices?',
        answer:
          "Syncing happens automatically when you're signed in to the same account. Make sure you're connected to the internet and signed in on all devices. You can force a sync in Settings > Sync > Sync Now.",
      },
    ],
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const categories = [
    { id: 'general', name: 'General', icon: BookOpen },
    { id: 'account', name: 'Account', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'technical', name: 'Technical', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-card mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}

        <div className=" flex justify-center pt-8 pb-8">
          <div className="relative group ">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
              <span className="inline-block px-12 py-4 text-muted-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                How can we help you?
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground group-hover:w-full transition-all duration-700 ease-out"></span>
              </span>
            </h2>
            <p className=" text-muted-foreground mx-auto leading-relaxed  text-center text-sm">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact Us</h3>

              <div className="space-y-4">
                <div className="flex items-center p-3 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors cursor-pointer">
                  <MessageSquare className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium text-foreground">Live Chat</div>
                    <div className="text-sm text-muted-foreground">Available 24/7</div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium text-foreground">Email Support</div>
                    <div className="text-sm text-muted-foreground">support@seamlessapp.com</div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium text-foreground">Phone Support</div>
                    <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-background rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  Getting Started Guide
                </a>
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  Video Tutorials
                </a>
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  API Documentation
                </a>
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  System Status
                </a>
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  Feature Requests
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-3">
            <div className="bg-background rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Frequently Asked Questions
              </h3>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 border-border">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-4 py-2 rounded-t-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-background border-b-2 border-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-primary/20'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqData[selectedCategory]?.map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/10 hover:rounded-lg transition-colors"
                    >
                      <span className="font-medium text-foreground">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Support Resources */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 text-foreground border border-border">
                <h4 className="text-xl font-semibold mb-2">Community Forum</h4>
                <p className="mb-4 opacity-90">
                  Connect with other users, share tips, and get help from the community.
                </p>
                <button className="bg-primary text-foreground px-4 py-2 rounded-lg font-medium transition-colors">
                  Visit Forum
                </button>
              </div>

              <div className="bg-background rounded-xl p-6 text-foreground border border-border">
                <h4 className="text-xl font-semibold mb-2">Knowledge Base</h4>
                <p className="mb-4 opacity-90">
                  Browse our comprehensive collection of guides and tutorials.
                </p>
                <button className="bg-primary text-foreground px-4 py-2 rounded-lg font-medium transition-colors">
                  Browse Articles
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 bg-background rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support Hours</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Monday - Friday: 8:00 AM - 8:00 PM EST</div>
                <div>Saturday: 10:00 AM - 6:00 PM EST</div>
                <div>Sunday: 12:00 PM - 6:00 PM EST</div>
                <div className="text-success font-medium">Live Chat: Available 24/7</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Response Times</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Live Chat: Immediate</div>
                <div>Email (Premium): Within 2 hours</div>
                <div>Email (Standard): Within 24 hours</div>
                <div>Phone: Immediate during business hours</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Additional Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  Download Mobile App
                </a>
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  Release Notes
                </a>
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="block text-primary hover:text-primary hover:underline">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-foreground">
            <p>
              &copy; 2025 Seamless App. All rights reserved. | Version 2.4.1 | Last updated: June
              19, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
