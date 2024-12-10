import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-full p-6 flex flex-col items-center justify-center gap-8 leading-relaxed text-center max-w-xl mx-auto">
        <div className="w-[120px] md:w-[120px] aspect-square flex items-center justify-center">
          <Image
            className="rounded-full w-full h-full object-cover"
            src="/images/mascot.png"
            width={120}
            height={120}
            alt="Mascot - Sammie"
            priority
          />
        </div>
        <p className="text-lg md:text-xl font-medium">
          Hello there! Sammie is here. <br/>How can I help you today?
        </p>
      </div>
    </motion.div>
  );
};
