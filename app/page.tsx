"use client";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "tabs";
import { motion } from "framer-motion";
import { Lock, LogIn, Mail, Shield, User, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    router.push("/dashboard");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Navy%20Blue%20and%20Blue,%20Typographic%20and%20Strong,%20Security%20Brand%20Logo-a4myKTB52Q2oKrM2GqsHZLGADmThzP.png"
          alt="FraudGuard Logo"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
          FraudGuard AI
        </h1>
        <p className="text-xl text-blue-100">
          Protecting Your Financial Future
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="w-[350px] bg-white/10 backdrop-blur-md border-blue-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center">
              <Shield className="mr-2 text-blue-300" /> Secure Access
            </CardTitle>
            <CardDescription className="text-center text-blue-100">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-blue-800/50">
                <TabsTrigger
                  value="login"
                  onClick={() => setIsLogin(true)}
                  className="text-white data-[state=active]:bg-blue-600"
                >
                  <LogIn className="mr-2" /> Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  onClick={() => setIsLogin(false)}
                  className="text-white data-[state=active]:bg-blue-600"
                >
                  <UserPlus className="mr-2" /> Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email" className="text-blue-100">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-blue-300" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-8 bg-blue-800/30 border-blue-300 text-white placeholder-blue-200"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password" className="text-blue-100">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-blue-300" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-8 bg-blue-800/30 border-blue-300 text-white placeholder-blue-200"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                    type="submit"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name" className="text-blue-100">
                        Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-blue-300" />
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          className="pl-8 bg-blue-800/30 border-blue-300 text-white placeholder-blue-200"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email" className="text-blue-100">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-blue-300" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-8 bg-blue-800/30 border-blue-300 text-white placeholder-blue-200"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password" className="text-blue-100">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-blue-300" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-8 bg-blue-800/30 border-blue-300 text-white placeholder-blue-200"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                    type="submit"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-blue-100">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                className="text-blue-300 pl-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Why Choose FraudGuard AI?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              title: "Advanced AI",
              description: "Cutting-edge fraud detection",
            },
            {
              title: "Real-time Monitoring",
              description: "24/7 transaction surveillance",
            },
            {
              title: "Easy Integration",
              description: "Seamless setup for your systems",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-4 rounded-lg w-64"
            >
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
