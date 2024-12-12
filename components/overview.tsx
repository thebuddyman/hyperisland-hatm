"use client";

import { useLanguage } from '@/components/context/language-context';
import { getTranslation } from '@/lib/translations';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Overview = () => {
  const { language } = useLanguage(); // Access global language context

  // Get translations for both pieces of text
  const greeting = getTranslation(language, 'overview.greeting');
  const helpText = getTranslation(language, 'overview.helpText');

  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-full px-6 pb-6 pt-10 flex flex-col items-center justify-center gap-8 leading-relaxed text-center max-w-xl mx-auto">
        <div className="w-[300px] md:w-[300px] aspect-square flex items-center justify-center">
          <Image
            className="rounded-full w-full h-full object-cover"
            src="/images/mascot2.png"
            width={240}
            height={240}
            alt="Mascot - Sammie"
            priority
          />
        </div>
        <p className="text-lg md:text-xl font-medium">
          {greeting} <br />
          {helpText}
        </p>
      </div>
    </motion.div>
  );
};