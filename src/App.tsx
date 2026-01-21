import React, { useState } from 'react'
import {
  Banknote,
  ShieldCheck,
  Lock,
  TrendingDown,
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
  Menu,
} from 'lucide-react'
import { supabase } from './supabaseClient'

function App() {
  const [waitlistName, setWaitlistName] = useState('')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistMobile, setWaitlistMobile] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect backdrop-blur-lg shadow-lg animate-slide-down px-6 md:px-12 flex justify-between items-center" style={{ backgroundColor: '#111827' }}>
        <div className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="CryptoWala Logo" className="w-20 h-20" />
          <span className="text-2xl font-bold"><span className="text-white">Crypto</span><span className="text-white">Wala</span></span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-110">Home</a>
          <a href="#about" className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-110">About</a>
          <a href="#features" className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-110">Features</a>
          <a href="#waitlist" className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-110">Contact us</a>
        </nav>
        <a
          href="#waitlist"
          className="hidden md:block shimmer-button bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Contact us
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-40 md:hidden bg-gray-900 border-t border-gray-700 shadow-lg animate-slide-down">
          <nav className="flex flex-col p-6 space-y-4">
            <a
              href="#hero"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 py-2 border-b border-gray-700"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 py-2 border-b border-gray-700"
            >
              About
            </a>
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 py-2 border-b border-gray-700"
            >
              Features
            </a>
            <a
              href="#waitlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 py-2"
            >
              Contact us
            </a>
          </nav>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative flex flex-col md:flex-row items-center justify-center min-h-screen pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-12 overflow-hidden
                     bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
        >
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 text-center md:text-left md:w-1/2 space-y-5 md:space-y-7 md:pr-12">
            {/* Enhanced Heading with Gradient Text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up">
              <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                Namaste India.
              </span>
              <br />
              <span className="font-normal text-gray-200 text-3xl md:text-5xl lg:text-6xl block mt-2">
                Transact securely seamlessly with{' '}
                <span className="font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  CryptoWala
                </span>
              </span>
            </h1>

            {/* Enhanced Description */}
            <p className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed animate-fade-in-up delay-200 max-w-2xl">
              <span className="font-semibold text-blue-300">FIU-aligned compliance</span>, bank-grade KYC verification, and <span className="font-semibold text-blue-300">competitive rates</span>.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-4 md:pt-6 animate-fade-in-up delay-400">
              <a
                href="#waitlist"
                className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 md:px-10 rounded-full shadow-2xl text-sm md:text-base
                           transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
                           before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-400 before:to-blue-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:-z-10 before:blur-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Join the Waitlist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
              <button
                disabled
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-400 font-semibold py-4 px-8 md:px-10 rounded-full shadow-md cursor-not-allowed text-sm md:text-base
                           transition-all duration-300 ease-in-out"
              >
                Get the App (Coming Soon)
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6 animate-fade-in-up delay-600">
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">FIU Registered</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Lock className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Bank-Grade Security</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <TrendingDown className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Competitive Rates</span>
              </div>
            </div>
          </div>

          {/* Enhanced Illustration Section */}
          <div className="relative z-10 mt-12 md:mt-16 md:w-1/2 flex justify-center animate-fade-in-right delay-600">
            <div className="relative w-48 md:w-80 lg:w-96 h-auto">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

              {/* Main Image with Float Animation */}
              <img
                src="/images/hand.svg"
                alt="Hand holding crypto"
                className="relative w-full h-auto object-contain animate-float drop-shadow-2xl"
              />

              {/* Enhanced Glassmorphism Badges */}
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white/95 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-2xl flex items-center space-x-3 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-in-out border border-white/20 group animate-float animation-delay-1000">
                <div className="bg-green-100 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <IndianRupee className="text-green-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <span className="font-bold text-gray-800 text-xs md:text-sm block">Buy USDT</span>
                  <span className="text-gray-600 text-xs">with INR instantly</span>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 bg-white/95 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-2xl flex items-center space-x-3 transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-in-out border border-white/20 group animate-float animation-delay-500">
                <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <span className="font-bold text-gray-800 text-xs md:text-sm block">Instant</span>
                  <span className="text-gray-600 text-xs">Transactions</span>
                </div>
              </div>

              {/* Additional Floating Badge - Top Left */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-gradient-to-br from-purple-500 to-pink-500 p-3 md:p-4 rounded-xl shadow-2xl transform -rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-in-out animate-float animation-delay-2000">
                <span className="font-bold text-white text-xs md:text-sm">21K+ Users</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-extrabold text-white mb-4">About us</h2>
                <div className="h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        <span className="font-semibold text-white">Accessible for every Indian:</span> Buy, sell, and transfer digital assets seamlessly using UPI and bank transfers — all in one secure platform designed for simplicity and trust.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        <span className="font-semibold text-white">FIU-aligned compliance:</span> Fully registered and compliant with India's Financial Intelligence Unit regulations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        <span className="font-semibold text-white">Advanced security:</span> Bank-grade AML protocols and encrypted transactions for your peace of mind.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-2xl mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        <span className="font-semibold text-white">Competitive rates:</span> Best-in-class pricing with transparent fees for all your crypto transactions.
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
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -z-10"></div>
                  <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-12">
              <h2 className="text-5xl font-extrabold text-white mb-4">Key Features</h2>
              <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <Banknote className="text-blue-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">UPI & Bank Transfer Integration</h3>
                <p className="text-gray-300">Buy and sell crypto instantly with your preferred payment methods.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <ShieldCheck className="text-blue-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">FIU-Aligned Compliance</h3>
                <p className="text-gray-300">Fully registered and KYC verified, ensuring regulatory adherence.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <Lock className="text-blue-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Bank-Grade Security</h3>
                <p className="text-gray-300">Encrypted transactions and advanced AML monitoring for your peace of mind.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <TrendingDown className="text-blue-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Competitive Rates</h3>
                <p className="text-gray-300">Best-in-class pricing with transparent fees for all transactions.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <Gift className="text-blue-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Earn & Refer</h3>
                <p className="text-gray-300">Exciting rewards and referral bonuses for our early users.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <X className="text-blue-400 w-12 h-12 mb-4" /> {/* Placeholder for a unique feature icon */}
                <h3 className="text-xl font-semibold text-white mb-2">Seamless User Experience</h3>
                <p className="text-gray-300">Intuitive interface designed for simplicity and ease of use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon / Waitlist Section */}
        <section
          id="waitlist"
          className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10 bg-gray-800 p-10 md:p-16 rounded-3xl shadow-2xl border border-gray-700">
            <h2 className="text-4xl font-bold text-white mb-6">Be part of India's financial revolution.</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
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
        <section id="education" className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-12">
              <h2 className="text-5xl font-extrabold text-white mb-4">Learn More</h2>
              <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="https://fiuindia.gov.in/pdfs/AML_legislation/AMLCFTguidelines10032023.pdf" target="_blank" rel="noopener noreferrer" className="block bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-blue-400 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">What is FIU compliance?</h3>
                <p className="text-gray-300">Understand the regulatory framework that ensures secure and legal crypto transactions in India.</p>
                <span className="mt-4 inline-flex items-center text-blue-400 group-hover:text-blue-300 font-semibold transition-colors duration-300">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </a>
              <a href="https://en.wikipedia.org/wiki/Cryptocurrency" target="_blank" rel="noopener noreferrer" className="block bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-blue-400 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Understanding Cryptocurrency Basics</h3>
                <p className="text-gray-300">Learn the fundamentals of digital currencies, blockchain technology, and how crypto works in simple terms.</p>
                <span className="mt-4 inline-flex items-center text-blue-400 group-hover:text-blue-300 font-semibold transition-colors duration-300">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </a>
              <a href="https://www.indiatoday.in/business/story/india-tops-global-crypto-adoption-rankings-again-in-2025-report-2783757-2025-09-08" target="_blank" rel="noopener noreferrer" className="block bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 text-left transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <BookOpen className="text-blue-400 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">India's journey to crypto adoption.</h3>
                <p className="text-gray-300">Explore the evolving landscape of cryptocurrency in the Indian market.</p>
                <span className="mt-4 inline-flex items-center text-blue-400 group-hover:text-blue-300 font-semibold transition-colors duration-300">
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
                <span className="text-white">Crypto</span>
                <span className="text-white">Wala</span>
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
