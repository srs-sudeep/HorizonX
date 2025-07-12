import React, { useState } from 'react';
import {
  Shield,
  Eye,
  Lock,
  Database,
  Users,
  Calendar,
  Mail,
  Phone,
  Globe,
  AlertCircle,
} from 'lucide-react';

interface PrivacySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string[];
}

const Privacy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const privacySections: PrivacySection[] = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />,
      content: [
        'Personal Information: We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This may include your name, email address, phone number, company name, and professional details.',
        'Usage Information: We automatically collect information about how you use our services, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.',
        'Device Information: We collect information about the devices you use to access our services, including hardware models, operating systems, unique device identifiers, and mobile network information.',
        'Cookies and Tracking: We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and preferences.',
      ],
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: <Eye className="w-6 h-6" />,
      content: [
        'Service Provision: To provide, maintain, and improve our services, process transactions, and communicate with you about your account or our services.',
        'Personalization: To personalize your experience, provide customized content, and make recommendations based on your interests and usage patterns.',
        'Communication: To send you technical notices, updates, security alerts, and administrative messages, as well as marketing communications (with your consent).',
        'Analytics: To monitor and analyze trends, usage, and activities in connection with our services to improve functionality and user experience.',
        'Legal Compliance: To comply with applicable laws, regulations, legal processes, and government requests.',
      ],
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: <Users className="w-6 h-6" />,
      content: [
        'Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and customer service.',
        'Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.',
        'Legal Requirements: We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect our rights, property, or safety.',
        'Consent: We may share your information with your consent or at your direction, including when you choose to share information through our services.',
        'No Sale of Personal Data: We do not sell, rent, or trade your personal information to third parties for their marketing purposes.',
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security and Protection',
      icon: <Lock className="w-6 h-6" />,
      content: [
        'Security Measures: We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        'Encryption: We use industry-standard encryption protocols to protect sensitive data during transmission and storage.',
        'Access Controls: We maintain strict access controls and regularly review and update our security practices to ensure the protection of your information.',
        'Regular Audits: We conduct regular security audits and assessments to identify and address potential vulnerabilities.',
        'Incident Response: We have established procedures for responding to data security incidents and will notify you of any breaches as required by applicable law.',
      ],
    },
    {
      id: 'data-retention',
      title: 'Data Retention and Deletion',
      icon: <Calendar className="w-6 h-6" />,
      content: [
        'Retention Period: We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.',
        'Account Deletion: You may request deletion of your account and associated personal information at any time by contacting us through the provided channels.',
        'Automatic Deletion: Some information may be automatically deleted after specified periods in accordance with our data retention policies.',
        'Legal Requirements: We may retain certain information for longer periods when required by law or for legitimate business purposes.',
      ],
    },
    {
      id: 'user-rights',
      title: 'Your Privacy Rights',
      icon: <Shield className="w-6 h-6" />,
      content: [
        'Access Rights: You have the right to access, update, or correct your personal information in your account settings or by contacting us.',
        'Data Portability: You may request a copy of your personal information in a structured, commonly used, and machine-readable format.',
        'Deletion Rights: You may request deletion of your personal information, subject to certain exceptions for legal compliance and legitimate business purposes.',
        'Opt-out Rights: You may opt out of receiving marketing communications from us at any time by following the unsubscribe instructions in our emails.',
        'Complaint Rights: You have the right to lodge a complaint with relevant data protection authorities if you believe we have not handled your personal information appropriately.',
      ],
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-card transition-colors duration-300 mt-24">
        {/* Main Privacy Policy Heading */}
        <div className="flex justify-center pt-8 pb-8">
          <div className="relative group">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
              <span className="inline-block px-12 py-4 text-muted-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                Privacy policies
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground group-hover:w-full transition-all duration-700 ease-out"></span>
              </span>
            </h2>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-background rounded-2xl p-8 border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-3">Your Privacy Matters</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    At TechVision, we are committed to protecting your privacy and ensuring the
                    security of your personal information. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when you use our
                    services.
                  </p>
                  <p className="text-foreground text-sm">
                    <strong>Last Updated:</strong> June 19, 2025 | <strong>Effective Date:</strong>{' '}
                    June 19, 2025
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Navigation */}
          <section className="mb-16">
            <h3 className="text-2xl font-light text-foreground mb-8 text-center">
              Quick Navigation
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {privacySections.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 hover:shadow-md ${
                    activeSection === section.id
                      ? 'bg-primary/40 border-border'
                      : 'bg-primary/10 border-border hover:bg-primary/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-primary">{section.icon}</div>
                    <span className="font-medium text-foreground text-sm">{section.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Privacy Sections */}
          <div className="space-y-12">
            {privacySections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <div className="text-primary">{section.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-foreground">{section.title}</h3>
                      <div className="text-sm text-muted-foreground">Section {index + 1}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {section.content.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Contact Information */}
          <section className="mt-20">
            <div className="bg-background rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-light text-foreground text-center mb-8">
                Privacy Questions?
              </h3>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If you have any questions about this Privacy Policy, our data practices, or your
                privacy rights, please don't hesitate to contact us using any of the methods below.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-chip-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-chip-blue" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Email Us</h4>
                  <p className="text-muted-foreground text-sm">privacy@techvision.com</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-success" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Call Us</h4>
                  <p className="text-muted-foreground text-sm">+91 788 123 4567</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-chip-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-chip-purple" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Visit Online</h4>
                  <p className="text-muted-foreground text-sm">www.techvision.com/privacy</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Notice */}
          <section className="mt-16 text-center">
            <div className="inline-block bg-secondary rounded-lg px-6 py-3 border border-border">
              <p className="text-sm text-muted-foreground">
                This policy may be updated periodically. We will notify you of significant changes
                via email or through our services.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
