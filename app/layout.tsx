"use client";

import './globals.css'
import Navbar from "./components/Navbar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen place-items-center bg-slate-900 text-slate-400 desktop">
          {children}
        </main>
        <p className='mobile mt-10 text-center text-2xl'>Please switch to laptop mode for better Visuals</p>
      </body>
    </html>
  )
}
