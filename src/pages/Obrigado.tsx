import { motion } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { useEffect } from "react";

const Obrigado = () => {
  useEffect(() => {
    // Set page title
    document.title = "Obrigado! | GMS Advocacia - Gaspar, Marques & Souza";
  }, []);

  return (
    <div className="min-h-screen bg-gms-light flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-5 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(/lovable-uploads/4667764a-da47-4493-820a-4b2a867779a5.png)`,
          backgroundBlendMode: 'overlay'
        }}
        aria-hidden="true"
      />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Logo */}
          <div className="w-32 mx-auto mb-8">
            <div className="rounded-xl overflow-hidden">
              <Logo />
            </div>
          </div>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gms-brown mb-4"
          >
            Obrigado!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Seu cadastro foi realizado com sucesso!
          </motion.p>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gms-brown/5 rounded-lg p-6 mb-8 border-l-4 border-gms-gold"
          >
            <div className="flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-gms-gold mr-3" />
              <h2 className="text-2xl font-bold text-gms-brown">
                Nossos advogados vão lhe chamar na sequência
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Recebemos suas informações e nossa equipe especializada em BPC/LOAS 
              entrará em contato com você em breve para uma avaliação gratuita do seu caso.
            </p>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4 text-sm text-gray-600"
          >
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-medium text-yellow-800">
                ⏰ <strong>Tempo de resposta:</strong> Nossos advogados entram em contato em até 24 horas úteis.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-medium text-blue-800">
                📞 <strong>Atenção:</strong> Certifique-se de que seu telefone esteja disponível para receber nossa ligação.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-medium text-green-800">
                💰 <strong>Sem custos:</strong> A avaliação é 100% gratuita e você só paga se conseguir o benefício.
              </p>
            </div>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8"
          >
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-gms-brown text-white font-semibold rounded-lg hover:bg-gms-brown/90 transition-colors duration-300"
            >
              Voltar ao Início
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Obrigado;
