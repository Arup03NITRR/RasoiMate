const ContactPage = () => {
  return (
    <main className="bg-white min-h-screen py-16 px-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="space-y-6 bg-purple-50 p-8 rounded-xl shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-purple-800">Get in Touch</h2>
            <p className="text-gray-700">
              Have questions, feedback, or want to collaborate? We'd love to hear from you. Reach out to us via the
              contact form or the information below.
            </p>

            <div className="text-gray-700 space-y-2">
              <p><strong>Email:</strong> support@aicookgen.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-8901</p>
              <p><strong>Address:</strong> 123 AI Recipe Lane, Foodie City, TX 12345</p>
            </div>

            <img
              src="/logos/2.PNG"
              alt="AI Chef"
              className="w-full max-w-sm rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
