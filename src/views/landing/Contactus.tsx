import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  Globe,
  MessageSquare,
  User,
  Building2,
  CheckCircle,
  Calendar,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (): void => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
  };

  return (
    <div>
      <div className="min-h-screen bg-card transition-colors duration-300 mt-24">
        {/* Main Contact Us Heading */}
        <div className="flex justify-center pt-8 pb-8">
          <div className="relative group">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-center tracking-widest">
              <span className="inline-block px-12 py-4 text-muted-foreground relative overflow-hidden transition-all duration-500 ease-out hover:text-foreground">
                Contact us
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-muted-foreground via-muted to-muted-foreground group-hover:w-full transition-all duration-700 ease-out"></span>
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mx-auto leading-relaxed">
              Ready to transform your business with cutting-edge technology? Let's start a
              conversation about how we can help you achieve your goals.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {/* Hero Section */}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-light text-muted-foreground mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  {/* Office Address */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Office Address</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        TechVision Plaza, Floor 15
                        <br />
                        Innovation District
                        <br />
                        Durg, Chhattisgarh 491001
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Phone Numbers</h4>
                      <p className="text-muted-foreground text-sm">
                        +91 788 123 4567
                        <br />
                        +91 788 765 4321
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Email Addresses</h4>
                      <p className="text-muted-foreground text-sm">
                        info@techvision.com
                        <br />
                        business@techvision.com
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Business Hours</h4>
                      <p className="text-muted-foreground text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
                <h4 className="font-medium text-foreground mb-4">Response Times</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Email Response</span>
                    <span className="text-sm font-medium text-primary">24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Phone Response</span>
                    <span className="text-sm font-medium text-primary">Immediate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Project Quote</span>
                    <span className="text-sm font-medium text-primary">2-3 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h3 className="text-2xl font-light text-foreground mb-6">Send us a Message</h3>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-success ">
                      Thank you! Your message has been sent successfully.
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-muted-foreground transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-muted-foreground transition-colors duration-200"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-muted-foreground transition-colors duration-200"
                        placeholder="Enter your company name (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-muted-foreground transition-colors duration-200"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-muted-foreground transition-colors duration-200 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:bg-primary/90 text-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <section className="mt-20">
            <h3 className="text-2xl font-light text-foreground text-center mb-8">
              Other Ways to Connect
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-chip-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-chip-blue" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Visit Our Website</h4>
                <p className="text-muted-foreground text-sm">
                  Explore our portfolio and learn more about our services at www.techvision.com
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-success" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Live Chat Support</h4>
                <p className="text-muted-foreground text-sm">
                  Get instant support through our website's live chat during business hours
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-chip-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-chip-purple" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Schedule a Meeting</h4>
                <p className="text-muted-foreground text-sm">
                  Book a consultation call to discuss your project requirements in detail
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
