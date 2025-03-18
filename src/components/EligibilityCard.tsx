
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface EligibilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const EligibilityCard = ({ 
  title, 
  description, 
  icon,
  className
}: EligibilityCardProps) => {
  return (
    <motion.div 
      className={cn(
        "elegance-card border-t-4 border-gms-gold",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-gms-gold mb-4 p-4 bg-gms-brown rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gms-brown">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default EligibilityCard;
