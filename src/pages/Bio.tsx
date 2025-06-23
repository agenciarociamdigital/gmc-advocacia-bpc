import { motion } from "framer-motion";
import { Scale, Star, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";

const Bio = () => {
  const links = [
    {      title: "Chame no WhatsApp",
      description: "Fale conosco agora mesmo",
      icon: <img src="/lovable-uploads/whatsapp-svgrepo-com.svg" alt="WhatsApp" className="h-6 w-6" />,
      url: "https://wa.me/554331425888?text=Olá,%20vim%20através%20do%20link%20da%20bio%20e%20gostaria%20de%20falar%20sobre%20o%20BPC/LOAS",
      color: "bg-green-500 hover:bg-green-600",
      external: true
    },
    {
      title: "BPC LOAS",
      description: "Saiba mais sobre o benefício",
      icon: <Scale className="h-6 w-6" />,
      url: "/",
      color: "bg-gms-brown hover:bg-gms-brown/90",
      external: false
    },    {
      title: "Nos Avalie no Google",
      description: "Deixe sua avaliação",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>,
      url: "https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review",
      color: "bg-blue-500 hover:bg-blue-600",
      external: true
    }
  ];

  return (
    <div className="min-h-screen bg-gms-light">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-5 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(/lovable-uploads/4667764a-da47-4493-820a-4b2a867779a5.png)`,
          backgroundBlendMode: 'overlay'
        }}
        aria-hidden="true"
      />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            {/* Logo */}
            <div className="w-32 mx-auto mb-6">
              <Logo />
            </div>
            
            {/* Title */}
            <h1 className="text-2xl font-bold text-gms-brown mb-2">
              Gaspar, Marques e Souza Advogados
            </h1>
            <p className="text-gray-600 mb-4">
              Somos especialistas em Direito Previdenciário, com foco especial em benefícios BPC/LOAS
            </p>
            
            {/* Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gms-gold/20">
              <p className="text-sm text-gms-brown">
                🏆 <span className="font-semibold">Premiado</span> como "Melhor Escritório de Advocacia de São Sebastião da Amoreira 2023"
              </p>
            </div>
          </motion.div>

          {/* Links */}
          <div className="space-y-4">
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`
                  block w-full ${link.color} text-white rounded-xl p-4 
                  transition-all duration-300 transform hover:scale-[1.02] 
                  hover:shadow-lg active:scale-[0.98] group
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {link.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  {link.external && (
                    <ExternalLink className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gms-gold/20">
              <p className="text-xs text-gray-600 mb-2">
                📍 Localização: Rua Prefeito Alfredo Luiz Batista, nº 444, Centro, São Sebastião da Amoreira, Paraná
              </p>
              
            </div>
            
            {/* Social proof */}
            <div className="mt-4 flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="h-4 w-4 text-gms-gold fill-current" 
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                5.0 • Clientes satisfeitos
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
