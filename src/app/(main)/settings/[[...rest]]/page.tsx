"use client"

import { UserProfile } from "@clerk/nextjs"

export default function Settings() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Account Settings</h1>
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <UserProfile />
      </div>
    </div>
  )
}
