
import { cn } from "@/lib/utils";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  className?: string;
  onToggle?: () => void;
}

const FAQItem = ({ 
  question, 
  answer, 
  isOpen = false,
  className,
  onToggle
}: FAQItemProps) => {
  const [open, setOpen] = useState(isOpen);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    if (onToggle) onToggle();
  };

  return (
    <div 
      className={cn(
        "border-b border-gms-gold/20 py-4",
        className
      )}
    >
      <button 
        className="flex justify-between w-full text-left items-center focus:outline-none"
        onClick={handleToggle}
      >
        <h3 className="text-lg font-medium text-gms-brown">{question}</h3>
        <div className="flex-shrink-0 ml-4">
          {open ? (
            <MinusIcon className="h-5 w-5 text-gms-gold" />
          ) : (
            <PlusIcon className="h-5 w-5 text-gms-gold" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
