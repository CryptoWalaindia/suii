import React, { useState } from 'react'
import {
  Banknote,
  ShieldCheck,
  Lock,
  Headset,
  Gift,
  ArrowRight,
  X,
  Instagram,
  Linkedin,
  Wallet,
  IndianRupee,
  Clock,
  BookOpen,
  Mail,
  Phone,
  User,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { supabase } from './src/supabaseClient'

function App() {
  const [waitlistName, setWaitlistName] = useState('')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistMobile, setWaitlistMobile] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null)

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const { error } = await supabase
        .from('waitlist_submissions')
        .insert([
          {
            name: waitlistName,
            email: waitlistEmail,
            mobile: waitlistMobile,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for joining the waitlist! We will notify you soon.'
      })

      // Reset form
      setWaitlistName('')
      setWaitlistEmail('')
      setWaitlistMobile('')
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error. Please try again or contact us directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="font-sans antialiased text-gray-800">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Wallet className="text-primary-500 w-8 h-8" />
          <span className="text-2xl font-bold text-gray-900">CryptoWala</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">Home</a>
          <a href="#about" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">About</a>
          <a href="#features" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">Features</a>
          <a href="#waitlist" className="text-gray-600 hover:text-primary-500 transition-colors duration-300">Waitlist</a>
        </nav>
        <a
          href="#waitlist"
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          Join Waitlist
        </a>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative flex flex-col md:flex-row items-center justify-center min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden
                     bg-gradient-to-br from-blue-50 to-primary-100 via-blue-100"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Subtle background pattern or texture */}
            <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle fill="#e0f2fe" cx="2" cy="2" r="1" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
          </div>

          <div className="relative z-10 text-center md:text-left md:w-1/2 space-y-6 md:pr-12">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 animate-fade-in-up">
              <span role="img" aria-label="India flag">🇮🇳</span> Namaste India. Transact securely and seamlessly with <span className="text-primary-600">CryptoWala.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up delay-200">
              FIU-aligned compliance, bank-grade KYC verification, and 24×7 dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-6 animate-fade-in-up delay-400">
              <a
                href="#waitlist"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full shadow-lg
                           transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Create Account / Join Waitlist
              </a>
              <button
                disabled
                className="bg-gray-200 text-gray-500 font-semibold py-3 px-8 rounded-full shadow-md cursor-not-allowed
                           transition-all duration-300 ease-in-out"
              >
                Get the App (Coming Soon)
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-16 md:mt-0 md:w-1/2 flex justify-center animate-fade-in-right delay-600">
            <div className="relative w-64 h-auto md:w-80 lg:w-96">
              <img
                src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="CryptoWala mobile app mockup showing USDT purchase"
                className="rounded-[2.5rem] shadow-2xl ring-4 ring-primary-200 transform rotate-3 hover:rotate-0 transition-all duration-500 ease-in-out hover:scale-105 animate-float"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-3 transform -rotate-6 hover:rotate-0 transition-transform duration-500 ease-in-out">
                <IndianRupee className="text-green-500 w-6 h-6" />
                <span className="font-semibold text-gray-800">Buy USDT with INR</span>
              </div>
              <div className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-3 transform rotate-6 hover:rotate-0 transition-transform duration-500 ease-in-out">
                <Clock className="text-blue-500 w-6 h-6" />
                <span className="font-semibold text-gray-800">Instant Transactions</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">About CryptoWala</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              CryptoWala is India’s first crypto store — built for everyday Indians to buy, sell, and transfer crypto easily through UPI and bank transfers. We’re building a compliant bridge between traditional banking and digital assets.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
              We are committed to FIU alignment, robust AML compliance, and offer 24×7 human support to ensure a secure and trustworthy experience for all our users.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
              <div className="text-left space-y-6">
                <h3 className="text-3xl font-semibold text-gray-900 mb-6">Our Vision & Timeline</h3>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-200 rounded-full"></div>
                  <div className="relative mb-8">
                    <div className="absolute -left-3 top-0 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      1
                    </div>
                    <p className="ml-6 text-xl font-semibold text-gray-800">2025: Website Launch + Waitlist</p>
                    <p className="ml-6 text-gray-600">Building our community and gathering early adopters.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-3 top-0 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      2
                    </div>
                    <p className="ml-6 text-xl font-semibold text-gray-800">2026: App Launch + Nationwide Rollout</p>
                    <p className="ml-6 text-gray-600">Bringing secure crypto transactions to every Indian.</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Vision and growth illustration"
                  className="rounded-3xl shadow-xl max-w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Concept Section */}
        <section id="concept" className="py-20 px-6 md:px-12 bg-gradient-to-br from-primary-50 to-blue-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What does On-Ramp and Off-Ramp mean?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary-100 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                <div className="flex items-center space-x-4 mb-4">
                  <ArrowRight className="text-primary-500 w-8 h-8 transform rotate-45" />
                  <h3 className="text-2xl font-semibold text-gray-900">On-Ramp</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  When users convert Indian Rupees (INR) into crypto (like Bitcoin or USDT) using UPI or bank transfer. CryptoWala makes this process seamless and secure.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary-100 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                <div className="flex items-center space-x-4 mb-4">
                  <ArrowRight className="text-primary-500 w-8 h-8 transform -rotate-135" />
                  <h3 className="text-2xl font-semibold text-gray-900">Off-Ramp</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  When users sell their crypto and receive INR directly into their bank account. Our goal is to make this process instant, compliant, and user-friendly — just like sending money on any payment app.
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed mt-12 max-w-3xl mx-auto">
              CryptoWala acts as a bridge between fiat and crypto, making digital asset transactions accessible and compliant for every Indian.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <Banknote className="text-primary-500 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">UPI & Bank Transfer Integration</h3>
                <p className="text-gray-600">Buy and sell crypto instantly with your preferred payment methods.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <ShieldCheck className="text-primary-500 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">FIU-Aligned Compliance</h3>
                <p className="text-gray-600">Fully registered and KYC verified, ensuring regulatory adherence.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <Lock className="text-primary-500 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Bank-Grade Security</h3>
                <p className="text-gray-600">Encrypted transactions and advanced AML monitoring for your peace of mind.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <Headset className="text-primary-500 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Support</h3>
                <p className="text-gray-600">24×7 chat and call assistance from our dedicated support team.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <Gift className="text-primary-500 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn & Refer</h3>
                <p className="text-gray-600">Exciting rewards and referral bonuses for our early users.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <X className="text-primary-500 w-12 h-12 mb-4" /> {/* Placeholder for a unique feature icon */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless User Experience</h3>
                <p className="text-gray-600">Intuitive interface designed for simplicity and ease of use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon / Waitlist Section */}
        <section
          id="waitlist"
          className="py-20 px-6 md:px-12 bg-gradient-to-br from-primary-100 to-blue-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <pattern id="pattern-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle fill="#9E7FFF" cx="1" cy="1" r="0.5" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-dots)" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10 bg-white p-10 md:p-16 rounded-3xl shadow-2xl border border-primary-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Be part of India’s financial revolution.</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
              Join thousands of early users waiting for the CryptoWala launch.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="name"
                    className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 text-lg"
                    placeholder="Your Name"
                    value={waitlistName}
                    onChange={(e) => setWaitlistName(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 text-lg"
                    placeholder="Your Email Address"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    id="mobile"
                    className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 text-lg"
                    placeholder="Your Mobile Number"
                    value={waitlistMobile}
                    onChange={(e) => setWaitlistMobile(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-xl text-center font-semibold ${
                  submitStatus.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg
                           transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-300 text-lg
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-primary-500"
              >
                {isSubmitting ? 'Submitting...' : 'Join the Waitlist'}
              </button>
            </form>

            <p className="text-2xl font-bold text-primary-600 mt-10">
              <span className="text-accent-500">21,000+</span> users already joined!
            </p>
          </div>
        </section>

        {/* Education Section (Optional) */}
        <section id="education" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Learn More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="#" className="block bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-secondary-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">What is FIU compliance?</h3>
                <p className="text-gray-600">Understand the regulatory framework that ensures secure and legal crypto transactions in India.</p>
                <span className="mt-4 inline-flex items-center text-primary-500 group-hover:text-primary-600 font-semibold transition-colors duration-300">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </a>
              <a href="#" className="block bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-secondary-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">How UPI makes crypto easy.</h3>
                <p className="text-gray-600">Discover how India's popular payment system simplifies buying and selling digital assets.</p>
                <span className="mt-4 inline-flex items-center text-primary-500 group-hover:text-primary-600 font-semibold transition-colors duration-300">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </a>
              <a href="#" className="block bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-secondary-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">India’s journey to crypto adoption.</h3>
                <p className="text-gray-600">Explore the evolving landscape of cryptocurrency in the Indian market.</p>
                <span className="mt-4 inline-flex items-center text-primary-500 group-hover:text-primary-600 font-semibold transition-colors duration-300">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wallet className="text-primary-400 w-7 h-7" />
              <span className="text-2xl font-bold text-white">CryptoWala</span>
            </div>
            <p className="text-gray-400">Making crypto simple, secure, and Indian.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                <X className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Join our newsletter for the latest updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="p-3 rounded-l-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 flex-grow"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-r-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-500">
          <p>&copy; 2025 CryptoWala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
