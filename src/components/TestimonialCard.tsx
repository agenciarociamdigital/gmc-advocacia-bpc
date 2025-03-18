
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  benefit?: string;
  className?: string;
}

const TestimonialCard = ({ 
  quote, 
  name, 
  location, 
  benefit,
  className
}: TestimonialCardProps) => {
  return (
    <motion.div 
      className={cn(
        "elegance-card border border-gms-gold/20 p-6 md:p-8",
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <QuoteIcon className="text-gms-gold h-8 w-8 mb-4 opacity-50" />
      <p className="italic text-gray-700 mb-6">{quote}</p>
      <div className="flex flex-col">
        <span className="font-bold text-gms-brown">{name}</span>
        <span className="text-sm text-gray-500">{location}</span>
        {benefit && (
          <span className="mt-2 text-sm bg-gms-gold/10 text-gms-brown px-3 py-1 rounded-full inline-block w-fit">
            Benefício: {benefit}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
