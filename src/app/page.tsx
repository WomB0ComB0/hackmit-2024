"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle, ArrowRight, BarChart, Lock, Users, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Loader from "@/components/client/Loader"

const features = [
  {
    title: "Advanced AI",
    description: "Cutting-edge fraud detection powered by state-of-the-art artificial intelligence",
    icon: <BarChart className="h-10 w-10 text-primary mb-2" />,
  },
  {
    title: "Real-time Monitoring",
    description: "24/7 transaction surveillance to catch fraudulent activities as they happen",
    icon: <Shield className="h-10 w-10 text-primary mb-2" />,
  },
  {
    title: "Easy Integration",
    description: "Seamless setup for your systems with minimal disruption to your operations",
    icon: <Lock className="h-10 w-10 text-primary mb-2" />,
  },
  {
    title: "User-Friendly Dashboard",
    description: "Intuitive interface for easy monitoring and management of your fraud prevention",
    icon: <Users className="h-10 w-10 text-primary mb-2" />,
  },
]

const testimonials = [
  {
    quote: "FraudGuard AI has revolutionized our fraud prevention strategy. It's like having a team of experts working 24/7.",
    author: "Jane Doe",
    company: "TechCorp Inc.",
  },
  {
    quote: "The real-time alerts have saved us millions. I can't imagine running our business without FraudGuard AI now.",
    author: "John Smith",
    company: "Global Finances Ltd.",
  },
]

export default function LandingPage() {
  const router = useRouter()
  const { isLoaded, userId, isSignedIn } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/dashboard")
    }
  }, [isLoaded, userId, router])

  if (!isLoaded) {
    return <Loader />
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const NavItems = () => (
    <>
      <li><Link href="#features" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Features</Link></li>
      <li><Link href="#testimonials" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Testimonials</Link></li>
      <li><Link href="#pricing" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Pricing</Link></li>
      {isSignedIn ? (
        <li><UserButton afterSignOutUrl="/" /></li>
      ) : (
        <>
          <li>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-white hover:bg-primary-foreground">Sign In</Button>
            </SignInButton>
          </li>
          <li>
            <SignUpButton mode="modal">
              <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">Sign Up</Button>
            </SignUpButton>
          </li>
        </>
      )}
    </>
  )

  return (
    <main className="flex-1 overflow-y-auto p-0">
      <div className="min-h-screen flex flex-col">
        <header className="bg-primary text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Navy%20Blue%20and%20Blue,%20Typographic%20and%20Strong,%20Security%20Brand%20Logo-a4myKTB52Q2oKrM2GqsHZLGADmThzP.png"
                alt="FraudGuard Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">FraudGuard AI</span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-4 items-center">
                <NavItems />
              </ul>
            </nav>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {isMenuOpen && (
          <nav className="md:hidden bg-primary text-white py-4">
            <ul className="flex flex-col space-y-4 items-center">
              <NavItems />
            </ul>
          </nav>
        )}

        <main>
          <section className="bg-gradient-to-b from-primary to-primary-foreground text-white py-20">
            <div className="container mx-auto text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
                  Protect Your Financial Future with FraudGuard AI
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  Advanced AI-powered fraud detection for businesses of all sizes
                </p>
                {isSignedIn ? (
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-gray-100"
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard <ArrowRight className="ml-2" />
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                      Get Started <ArrowRight className="ml-2" />
                    </Button>
                  </SignInButton>
                )}
              </motion.div>
            </div>
          </section>

          <section id="features" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose FraudGuard AI?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {feature.icon}
                          <span className="ml-2">{feature.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="testimonials" className="bg-gray-100 py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-lg mb-4">"{testimonial.quote}"</p>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
              <div className="flex justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Enterprise Plan</CardTitle>
                    <CardDescription className="text-center">Customized for your business needs</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-4xl font-bold mb-4">Contact Us</p>
                    <ul className="text-left mb-6">
                      <li className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Unlimited transactions
                      </li>
                      <li className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> 24/7 support
                      </li>
                      <li className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Custom AI model training
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Dedicated account manager
                      </li>
                    </ul>
                    <Button className="w-full">Request a Demo</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white py-20">
            <div className="container mx-auto text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Secure Your Business?</h2>
              <p className="text-lg md:text-xl mb-8">Join thousands of businesses trusting FraudGuard AI</p>
              <Card className="w-full max-w-[380px] mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-primary">
                    <Shield className="mr-2" /> Secure Access
                  </CardTitle>
                  <CardDescription className="text-center">
                    {isSignedIn ? "Welcome back!" : "Sign in to access your account"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  {isSignedIn ? (
                    <div className="text-center">
                      <p className="mb-4">You're signed in. Ready to protect your business?</p>
                      <Button onClick={() => router.push('/dashboard')} className="w-full">
                        Go to Dashboard
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <SignInButton mode="modal">
                        <Button className="w-full">Sign In</Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button variant="outline" className="w-full">Sign Up</Button>
                      </SignUpButton>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
            <div className="mb-4 md:mb-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Navy%20Blue%20and%20Blue,%20Typographic%20and%20Strong,%20Security%20Brand%20Logo-a4myKTB52Q2oKrM2GqsHZLGADmThzP.png"
                alt="FraudGuard Logo"
                width={40}
                height={40}
                className="rounded-full inline-block mr-2"
              />
              <span className="text-xl font-bold">FraudGuard AI</span>
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center space-x-4">
                <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="#" className="hover:underline">Contact Us</Link></li>
              </ul>
            </nav>
          </div>
          <div className="container mx-auto mt-4 text-center text-sm px-4">
            <p>&copy; 2024 FraudGuard AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}