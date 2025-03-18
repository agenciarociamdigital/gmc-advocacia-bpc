
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  isLast?: boolean;
}

const ProcessStep = ({ 
  number, 
  title, 
  description, 
  icon,
  className,
  isLast = false
}: ProcessStepProps) => {
  return (
    <motion.div 
      className={cn("flex relative", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-14 h-full w-0.5 bg-gms-gold/30"></div>
      )}
      
      {/* Number circle */}
      <div className="flex-shrink-0 z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gms-gold text-gms-brown font-bold text-xl">
          {number}
        </div>
      </div>
      
      {/* Content */}
      <div className="ml-6">
        <div className="mb-1 text-gms-gold">
          {icon}
        </div>
        <h4 className="text-lg font-bold mb-2 text-gms-brown">{title}</h4>
        <p className="text-gray-600 mb-8">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProcessStep;
