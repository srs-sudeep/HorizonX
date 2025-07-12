export const ContactSection = () => {
  return (
    <section className="w-full bg-background px-6 py-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Us */}
        <div className="flex-1 bg-primary/10 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            Have a question or feedback? We’d love to hear from you!
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 rounded-lg bg-background text-foreground border border-border"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-lg bg-background text-foreground border border-border"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="px-4 py-2 rounded-lg bg-background text-foreground border border-border"
            />
            <button
              type="submit"
              className="self-start bg-primary text-foreground px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
