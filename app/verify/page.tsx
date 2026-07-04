'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { verify, isConfigured } from '@/lib/cognito';
import type { CognitoError } from '@/types';

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    try {
      await verify(email, code);
      setSuccess('Verification successful. You will now be redirected to the login page.');
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } catch (err) {
      const cognitoErr = err as CognitoError;
      setError(cognitoErr.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-wide py-24">
      <Card className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-surface-900">Verify your email</h1>
          <p className="text-sm text-surface-500 mt-2">
            Enter the verification code sent to your email.
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
            label="Verification Code"
            type="text"
            placeholder="Enter your verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-600">
              {success}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Verify
          </Button>
        </form>
      </Card>
    </div>
  );
}
