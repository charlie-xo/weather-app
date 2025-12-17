"use client"; // Line 1: Idhu romba mukkiyam!

import { useEffect, useState } from "react";
// Change 1: Supabase ku '@' use panrom (Idhu safe)
import { supabase } from "@/lib/supabaseClient"; 
import Link from "next/link";
// Change 2: '..' ku pathila '.' use panrom (Key Change!)
import WeatherSearch from "./components/WeatherSearch"; 

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      // Session iruka nu check panrom
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  // User Login PANNALA na
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
        <h1 className="text-4xl font-bold mb-8 text-white-900">Weather App 🌦️</h1>
        <p className="mb-8 text-gray-">Please login to access the dashboard</p>
        
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition">
            Go to Login Page
          </button>
        </Link>
      </div>
    );
  }

  // User Login PANNIRUNDHA
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b pb-4 bg-blue-100 p-4 rounded-lg shadow">
            <div >
              <h1 className="text-2xl font-bold text-gray-800 ">Welcome Back! 👋</h1>
              <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>
            
            <button
                onClick={async () => {
                    await supabase.auth.signOut();
                    setSession(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition hover:scale-105"
            >
                Logout
            </button>
        </div>

        {/* Weather Component Inga Varum */}
        <WeatherSearch />
      </div>
    </div>
  );
}