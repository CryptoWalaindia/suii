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
  Youtube,
  Send,
  IndianRupee,
  Clock,
  BookOpen,
  Mail,
  Phone,
  User,
} from 'lucide-react'
import { supabase } from './supabaseClient'

function App() {
  const [waitlistName, setWaitlistName] = useState('')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistMobile, setWaitlistMobile] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

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
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect bg-white/80 backdrop-blur-lg shadow-lg animate-slide-down px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="CryptoWala Logo" className="w-20 h-20" />
          <span className="text-2xl font-bold"><span className="text-blue-900">Crypto</span><span className="text-blue-400">Wala</span></span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="text-lg text-gray-600 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">Home</a>
          <a href="#about" className="text-lg text-gray-600 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">About</a>
          <a href="#features" className="text-lg text-gray-600 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">Features</a>
          <a href="#waitlist" className="text-lg text-gray-600 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">Contact us</a>
        </nav>
        <a
          href="#waitlist"
          className="shimmer-button bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Contact us
        </a>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative flex flex-col md:flex-row items-center justify-center min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden
                     bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient"
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
            <h1 className="text-5xl md:text-6xl leading-tight text-gray-900 animate-fade-in-up">
              <span className="font-bold">Namaste India.</span>
              <br />
              <span className="font-normal">Transact securely seamlessly with <span className="font-bold text-blue-900">Crypto</span><span className="font-bold text-blue-400">Wala</span>.</span>
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
                Create Account / Contact us
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

          <div className="relative z-10 mt-32 md:mt-16 md:w-1/2 flex justify-center animate-fade-in-right delay-600">
            <div className="relative w-64 h-auto md:w-80 lg:w-96">
              <img
                src="/images/hand.svg"
                alt="Hand holding crypto"
                className="w-full h-auto object-contain"
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
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-extrabold text-gray-900 mb-4">About <span className="text-blue-900">Crypto</span><span className="text-blue-400">Wala</span></h2>
                <div className="h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-500 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">Accessible for every Indian:</span> Buy, sell, and transfer digital assets seamlessly using UPI and bank transfers — all in one secure platform designed for simplicity and trust.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-500 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">FIU-aligned compliance:</span> Fully registered and compliant with India's Financial Intelligence Unit regulations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-500 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">Advanced security:</span> Bank-grade AML protocols and encrypted transactions for your peace of mind.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary-500 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">24×7 human support:</span> Round-the-clock assistance to guide you at every step of your crypto journey.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right Column - Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <div className="relative z-10">
                    <img
                      src="/images/about-illustration.png"
                      alt="CryptoWala Platform Illustration"
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                  {/* Decorative background elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                  <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-12">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Key Features</h2>
              <div className="h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"></div>
            </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Be part of India's financial revolution.</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
              Contact us to learn more about CryptoWala.
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
                <div className={`p-4 rounded-xl text-center font-semibold ${submitStatus.type === 'success'
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
                {isSubmitting ? 'Submitting...' : 'Contact us'}
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
            <div className="inline-block mb-12">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Learn More</h2>
              <div className="h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="https://fiuindia.gov.in/pdfs/AML_legislation/AMLCFTguidelines10032023.pdf" target="_blank" rel="noopener noreferrer" className="block bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-secondary-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">What is FIU compliance?</h3>
                <p className="text-gray-600">Understand the regulatory framework that ensures secure and legal crypto transactions in India.</p>
                <span className="mt-4 inline-flex items-center text-primary-500 group-hover:text-primary-600 font-semibold transition-colors duration-300">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </a>
              <a href="https://en.wikipedia.org/wiki/Cryptocurrency" target="_blank" rel="noopener noreferrer" className="block bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-secondary-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">Understanding Cryptocurrency Basics</h3>
                <p className="text-gray-600">Learn the fundamentals of digital currencies, blockchain technology, and how crypto works in simple terms.</p>
                <span className="mt-4 inline-flex items-center text-primary-500 group-hover:text-primary-600 font-semibold transition-colors duration-300">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </a>
              <a href="https://www.indiatoday.in/business/story/india-tops-global-crypto-adoption-rankings-again-in-2025-report-2783757-2025-09-08" target="_blank" rel="noopener noreferrer" className="block bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-secondary-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">India's journey to crypto adoption.</h3>
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
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.svg" alt="CryptoWala Logo" className="w-20 h-20" />
              <span className="text-2xl font-bold">
                <span className="text-blue-400">Crypto</span>
                <span className="text-blue-300">Wala</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              10 years of dedicated commitment: Sharing our journey, values, and excellence in every endeavor with passion.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://x.com/cryptowalax?t=aBbTuKBrP6A_BPsMhFv4aw&s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <X className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/cryptowalaindia?igsh=cW1ia2U5bzl3enVp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/cryptowalaindia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@cryptowalaindia?si=wWv7ckBjYtJCnoXV" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://t.me/cryptowalaindiaa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">About Us</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Our Services</a></li>
              <li><a href="/Privacy Policy CryptoWala.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Privacy Policy</a></li>
              <li><a href="/T&C CryptoWala.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Terms & Conditions</a></li>
              <li><a href="/Risk_Disclosure_CryptoWala.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Risk Disclosure</a></li>
            </ul>
          </div>

          {/* Our Location */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Our Location</h4>
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3076!2d78.3808!3d17.4485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzU0LjYiTiA3OMKwMjInNTEuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CryptoWala Location"
              ></iframe>
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Get in touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <span className="text-blue-400 mt-1">📍</span>
                <span className="text-gray-400">
                  Address: 2nd floor, Next to Club Rogue, SLN Terminus Mall, Gachibowli, Hyderabad, India - 500032
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="text-blue-400 w-4 h-4 flex-shrink-0" />
                <a href="tel:+919000022224" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  +91 90000 22224
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="text-blue-400 w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@cryptowala.ai" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  info@cryptowala.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; 2025 CryptoWala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
