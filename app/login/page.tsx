"use client"; // Interactive page, so Client Component

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Namma create panna client
import { useRouter } from 'next/navigation'; // Page matha
import styles from './Login.module.css'; // CSS Import

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Supabase kitta Login panna solrom
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message); // Thappa irundha error kaatum
    } else {
      router.push('/'); // Success aana Home page ku pogum
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>Weather App Login</h1>
      <p className={styles.subtitle}>Please sign in to check the climate</p>

      {/* Error vandha red box kaatum */}
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleLogin}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

       <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      {/* Indha Link-a pudhusa add pannunga */}
      <p style={{ marginTop: '20px', color: '#666' }}>
        Don't have an account? <a href="/signup" style={{ color: 'blue', fontWeight: 'bold' }}>Sign Up</a>
      </p>

    </div>
  );
}