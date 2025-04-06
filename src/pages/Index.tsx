import { useEffect, useState, useRef, lazy, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Scroll, Calendar, ClipboardList, ArrowRight, Award, Clock, Check, UserCheck, HelpCircle, Briefcase, User, UserPlus, ShieldCheck, Lock, ChevronLeft, ChevronRight } from "lucide-react";

// Components
import Logo from "@/components/Logo";
import WhatsAppButton from "@/components/WhatsAppButton";
// Lazy load non-critical components
const EligibilityCard = lazy(() => import("@/components/EligibilityCard"));
const ProcessStep = lazy(() => import("@/components/ProcessStep"));
const TestimonialCard = lazy(() => import("@/components/TestimonialCard"));
const FAQItem = lazy(() => import("@/components/FAQItem"));
import LeadForm from "@/components/LeadForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";
import ActivityNotification from "@/components/ActivityNotification";

// Global CSS for scrollbar
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #D4AF37;
    border-radius: 6px;
    border: 3px solid #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: #c4a032;
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: #D4AF37 #f1f1f1;
  }
`;

const Index = () => {
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(false);
  const quemTemDireitoRef = useRef<HTMLElement>(null);
  const [vagasRestantes, setVagasRestantes] = useState(20);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Updated array with only images from the public directory
  const officeImages = [
    
    {
      src: "/img2_equipe_bpcloas.jpeg",
      alt: "Escritório GMS Advocacia"
    },
    {
      src: "/img3_bpcloas.jpeg",
      alt: "Equipe GMS Advocacia"
    },
    {
      src: "/logo.jpeg", // Fixed the image path to follow the same naming convention
      alt: "Equipe GMS Advocacia"
    }
  ];
  
  // Function to handle automatic slide change
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % officeImages.length);
  }, [officeImages.length]);
  
  // Set up auto-rotation for the carousel
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    
    return () => {
      clearInterval(slideInterval);
    };
  }, [nextSlide]);

  useEffect(() => {
    // Add scrollbar styles to head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = scrollbarStyles;
    document.head.appendChild(styleElement);

    // Set page title
    document.title = "BPC/LOAS | GMS Advocacia - Gaspar, Marques & Souza";

    // Function to check if section is visible or has been scrolled past
    const handleScroll = () => {
      if (quemTemDireitoRef.current) {
        const sectionRect = quemTemDireitoRef.current.getBoundingClientRect();
        
        // Check if the section is currently visible or has been scrolled past
        if (sectionRect.top < window.innerHeight) {
          // Once visible, always keep the button visible
          setShowFloatingWhatsApp(true);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check (in case the section is visible on load)
    handleScroll();

    // Gerar um número aleatório entre 5 e 20 para vagas restantes
    setVagasRestantes(Math.floor(Math.random() * 16) + 5);

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gms-light overflow-hidden">
      {/* Back to Top Button */}
      <BackToTop />
      
      {/* Activity Notification - Positioned as fixed element */}
      <ActivityNotification />
      
      {/* Fixed Top Banner */}
      <div className="fixed top-0 left-0 w-full bg-[#00001f]/80 text-white z-50 py-3 px-4 text-center shadow-lg backdrop-blur-md backdrop-saturate-150">
        <p className="text-base md:text-xl font-bold animate-pulse flex items-center justify-center flex-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>TEM 65 ANOS OU MAIS?</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </p>
      </div>
      
      {/* Add padding to account for the fixed banner */}
      <div className="pt-12">
        {showFloatingWhatsApp && <FloatingWhatsApp />}
        
        {/* Hero Section - optimized */}
        <section className="relative bg-gms-brown text-white">
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(/lovable-uploads/4667764a-da47-4493-820a-4b2a867779a5.png)`, 
              backgroundBlendMode: 'overlay',
              filter: 'grayscale(50%)',
              // Add background color for better LCP before image loads
              backgroundColor: '#3c2a20' 
            }}
            aria-hidden="true"
          />
          <div className="gms-container relative z-10 py-8 md:py-12 lg:py-16 px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Logo removed from here */}
                  <div className="relative mb-2 text-center md:text-left">
                    <div className="inline-block bg-gms-gold/10 px-3 py-1.5 rounded-sm border-l-4 border-gms-gold">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center"
                      >
                        <span className="h-2 w-2 rounded-full bg-gms-gold mr-2"></span>
                        <span className="text-gms-gold font-semibold tracking-wider uppercase text-sm">
                          Benefício BPC/LOAS
                        </span>
                        <span className="h-2 w-2 rounded-full bg-gms-gold ml-2"></span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-center md:text-left">
                    <span className="block md:inline">Você Pode Ter Direito A </span>
                    <span className="text-gms-gold whitespace-normal md:whitespace-nowrap">R$ 1.518,00 Mensais</span>
                    <span className="block md:inline"> Do Governo.</span>
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-5 opacity-80 text-center md:text-left">
                    Idosos acima de 65 anos ou pessoas com deficiência de baixa renda podem ter direito ao BPC/LOAS. Descubra se você é elegível.
                  </p>
                  
                  {/* Adicionar banner de pagamento apenas ao conseguir o benefício */}
                  <div className="bg-gms-gold/20 border border-gms-gold/30 rounded-md p-3 mb-5 flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-gms-gold flex-shrink-0" />
                    <p className="text-sm font-medium">
                      <span className="text-gms-gold font-bold">Não pague nada</span> até conseguir seu benefício. Avaliação 100% gratuita.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <WhatsAppButton text="Avalie Seu Caso Gratuitamente" />
                    <a 
                      href="#quem-tem-direito" 
                      className="primary-button border border-white/20 bg-transparent hover:bg-white/10 flex items-center justify-center gap-2 w-full sm:w-auto py-3 px-6 text-base font-medium"
                    >
                      Descubra Se Você Se Enquadra
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                className="hidden md:block max-w-md w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <LeadForm className="hover:scale-[1.01] transition-transform duration-300" />
                  
                  {/* Selo de segurança centralizado abaixo do formulário */}
                  <div className="absolute -bottom-4 left-0 right-0 mx-auto w-max bg-white/90 text-gms-brown px-4 py-1.5 rounded-md text-xs flex items-center gap-1 shadow-md">
                    <Lock className="h-3 w-3" />
                    Seus dados estão protegidos
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quem tem direito - Add Suspense for lazy loading */}
        <section ref={quemTemDireitoRef} id="quem-tem-direito" className="py-20 bg-white">
          <div className="gms-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gms-brown mb-4">
                  Quem tem direito ao BPC/LOAS?
                </h2>
                <div className="h-1 w-24 bg-gms-gold mx-auto mb-6"></div>
                <p className="text-lg text-gray-600">
                  O Benefício de Prestação Continuada (BPC) garante um salário mínimo por mês a quem se enquadra nos seguintes critérios:
                </p>
              </motion.div>
            </div>

            <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Carregando...</div>}>
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <EligibilityCard 
                  title="Idosos com 65 anos ou mais"
                  description="Pessoas com 65 anos ou mais que comprovem não possuir recursos financeiros para suas necessidades básicas."
                  icon={<User className="h-8 w-8" />}
                  imageSrc="/idosos.png"
                  imageAlt="Pessoa idosa elegível para BPC/LOAS"
                />
                <EligibilityCard 
                  title="Pessoas com Deficiência"
                  description="Pessoas com impedimentos de longo prazo de natureza física, mental, intelectual ou sensorial que não possuem recursos financeiros para custear suas necessidades básicas."
                  icon={<UserPlus className="h-8 w-8" />}
                  imageSrc="/deficientes.png"
                  imageAlt="Pessoa com deficiência elegível para BPC/LOAS"
                />
              </div>
            </Suspense>

            <motion.div
              className="bg-gms-brown/5 rounded-lg p-8 border-l-4 border-gms-gold text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gms-brown mb-4">
                Critério de Renda
              </h3>
              <p className="text-gray-700 mb-4">
                Para ter direito ao BPC/LOAS, a renda por pessoa do grupo familiar deve ser igual ou inferior a 1/4 do salário mínimo atual, o que equivale a aproximadamente R$ 379,50 por pessoa, mas existem exceções.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <WhatsAppButton text="Verifique Se Você Tem Direito" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Rest of the sections - Add Suspense for lazy-loaded components */}
        {/* Por que nos escolher */}
        <section className="py-20 bg-gms-brown text-white">
          <div className="gms-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Por que escolher a <span className="text-gms-gold">GMS Advocacia</span>?
                </h2>
                <div className="h-1 w-24 bg-gms-gold mx-auto mb-6"></div>
                <p className="text-lg opacity-80">
                  Somos especialistas em Direito Previdenciário, com foco especial em benefícios BPC/LOAS.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Award className="h-10 w-10" />,
                  title: "95% de Sucesso",
                  description: "Alta taxa de aprovação em processos de BPC/LOAS."
                },
                {
                  icon: <Users className="h-10 w-10" />,
                  title: "Atendimento Personalizado",
                  description: "Advocacia artesanal com foco na sua necessidade específica."
                },
                {
                  icon: <ShieldCheck className="h-10 w-10" />,
                  title: "Sem Custos Iniciais",
                  description: "Você só paga em caso de êxito no processo."
                },
                {
                  icon: <Briefcase className="h-10 w-10" />,
                  title: "Especialistas em BPC",
                  description: "Conhecimento aprofundado da legislação previdenciária."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-gms-gold/20 hover:border-gms-gold/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-gms-gold mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="opacity-80">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <div className="max-w-2xl text-center">
                <p className="text-lg italic opacity-80 mb-6">
                  "Nosso escritório é especializado em BPC/LOAS. A avaliação é gratuita e os serviços só serão cobrados em caso de aprovação do benefício."
                </p>
                <div className="flex justify-center">
                  <img 
                    src="/lovable-uploads/1b8f1c9c-786f-4333-aa31-a715dae06d62.png" 
                    alt="Equipe GMS Advocacia" 
                    className="w-64 h-48 rounded-lg object-contain bg-white/10 border-2 border-gms-gold"
                    loading="lazy"
                    width="256"
                    height="192"
                  />
                </div>
                <p className="mt-4 font-serif text-lg">Equipe GMS Advocacia</p>
                <p className="text-sm bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 bg-clip-text text-transparent font-medium">Premiada como "Melhor Escritório de Advocacia de São Sebastião da Amoreira 2023"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Processo de Atendimento */}
        <section className="py-20 bg-white">
          <div className="gms-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gms-brown mb-4">
                  Como funciona o processo?
                </h2>
                <div className="h-1 w-24 bg-gms-gold mx-auto mb-6"></div>
                <p className="text-lg text-gray-600">
                  Nosso processo é simples e transparente. Confira abaixo as etapas para conquistar seu benefício:
                </p>
              </motion.div>
            </div>

            <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center">Carregando processo...</div>}>
              <div className="max-w-3xl mx-auto">
                <ProcessStep 
                  number={1}
                  title="Avaliação Inicial"
                  description="Analisamos seu caso gratuitamente para verificar se você tem direito ao benefício."
                  icon={<ClipboardList className="h-6 w-6" />}
                />
                <ProcessStep 
                  number={2}
                  title="Coleta de Documentos"
                  description="Auxiliamos na reunião de todos os documentos necessários para o processo."
                  icon={<Scroll className="h-6 w-6" />}
                />
                <ProcessStep 
                  number={3}
                  title="Ingressamos com o pedido junto ao INSS"
                  description="Damos entrada no pedido junto ao INSS, preparando tudo conforme a legislação."
                  icon={<Check className="h-6 w-6" />}
                />
                <ProcessStep 
                  number={4}
                  title="Acompanhamento: "
                  description="Realizamos as intervenções e orientações necessárias."
                  icon={<Clock className="h-6 w-6" />}
                />
                <ProcessStep 
                  number={5}
                  title="Ação na Justiça Federal:"
                  description="Se necessário, nossa equipe é preparada para ingressar com ação na Justiça em busca da concessão do seu benefício."
                  icon={<Award className="h-6 w-6" />}
                  isLast
                />
              </div>
            </Suspense>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 mb-6">
                O tempo médio para conclusão do processo varia entre 9 a 18 meses, dependendo da complexidade e da região.
              </p>
              <WhatsAppButton text="Inicie Seu Processo Agora" />
            </motion.div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 bg-gms-brown/5">
          <div className="gms-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gms-brown mb-4">
                  O que dizem nossos clientes
                </h2>
                <div className="h-1 w-24 bg-gms-gold mx-auto mb-6"></div>
                <p className="text-lg text-gray-600">
                  Histórias reais de pessoas que conseguiram seu benefício com nossa ajuda.
                </p>
              </motion.div>
            </div>

            <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center">Carregando depoimentos...</div>}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard 
                  quote="A GMS Advocacia mudou minha vida. Eu não sabia que tinha direito ao BPC, e eles cuidaram de tudo. Agora recebo meu benefício mensalmente."
                  name="Maria Silva"
                  location="São Sebastião da Amoreira"
                  benefit="BPC/LOAS Idoso"
                />
                <TestimonialCard 
                  quote="Meu filho tem autismo e precisávamos do benefício. Tentamos sozinhos e foi negado. Com a GMS, conseguimos em menos de um ano."
                  name="João Oliveira"
                  location="Cornélio Procópio"
                  benefit="BPC/LOAS Deficiência"
                />
                <TestimonialCard 
                  quote="Profissionais competentes e atenciosos. Explicaram tudo com paciência e não cobraram nada até eu ganhar o processo."
                  name="Ana Paula Santos"
                  location="Nova América da Colina"
                  benefit="BPC/LOAS Idoso"
                />
              </div>
            </Suspense>
          </div>
        </section>

        {/* Documentos necessários */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="gms-container px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gms-brown mb-4">
                  Documentos Necessários
                </h2>
                <div className="h-1 w-24 bg-gms-gold mb-6"></div>
                <p className="text-lg text-gray-600 mb-6">
                  Para dar entrada no BPC/LOAS, você precisará dos seguintes documentos:
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Documentos de identificação (RG, CPF, CNH);",
                    "Comprovante de residência atual;",
                    "Comprovante de Endereço;",
                    "Cadastro Único Atualizado (com todos os membros da família);",
                    
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-5 w-5 rounded-full bg-gms-gold/20 flex items-center justify-center">
                          <Check className="h-3 w-3 text-gms-gold" />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700 break-words">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <p className="text-sm text-gray-500 italic mb-6">
                  Não se preocupe se você não tiver todos os documentos. Nossa equipe pode ajudar a obtê-los.
                </p>
                
                <WhatsAppButton text="Precisa De Ajuda Com Os Documentos?" />
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  {/* Image carousel replacing the single image */}
                  <div className="relative h-80">
                    {/* Carousel images */}
                    {officeImages.map((image, index) => (
                      <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-80 object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                          width="600"
                          height="320"
                        />
                      </div>
                    ))}
                    
                    {/* Navigation buttons */}
                    <button 
                      onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + officeImages.length) % officeImages.length)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors p-2 rounded-full text-white"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % officeImages.length)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors p-2 rounded-full text-white"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {officeImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentSlide ? "bg-white" : "bg-white/50"
                          }`}
                          aria-label={`Ver imagem ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-2xl font-bold text-gms-brown mb-4">
                      Conte com nossa experiência
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Nosso escritório tem mais de 2 anos de experiência em Direito Previdenciário, com foco especialmente em BPC/LOAS.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <UserCheck className="h-5 w-5 text-gms-gold" />
                      <span>Atendimento humanizado e personalizado.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dúvidas Frequentes */}
        <section className="py-20 bg-gms-brown/5 overflow-hidden">
          <div className="gms-container px-2 sm:px-6 max-w-full">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gms-brown mb-4">
                  Dúvidas Frequentes
                </h2>
                <div className="h-1 w-24 bg-gms-gold mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 px-4">
                  Esclarecemos as principais dúvidas sobre o BPC/LOAS.
                </p>
              </motion.div>
            </div>

            <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center">Carregando dúvidas frequentes...</div>}>
              <div className="max-w-3xl mx-auto px-4">
                <FAQItem 
                  question="Tenho direito ao BPC/LOAS?"
                  answer="O BPC/LOAS é destinado a idosos com 65 anos ou mais e pessoas com deficiência de qualquer idade, desde que comprovem baixa renda familiar."
                />
                <FAQItem 
                  question="Quanto preciso ganhar para ter direito ao BPC?"
                  answer="A renda por pessoa do grupo familiar deve ser igual ou inferior a 1/4 do salário mínimo atual, o que equivale a aproximadamente R$ 379,50 por pessoas, porém, existem exceções que poderão ser analisadas na avaliação."
                />
                <FAQItem 
                  question="Posso acumular o BPC/LOAS com outros benefícios?"
                  answer="Em regra, o BPC não pode ser acumulado com outros benefícios previdenciários. porém, existem exceções que poderão ser analisadas na avaliação."
                />
                <FAQItem 
                  question="Quanto tempo demora o processo do BPC?"
                  answer="O tempo médio varia entre 9 a 18 meses, dependendo da complexidade do caso, da região e da necessidade ou não de judicialização do pedido."
                />
                <FAQItem 
                  question="Quais são os custos para dar entrada no BPC/LOAS?"
                  answer="Em nosso escritório, você não paga nada adiantado. Cobramos honorários apenas em caso de êxito, quando você começar a receber o benefício. Os valores são negociados previamente e com total transparência."
                />
                <FAQItem 
                  question="Se eu for negado pelo INSS, posso recorrer?"
                  answer="Sim. Caso seu pedido seja negado administrativamente pelo INSS, é possível recorrer judicialmente. Nossa equipe está preparada para representá-lo em todas as instâncias necessárias."
                />
              </div>
            </Suspense>

            <div className="mt-12 text-center px-4">
              <p className="text-gray-600 mb-6">
                Tem outras dúvidas que não foram respondidas aqui?
              </p>
              <WhatsAppButton text="Fale Com Um Especialista" />
            </div>
          </div>
        </section>

        {/* CTA Final - adicionar selo de segurança e contador de vagas */}
        <section className="py-12 sm:py-20 bg-gms-brown text-white overflow-hidden">
          <div className="w-full max-w-full px-4 sm:px-6 overflow-visible">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  Não perca a oportunidade de garantir seu direito ao BPC/LOAS
                </h2>
                <p className="text-lg sm:text-xl opacity-80 mb-6">
                  Preencha o formulário e receba uma avaliação gratuita do seu caso. Nossos especialistas estão prontos para ajudar.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <HelpCircle className="h-5 w-5 text-gms-gold" />
                    </div>
                    <p className="ml-3 opacity-80 text-sm sm:text-base">
                      <strong className="text-gms-gold">Sem compromisso:</strong> Avaliamos seu caso sem a obrigação de nos contratar.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MessageSquare className="h-5 w-5 text-gms-gold" />
                    </div>
                    <p className="ml-3 opacity-80 text-sm sm:text-base">
                      <strong className="text-gms-gold">Atendimento personalizado:</strong> Tratamos cada caso com a atenção que merece.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Calendar className="h-5 w-5 text-gms-gold" />
                    </div>
                    <p className="ml-3 opacity-80 text-sm sm:text-base">
                      <strong className="text-gms-gold">Vagas limitadas:</strong> Apenas {vagasRestantes} avaliações gratuitas disponíveis esta semana.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <ShieldCheck className="h-5 w-5 text-gms-gold" />
                    </div>
                    <p className="ml-3 opacity-80 text-sm sm:text-base">
                      <strong className="text-gms-gold">Sem pagamento adiantado:</strong> Você só paga quando conseguir seu benefício.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center"
              >
                <div className="w-full mx-auto relative">
                  <div className="w-full flex justify-center">
                    <LeadForm className="w-full max-w-[340px] sm:max-w-md" />
                  </div>
                  
                  {/* Selo de segurança centralizado abaixo do formulário */}
                  <div className="absolute -bottom-4 left-0 right-0 mx-auto w-max bg-white/90 text-gms-brown px-4 py-1.5 rounded-md text-xs flex items-center gap-1 shadow-md">
                    <Lock className="h-3 w-3" />
                    Seus dados estão protegidos
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gms-brown text-white pt-8 border-t border-white/10 overflow-hidden">
          <div className="gms-container px-4 sm:px-6">
            <div className="flex flex-col items-center mb-8">
              {/* Logo container with explicit centering */}
              <div className="w-48 md:w-64 mx-auto flex justify-center transform hover:scale-105 transition-transform duration-300">
                <Logo />
              </div>
              <div className="mt-6 flex flex-col items-center">
                <div className="flex space-x-4 mb-3">
                  <a href="https://www.instagram.com/advocacia.gaspar.marques.souza/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gms-gold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/advgms/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gms-gold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-sm opacity-70 text-center mb-2">
                  Localização: Rua Prefeito Alfredo Luiz Batista, nº 444, Centro, São Sebastião da Amoreira, Paraná
                </p>
                <p className="text-sm opacity-70 text-center max-w-lg">
                  © 2025 GMS Advocacia - Gaspar, Marques & Souza. Todos os direitos reservados.
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 py-4 text-center">
              <p className="text-xs opacity-60">
                Este site não é um canal oficial do INSS e não possui vínculo com o Governo Federal. Somos um escritório de advocacia especializado em direito previdenciário.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
