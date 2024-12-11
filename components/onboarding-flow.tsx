import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const optionsConfig = [
  { id: 'orientation', label: 'Orientation', icon: '🎯' },
  { id: 'tasks', label: 'Job Tasks', icon: '📋' },
  { id: 'resources', label: 'Finding Resources', icon: '📚' },
  { id: 'communication', label: 'Communication', icon: '💬' }
];

interface OnboardingStepProps {
  title: string;
  message: React.ReactNode;
  ctaText: string;
  onNext: () => void;
  showOptions?: boolean;
  currentStep: number;
  totalSteps: number;
  selectedOptions: string[];
  onOptionSelect?: (optionId: string) => void;
  isNextEnabled?: boolean;
}

const OnboardingStep = ({
  title,
  message,
  ctaText,
  onNext,
  showOptions = false,
  currentStep,
  totalSteps,
  selectedOptions,
  onOptionSelect,
  isNextEnabled = true
}: OnboardingStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center max-w-xl mx-auto text-center p-8"
  >
    <div className="mb-8">
      <Image
        src="/images/mascot.png"
        width={120}
        height={120}
        alt="Sammie the Hedgehog"
        className="rounded-full"
        priority
      />
    </div>

    <h2 className="text-2xl font-bold mb-4 text-foreground">{title}</h2>
    
    <div className="mb-8 text-lg text-foreground/80">
      {message}
      
      {showOptions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {optionsConfig.map((option) => (
            <Button
              key={option.id}
              variant={selectedOptions.includes(option.id) ? "default" : "outline"}
              className="p-4 h-auto flex flex-col gap-2 items-center justify-center text-lg relative"
              onClick={() => onOptionSelect?.(option.id)}
            >
              <span className="text-2xl">{option.icon}</span>
              {option.label}
              {selectedOptions.includes(option.id) && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 text-sm rounded-full size-5 flex items-center justify-center"
                >
                  ✓
                </motion.span>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>

    <div className="space-y-4 w-full max-w-sm">
      <Button 
        onClick={onNext}
        className="w-full py-6 text-lg"
        size="lg"
        disabled={!isNextEnabled}
      >
        {ctaText}
      </Button>
      
      <div className="flex gap-2 justify-center mt-6">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div
            key={idx}
            className={`size-2 rounded-full transition-colors ${
              idx === currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const steps = [
    {
      title: "Welcome to Samhall! 👋",
      message: "Hi there! I'm Sammi, your personal guide at Samhall. I'm here to help with anything you need!",
      ctaText: "Get started →",
    },
    {
      title: "You're Not Alone 🤗",
      message: "I know starting something new can feel like a lot, but don't worry—you're not alone. I'm here to guide you every step of the way.",
      ctaText: "That's wonderful →",
    },
    {
      title: "How I Can Help You 💪",
      message: (
        <div className="space-y-4">
          <p>Here&apos;s how I can help:</p>
          <ul className="list-none text-left space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Answer your questions quickly
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Show you where to find resources
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Help you with tasks and processes
            </li>
          </ul>
        </div>
      ),
      ctaText: "Awesome →",
    },
    {
      title: "Let's Personalize Your Experience 🎯",
      message: "What would you like help with? (Select all that apply)",
      ctaText: "Continue →",
      showOptions: true,
      isNextEnabled: selectedOptions.length > 0,
    },
    {
      title: "All Set! 🎉",
      message: (
        <div className="space-y-4">
          <p>
            Thank you for letting me know! I&apos;m here whenever you need help with:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedOptions.map((optionId) => {
              const option = optionsConfig.find(opt => opt.id === optionId);
              return option && (
                <span 
                  key={optionId} 
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {option.icon} {option.label}
                </span>
              );
            })}
          </div>
        </div>
      ),
      ctaText: "Start chatting →",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <OnboardingStep
          key={step}
          {...steps[step]}
          onNext={handleNext}
          currentStep={step}
          totalSteps={steps.length}
          selectedOptions={selectedOptions}
          onOptionSelect={handleOptionSelect}
          isNextEnabled={!steps[step].showOptions || selectedOptions.length > 0}
        />
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;