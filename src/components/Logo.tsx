
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
}

const Logo = ({ className, variant = "full" }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      {variant === "full" ? (
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/lovable-uploads/ea40140c-772f-4835-b127-d457f4a2126c.png" 
            alt="GMS Advocacia" 
            className="h-16 md:h-20"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/ea40140c-772f-4835-b127-d457f4a2126c.png" 
            alt="GMS Advocacia" 
            className="h-12"
          />
        </div>
      )}
    </div>
  );
};

export default Logo;
