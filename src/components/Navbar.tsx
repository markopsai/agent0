'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from '@/lib/auth-client'

export default function Navbar() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Starter App</span>
          </Link>

          <div className="flex items-center space-x-3">
            {isPending ? (
              <div className="h-10 w-24 bg-gray-100/60 backdrop-blur-sm animate-pulse rounded-xl"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <Link href="/app">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="glass" size="sm" onClick={handleSignOut} className="rounded-lg">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth">
                  <Button size="sm" className="rounded-lg">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
