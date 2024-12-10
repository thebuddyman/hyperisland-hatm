'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OnboardingFlow from '@/components/onboarding-flow';

export default function OnboardingPage() {
  const router = useRouter();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if user should see onboarding
    const isFirstTime = localStorage.getItem('sammie-first-time');
    if (isFirstTime === 'true') {
      setShouldShow(true);
    } else {
      // If not a first-time user, redirect to chat
      router.push('/');
    }
  }, [router]);

  if (!shouldShow) {
    return null;
  }

  return (
    <OnboardingFlow
      onComplete={() => {
        localStorage.removeItem('sammie-first-time');
        router.push('/');
      }}
    />
  );
}