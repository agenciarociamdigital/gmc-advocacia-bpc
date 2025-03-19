import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EligibilityCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  imageSrc?: string; // Optional image source
  imageAlt?: string; // Optional image alt text
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
      <div className="flex flex-col items-center text-center">
        <div className="text-gms-gold mb-4 p-4 bg-gms-brown rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gms-brown">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        {/* Image container with centering and appropriate sizing */}
        {imageSrc && (
          <div className="mt-auto flex justify-center">
            <img 
              src={imageSrc} 
              alt={imageAlt || title} 
              className="rounded-lg object-cover w-full max-w-[200px] h-auto shadow-md"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EligibilityCard;
