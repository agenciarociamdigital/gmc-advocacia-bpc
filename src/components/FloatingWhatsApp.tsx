import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(true);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    // Set up pulsing animation interval with longer duration
    const pulseInterval = setInterval(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 3000);
    }, 15000); // Increased to 15 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleClick = () => {
    const fixedMessage = "Olá, eu vim do site e quero ajuda com o meu direito BPC LOAS";
    const finalUrl = `https://wa.me/554331425888?text=${encodeURIComponent(fixedMessage)}`;
    console.log("Opening WhatsApp with URL:", finalUrl);
    
    // Abrindo em nova aba para evitar problemas de redirecionamento
    window.open(finalUrl, "_blank");
  };

  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        className="relative"
        animate={pulsing ? { scale: [1, 1.05, 1] } : { scale: 1 }} // Reduced scale effect
        transition={{ duration: 2, repeat: pulsing ? 1 : 0 }} // Slowed down and reduced repetitions
      >
        <motion.div
          className="absolute -inset-4 bg-green-500 rounded-full opacity-20" // Reduced opacity
          animate={{ scale: pulsing ? [1, 1.3, 1] : 1, opacity: pulsing ? [0.2, 0, 0.2] : 0.2 }} // Reduced scale effect
          transition={{ duration: 2, repeat: pulsing ? 1 : 0 }} // Slowed down and reduced repetitions
        />
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {/* WhatsApp logo SVG */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="h-12 w-12"
            fill="white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      </motion.div>
      <div className="absolute top-0 right-16 bg-white p-3 rounded-lg shadow-md text-sm font-medium text-gray-700 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
        Fale conosco pelo WhatsApp
      </div>
    </motion.div>
  );
};

export default FloatingWhatsApp;
