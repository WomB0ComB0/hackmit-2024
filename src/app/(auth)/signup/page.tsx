"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the signup logic
    console.log("Signup attempt", { name, email, password });
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-blue-900">Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-blue-700">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-blue-300"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-blue-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-blue-300"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-blue-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-blue-300"
                />
              </div>
            </div>
            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-blue-600"
            onClick={() => router.push("/login")}
          >
            Already have an account? Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
