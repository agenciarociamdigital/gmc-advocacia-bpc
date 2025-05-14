import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

// Debounce utility function to limit webhook calls
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface LeadFormProps {
  className?: string;
}

const LeadForm = ({ className }: LeadFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [clientType, setClientType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // Webhook URL
  const webhookUrl = "https://services.leadconnectorhq.com/hooks/twiyIpX5OYy0CPHGkznE/webhook-trigger/7f37b9f6-dfc5-4fe1-8337-a6f67bdbe7ab";

  // Function to send data to CRM webhook
  const sendToCRM = useCallback(async (formData: { name: string, phone: string, clientType: string }) => {
    if (!formData.name && !formData.phone) return; // Don't send if both are empty
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone.replace(/\D/g, ""),
          clientType: formData.clientType === 'elderly' ? 'Idoso (65+ anos)' : 
                    formData.clientType === 'disabled' ? 'Pessoa com Deficiência' : '',
          formStatus: 'in_progress' // Flag to indicate real-time update
        })
      });
      
      if (response.ok) {
        console.log("Real-time data sent to CRM");
      } else {
        console.error("Failed to send real-time data to CRM:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending real-time data to CRM:", error);
    }
  }, [webhookUrl]);
  
  // Create debounced version of the sendToCRM function (500ms delay)
  const debouncedSendToCRM = useCallback(debounce(sendToCRM, 500), [sendToCRM]);
  
  // Effect to track changes in form fields and send data to CRM
  useEffect(() => {
    if (submitted) return; // Don't send real-time updates after form is submitted
    
    debouncedSendToCRM({
      name,
      phone,
      clientType
    });
  }, [name, phone, clientType, debouncedSendToCRM, submitted]);

  // Phone mask function to format: (DDD) 9XXXX-XXXX
  const applyPhoneMask = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Apply the mask based on the number of digits
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    } else {
      // Limit to maximum length
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(applyPhoneMask(value));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Normally would send this data to a backend
    console.log("Form submitted:", { name, phone, clientType });
    
    // Here we'll simulate a successful submission
    setSubmitted(true);
    
    // Send data to CRM webhook with completed status
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone: phone.replace(/\D/g, ""), // Send phone without formatting
          clientType: clientType === 'elderly' ? 'Idoso (65+ anos)' : 'Pessoa com Deficiência',
          formStatus: 'completed' // Flag to indicate final submission
        })
      });
      
      if (response.ok) {
        console.log("Lead data successfully sent to CRM");
      } else {
        console.error("Failed to send lead data to CRM:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending lead data to CRM:", error);
    }
    
    // Redirect to WhatsApp with standardized message
    setTimeout(() => {
      // Formatando a mensagem com os dados do usuário
      const baseMessage = "Olá, eu vim do site e quero ajuda com o meu direito BPC LOAS";
      const userInfo = `\n\nNome: ${name}\nTelefone: ${phone}\nTipo: ${clientType === 'elderly' ? 'Idoso (65+ anos)' : 'Pessoa com Deficiência'}`;
      const completeMessage = baseMessage + userInfo;
      
      // Usando a URL padrão do WhatsApp (wa.me)
      const finalUrl = `https://wa.me/554331425888?text=${encodeURIComponent(completeMessage)}`;
      console.log("Redirecting to WhatsApp with URL:", finalUrl);
      
      // Usando window.location para redirecionar na mesma página
      window.location.href = finalUrl;
    }, 1500);
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-xl p-6 md:p-8", className)}>
      {!submitted ? (
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gms-brown mb-4">Entre em contato, informe-se!</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gms-gold text-gray-800"
              placeholder="Digite seu nome"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp para contato
            </label>
            <div className="flex items-center">
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-l-md px-3 py-2">
                <div className="mr-1 w-5 h-4 bg-green-500 relative overflow-hidden rounded">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-300 transform rotate-45"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-1.5 h-1.5 bg-blue-800 rounded-full"></div>
                  </div>
                </div>
                <span className="text-gray-700 font-medium">+55</span>
              </div>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                required
                className="w-full px-4 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gms-gold text-gray-800"
                placeholder="(DDD) 9XXXX-XXXX"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de benefício
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setClientType("elderly")}
                className={cn(
                  "border rounded-md px-4 py-2 text-left transition-all text-gray-800",
                  clientType === "elderly" 
                    ? "border-gms-gold bg-gms-gold/10 text-gms-brown" 
                    : "border-gray-300 hover:border-gms-gold/50"
                )}
              >
                Para Idosos (65+ anos)
              </button>
              <button
                type="button"
                onClick={() => setClientType("disabled")}
                className={cn(
                  "border rounded-md px-4 py-2 text-left transition-all text-gray-800",
                  clientType === "disabled" 
                    ? "border-gms-gold bg-gms-gold/10 text-gms-brown" 
                    : "border-gray-300 hover:border-gms-gold/50"
                )}
              >
                Para Pessoas com Deficiência
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <WhatsAppButton 
              text="Avalie Seu Caso" 
              fullWidth
              size="lg"
              onClick={handleSubmit}
              className="py-7 text-xl"
              noEffects={true}
            />
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            Suas informações estão seguras e não serão compartilhadas com terceiros.
          </p>
        </motion.form>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gms-brown mb-2">Recebemos sua solicitação!</h3>
          <p className="text-gray-600 text-center mb-6">
            Em instantes você será redirecionado para nosso WhatsApp para continuar o atendimento.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default LeadForm;
