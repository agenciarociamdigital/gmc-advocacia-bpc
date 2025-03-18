
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gms-light">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gms-brown">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Página não encontrada
          </p>
          
          <a 
            href="/" 
            className="inline-flex items-center justify-center gap-2 bg-gms-brown text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para a página inicial
          </a>
        </div>
      </div>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} GMS Advocacia - Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default NotFound;
