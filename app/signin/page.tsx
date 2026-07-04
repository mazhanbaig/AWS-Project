'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { signIn, isConfigured } from '@/lib/cognito';
import type { CognitoError } from '@/types';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isConfigured()) {
    return (
      <div className="container-wide py-24">
        <Card className="max-w-md mx-auto text-center">
          <h1 className="text-xl font-semibold text-surface-900 mb-4">No Cognito User Pool Configured</h1>
          <p className="text-sm text-surface-500">
            There is no user pool configured in{' '}
            <code className="text-brand-600 text-xs">lib/aws-config.ts</code>.
            You&apos;ll configure this in Module 2 of the workshop.
          </p>
        </Card>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/ride');
    } catch (err) {
      const cognitoErr = err as CognitoError;
      setError(cognitoErr.message || 'Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-wide py-24">
      <Card className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-surface-900">Welcome back</h1>
          <p className="text-sm text-surface-500 mt-2">
            Sign in to your Wild Rydes account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Sign in
          </Button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-brand-600 hover:text-brand-700 font-medium">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
