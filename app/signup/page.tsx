"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Login page ku poga link
import styles from './Signup.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Supabase Register Logic
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Success!
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push('/login'); // 2 second la login page ku pogum
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Account</h1>
      <p className={styles.subtitle}>Sign up to start checking weather</p>

      {/* Error or Success message */}
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSignup}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            className={styles.input}
            placeholder="arun@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {/* Login Page Link */}
      <p className={styles.linkText}>
        Already have an account? <Link href="/login" className={styles.link}>Log In</Link>
      </p>
    </div>
  );
}