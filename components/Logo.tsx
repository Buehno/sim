
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ className, size = 32, showText = true, textColor = 'currentColor' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Conexões (Linhas) baseadas na estrutura de nós IAgentics */}
        <line x1="15" y1="45" x2="15" y2="75" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" /> {/* D-E */}
        <line x1="15" y1="45" x2="45" y2="55" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" /> {/* D-B */}
        <line x1="45" y1="25" x2="45" y2="55" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" /> {/* A-B */}
        <line x1="45" y1="55" x2="45" y2="85" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" /> {/* B-C */}
        <line x1="45" y1="55" x2="75" y2="55" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" /> {/* B-F */}
        <line x1="45" y1="85" x2="75" y2="55" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" /> {/* C-F */}
        <line x1="75" y1="55" x2="105" y2="85" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" /> {/* F-G */}

        {/* Nós (Círculos) */}
        <circle cx="45" cy="25" r="10" fill="black" stroke="#818CF8" strokeWidth="5" /> {/* A */}
        <circle cx="45" cy="55" r="10" fill="black" stroke="#818CF8" strokeWidth="5" /> {/* B */}
        <circle cx="45" cy="85" r="10" fill="black" stroke="#818CF8" strokeWidth="5" /> {/* C */}
        
        <circle cx="15" cy="45" r="10" fill="black" stroke="#818CF8" strokeWidth="5" /> {/* D */}
        <circle cx="15" cy="75" r="10" fill="black" stroke="#818CF8" strokeWidth="5" /> {/* E */}
        
        <circle cx="75" cy="55" r="10" fill="black" stroke="#818CF8" strokeWidth="5" /> {/* F */}
        <circle cx="105" cy="85" r="10" fill="black" stroke="#818CF8" strokeWidth="5" /> {/* G */}
      </svg>
      {showText && (
        <span 
          className="font-poppins font-bold text-xl tracking-tight" 
          style={{ color: textColor }}
        >
          IAgentics
        </span>
      )}
    </div>
  );
};

export default Logo;
