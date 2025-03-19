import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EligibilityCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

const EligibilityCard = ({ 
  title, 
  description, 
  icon,
  imageSrc,
  imageAlt,
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
      <div className="relative h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      <div className="p-6 bg-white">
        <div className="flex items-center mb-4">
          <div className="mr-3 text-gms-gold bg-gms-gold/10 p-2 rounded-md">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gms-brown">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default EligibilityCard;
