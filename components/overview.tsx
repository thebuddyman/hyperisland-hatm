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
      <div className="rounded-full p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <Image className="rounded-full" src="/images/mascot.png" width={100} height={100} alt="Mascot - Sammie"/>
        <p>
          Hello there!
        </p>
      </div>
    </motion.div>
  );
};
