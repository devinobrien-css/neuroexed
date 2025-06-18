import { BrainSectionEnum } from '../../../routes/projects/sections/ProjectBrainData';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const TriuneBrain = ({ setState }) => {
  const [hoverSection, setHoverSection] = useState(null);

  const handleMouseEnter = (section) => {
    setHoverSection(section);
  };

  const handleMouseLeave = () => {
    setHoverSection(null);
  };

  // Helper functions to reduce complexity
  const getClassNames = (section) => {
    const baseClasses =
      'cursor-pointer transform-gpu transition-all duration-500';
    if (hoverSection === section) {
      return `${baseClasses} drop-shadow-2xl`;
    }
    if (hoverSection) {
      return `${baseClasses} opacity-60`;
    }
    return `${baseClasses} hover:scale-105`;
  };

  const getFilter = (section) => {
    return hoverSection === section ? 'url(#glow)' : 'url(#dropshadow)';
  };

  const getFill = (section, hoverGradient, normalGradient) => {
    return hoverSection === section ? hoverGradient : normalGradient;
  };

  const getTextFill = (section) => {
    return hoverSection === section ? '#ffffff' : '#1e293b';
  };

  const getStrokeColor = () => {
    if (hoverSection == BrainSectionEnum.NEO) return '#3b82f6';
    if (hoverSection == BrainSectionEnum.PALEO) return '#ef4444';
    return '#10b981';
  };

  return (
    <svg
      viewBox="0 0 382 372"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-3/5 scale-95 drop-shadow-2xl transition-all duration-500"
    >
      <defs>
        {/* Enhanced Glow Filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Enhanced Shadow Filter */}
        <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.3" />
        </filter>

        {/* Neomammalian Gradients */}
        <linearGradient id="neoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="neoHover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
        </linearGradient>

        {/* Paleomammalian Gradients */}
        <linearGradient id="paleoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#dc2626" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b91c1c" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="paleoHover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" stopOpacity="1" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
        </linearGradient>

        {/* Reptilian Gradients */}
        <linearGradient id="reptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#059669" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#047857" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="reptHover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#059669" stopOpacity="1" />
        </linearGradient>

        {/* Ambient Background Gradient */}
        <radialGradient id="ambientGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.05" />
        </radialGradient>

        {/* Pulse Animation */}
        <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="pulseBlur" />
          <feColorMatrix
            in="pulseBlur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
      </defs>

      {/* Ambient Background */}
      <ellipse
        cx="191"
        cy="186"
        rx="200"
        ry="190"
        fill="url(#ambientGlow)"
        opacity="0.6"
      />

      {/* Neural Network Background Pattern */}
      <g opacity="0.05">
        <circle cx="80" cy="80" r="2" fill="#64748b" />
        <circle cx="300" cy="100" r="1.5" fill="#64748b" />
        <circle cx="120" cy="300" r="1" fill="#64748b" />
        <circle cx="280" cy="280" r="2" fill="#64748b" />
        <line
          x1="80"
          y1="80"
          x2="300"
          y2="100"
          stroke="#64748b"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="120"
          y1="300"
          x2="280"
          y2="280"
          stroke="#64748b"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </g>

      {/* Neomammalian Layer - Enhanced with gradients and animations */}
      <g
        className={getClassNames(BrainSectionEnum.NEO)}
        onClick={() => setState(BrainSectionEnum.NEO)}
        onMouseEnter={() => handleMouseEnter(BrainSectionEnum.NEO)}
        onMouseLeave={handleMouseLeave}
        filter={getFilter(BrainSectionEnum.NEO)}
        fill={getFill(
          BrainSectionEnum.NEO,
          'url(#neoHover)',
          'url(#neoGradient)',
        )}
      >
        <ellipse cx="166" cy="96.5" rx="166" ry="96.5" />
        <path d="M307 130C307 171.697 225.5 179.5 255 195C368 268 116 148.197 116 106.5C116 64.8025 164.353 31 224 31C283.647 31 307 88.3025 307 130Z" />
        <path d="M171.5 221C151.184 213.15 133.319 241.246 107.484 232.282C85.9626 224.815 91.0332 196.206 79.0124 188.025C-69.1452 87.1851 75.1681 137.605 97.7168 137.605C120.266 137.605 188.899 227.723 171.5 221Z" />
        <ellipse
          rx="39.6716"
          ry="46.52"
          transform="matrix(-0.939693 0.34202 0.34202 0.939693 325.81 207.854)"
        />
        <path d="M269.785 286.196C278.769 310.879 354.799 351.9 375.798 344.257C396.797 336.614 339.546 300.279 328.305 276.251C319.321 251.568 309.236 255.794 322.161 246.094C301.162 253.737 260.801 261.513 269.785 286.196Z" />
        <ellipse
          rx="52.258"
          ry="27.2714"
          transform="matrix(-0.766044 0.642788 0.642788 0.766044 309.562 220.482)"
        />
        <path d="M255.239 201.621C258.384 203.437 272.881 261.199 276.772 254.458C280.664 247.717 309.946 185.596 289.655 187.856C286.51 186.04 285.325 200.823 281.433 207.564C277.541 214.305 252.094 199.805 255.239 201.621Z" />
        <ellipse
          rx="39.6716"
          ry="46.52"
          transform="matrix(-0.939693 0.34202 0.34202 0.939693 157.19 172.283)"
        />
        <path d="M169 220.5C161.355 199.494 169.012 181.271 176.813 178.432C184.615 175.592 197.137 190.319 204.783 211.324C212.428 232.33 212.301 251.66 204.5 254.5C196.699 257.34 184.374 223.5 169 220.5Z" />
        <ellipse
          cx="263.5"
          cy="255.758"
          rx="22.7708"
          ry="65.4284"
          transform="rotate(140 263.5 255.758)"
        />
        <ellipse
          cx="271.483"
          cy="252.312"
          rx="22.7708"
          ry="70.0687"
          transform="rotate(140 271.483 252.312)"
        />
        <path d="M212.613 200.335C202.764 188.598 203.362 171.883 213.949 163C224.535 154.117 264.785 172.997 245.949 187C241.285 193.497 269.035 192.617 258.449 201.5C247.862 210.383 222.461 212.072 212.613 200.335Z" />
        <path d="M215.613 227.835C205.764 216.098 206.362 199.383 216.949 190.5C227.535 181.617 267.785 200.497 248.949 214.5C244.285 220.997 269.035 224.617 258.449 233.5C247.862 242.383 225.461 239.572 215.613 227.835Z" />
        <ellipse
          cx="212.277"
          cy="205.086"
          rx="31.739"
          ry="13.0159"
          transform="rotate(160 212.277 205.086)"
        />
        <rect
          x="232.995"
          y="203.361"
          width="10.8275"
          height="12"
          transform="rotate(-50 232.995 203.361)"
        />
        <rect
          x="232"
          y="200.414"
          width="10.8275"
          height="12"
          transform="rotate(-30 232 200.414)"
        />
        <rect
          x="230"
          y="192.377"
          width="10.8275"
          height="12"
          transform="rotate(-60 230 192.377)"
        />
        <rect
          x="229"
          y="197.175"
          width="10.8275"
          height="12"
          transform="rotate(-70 229 197.175)"
        />
        <ellipse
          cx="224.561"
          cy="246.254"
          rx="35"
          ry="20.5"
          transform="rotate(30 224.561 246.254)"
        />
        <ellipse
          cx="242.561"
          cy="254.254"
          rx="35"
          ry="20.5"
          transform="rotate(30 242.561 254.254)"
        />
        <path d="M303.5 310.5C297.839 320.305 281.24 302.165 264.5 292.5C247.76 282.835 192.839 255.805 198.5 246C204.161 236.195 240.76 247.73 257.5 257.395C274.24 267.06 309.161 300.695 303.5 310.5Z" />
        <ellipse
          cx="268"
          cy="240.5"
          rx="35"
          ry="20.5"
          transform="rotate(-180 268 240.5)"
        />
        <path d="M252 182.5C262 182.5 276.408 178.214 269.408 198.214C269.408 212.214 277.442 194.564 279.408 205.714C281.374 216.864 292.536 234.124 273.5 237.48C254.464 240.837 218.5 152.5 252 182.5Z" />
        <ellipse cx="260" cy="221.5" rx="7" ry="6.5" />
        <ellipse
          cx="222.373"
          cy="216.914"
          rx="31.739"
          ry="13.0159"
          transform="rotate(160 222.373 216.914)"
        />
        <ellipse
          cx="228.277"
          cy="229.086"
          rx="31.739"
          ry="13.0159"
          transform="rotate(160 228.277 229.086)"
        />
        <rect
          x="239"
          y="210.623"
          width="14"
          height="16"
          transform="rotate(-15 239 210.623)"
        />
        <rect
          x="244"
          y="228.991"
          width="14"
          height="16"
          transform="rotate(-88 244 228.991)"
        />
        <rect
          x="295"
          y="258.431"
          width="14"
          height="16"
          transform="rotate(-10 295 258.431)"
        />

        {/* Enhanced label styling */}
        <text
          x="127"
          y="59"
          fill={getTextFill(BrainSectionEnum.NEO)}
          fontSize="14"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
          textAnchor="middle"
          className="pointer-events-none drop-shadow-sm"
        >
          Neomammalian
        </text>
      </g>
      {/* Paleomammalian Layer - Enhanced with gradients and animations */}
      <g
        className={getClassNames(BrainSectionEnum.PALEO)}
        onClick={() => setState(BrainSectionEnum.PALEO)}
        onMouseEnter={() => handleMouseEnter(BrainSectionEnum.PALEO)}
        onMouseLeave={handleMouseLeave}
        filter={getFilter(BrainSectionEnum.PALEO)}
        fill={getFill(
          BrainSectionEnum.PALEO,
          'url(#paleoHover)',
          'url(#paleoGradient)',
        )}
      >
        <path d="M261.385 134.955C261.385 164.2 217 212.5 152.5 192C104.897 192 89 164.2 89 134.955C89 105.709 127.59 82 175.193 82C222.796 82 261.385 105.709 261.385 134.955Z" />
        <ellipse cx="205.308" cy="140.442" rx="56.0772" ry="41.4307" />
        <ellipse
          rx="20.7392"
          ry="25.3711"
          transform="matrix(-0.933331 0.359017 0.325622 0.9455 170.618 176.541)"
        />
        <ellipse
          rx="7.85852"
          ry="22.0744"
          transform="matrix(-0.933331 0.359017 -0.325622 -0.9455 192.831 203.37)"
        />
        <ellipse
          rx="8.17157"
          ry="21.2344"
          transform="matrix(-0.403677 0.914901 -0.89699 -0.442052 188.192 198.187)"
        />
        <ellipse
          rx="8.03025"
          ry="21.6217"
          transform="matrix(-0.6873 0.726373 -0.6873 -0.726373 191.308 201.479)"
        />
        <ellipse
          rx="12.1056"
          ry="35.1188"
          transform="matrix(-0.748184 0.663491 -0.621808 -0.78317 225.818 222.347)"
        />
        <path d="M210 240C195.247 221.419 222.665 222.108 227.667 217.672C232.669 213.236 242.36 224.912 254.574 246.146C269.327 264.727 320.002 301.564 315 306C309.998 310.436 224.753 258.581 210 240Z" />
        <path d="M269.5 283.5C254.747 264.919 230.5 224.092 235.502 219.656C240.504 215.22 270.786 230.765 283 252C297.753 270.581 363.002 333.064 358 337.5C352.998 341.936 325 319 269.5 283.5Z" />
        <path d="M205.316 187.96C203.578 182.913 209.517 175.994 218.581 172.507C227.646 169.021 228.669 148.086 238.776 169.049C240.514 174.097 231.63 177.377 222.565 180.864C213.501 184.35 251.818 240.486 205.316 187.96Z" />
        <rect
          width="5.81169"
          height="6.37954"
          transform="matrix(0.621808 -0.78317 0.748184 0.663491 209.979 193.595)"
        />
        <rect
          width="5.70359"
          height="6.49827"
          transform="matrix(0.853638 -0.520866 0.47942 0.877586 209.462 191.977)"
        />
        <rect
          width="5.86335"
          height="6.32121"
          transform="matrix(0.47942 -0.877586 0.853638 0.520866 208.424 187.567)"
        />
        <rect
          width="5.90512"
          height="6.27327"
          transform="matrix(0.325622 -0.9455 0.933331 0.359017 207.904 190.2)"
        />
        <ellipse
          rx="18.4369"
          ry="11.1012"
          transform="matrix(0.853638 0.520866 -0.47942 0.877586 205.599 217.132)"
        />
        <path d="M225 250.5C222.061 255.881 195 222.284 183.5 214.5C170.831 205.925 108.061 184.597 111 179.216C113.939 173.836 195.308 189.461 204 194.765C212.692 200.069 227.939 245.119 225 250.5Z" />
        <path d="M252.058 215.375C246.445 225.65 226.615 237.082 210.436 227.21C194.257 217.337 185.691 201.005 191.305 190.73C196.918 180.455 232.5 170.218 232.5 186C232.5 204.875 257.672 205.1 252.058 215.375Z" />
        <path d="M236 182C228.656 194.981 263.691 216.384 250 210C236.309 203.616 211.104 196.854 213.5 191C215.896 185.146 214.167 149.496 227.857 155.88C276.358 146.397 238.738 172.159 236 182Z" />
        <path d="M272.5 230.5C285 238 239.094 223.102 221.5 220C203.907 216.898 230.5 200.848 248.5 198.5C260 197 245.296 212.626 263.5 215.5C273 217 270 218 272.5 230.5Z" />
        <path d="M314.5 216.5C313.021 228.115 295.165 259.291 276.5 256C257.835 252.709 220.902 253.057 222.381 241.442C223.86 229.827 263.947 211.776 269.703 226.471C276.588 244.046 315.979 204.885 314.5 216.5Z" />
        <path d="M333.5 236C298 252 274.679 275.372 258.5 265.5C242.321 255.628 290.887 228.275 296.5 218C302.113 207.725 315.128 194.322 329 201C348.141 210.215 340 233.071 333.5 236Z" />
        <path d="M312 245.5C295.846 278.46 379.206 331.308 363.589 338.591C347.971 345.873 291.77 277.768 286.275 267.319C280.779 256.87 276.338 238.669 288.306 231.392C304.82 221.351 316.694 235.923 312 245.5Z" />
        <path d="M176.5 210C170 210 177.046 207.5 132.5 207.5C112.359 207.5 131 198.5 105 175.5C107.939 170.119 143.308 129.196 152 134.5C160.692 139.804 193.787 210 176.5 210Z" />

        {/* Enhanced label styling */}
        <text
          x="150"
          y="113"
          fill={getTextFill(BrainSectionEnum.PALEO)}
          fontSize="14"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
          textAnchor="middle"
          className="pointer-events-none drop-shadow-sm"
        >
          Paleomammalian
        </text>
      </g>

      {/* Reptilian Layer - Enhanced with gradients and animations */}
      <g
        className={getClassNames(BrainSectionEnum.REPT)}
        onClick={() => setState(BrainSectionEnum.REPT)}
        onMouseEnter={() => handleMouseEnter(BrainSectionEnum.REPT)}
        onMouseLeave={handleMouseLeave}
        filter={getFilter(BrainSectionEnum.REPT)}
        fill={getFill(
          BrainSectionEnum.REPT,
          'url(#reptHover)',
          'url(#reptGradient)',
        )}
      >
        <path d="M226.5 146.5C226.5 159 200.5 152 200.5 166.5C170.677 166.5 144.5 144.56 144.5 136C144.5 127.44 157.177 124 187 124C216.823 124 226.5 137.94 226.5 146.5Z" />
        <path d="M226.5 146.5C226.5 159 200.5 152 200.5 166.5C170.677 166.5 144.5 144.56 144.5 136C144.5 127.44 157.177 124 187 124C216.823 124 226.5 137.94 226.5 146.5Z" />
        <path d="M228 146.673C228 160.168 215.5 172.845 215.5 188.5C229 210 145 146.198 145 136.956C145 127.714 157.677 124 187.5 124C217.323 124 228 137.43 228 146.673Z" />
        <path d="M228 146.673C228 160.168 215.5 172.845 215.5 188.5C229 210 145 146.198 145 136.956C145 127.714 157.677 124 187.5 124C217.323 124 228 137.43 228 146.673Z" />
        <path d="M204.063 167.826C197.563 176.326 247.33 232.949 272 239C298.5 245.5 250 241.386 250 232.826C250 224.266 127.24 146.326 157.063 146.326C186.887 146.326 209.264 161.026 204.063 167.826Z" />
        <path d="M204.063 167.826C197.563 176.326 247.33 232.949 272 239C298.5 245.5 250 241.386 250 232.826C250 224.266 127.24 146.326 157.063 146.326C186.887 146.326 209.264 161.026 204.063 167.826Z" />
        <path d="M300.5 245C284 262.5 349 313.599 325 303C297.719 290.952 226.5 217.56 226.5 209C226.5 200.44 244.177 241.5 274 241.5C303.823 241.5 306.373 238.772 300.5 245Z" />
        <path d="M300.5 245C284 262.5 349 313.599 325 303C297.719 290.952 226.5 217.56 226.5 209C226.5 200.44 244.177 241.5 274 241.5C303.823 241.5 306.373 238.772 300.5 245Z" />
        <path d="M317.5 212C340.5 216.5 305 249 282 249C252.177 249 197 178.06 197 169.5C197 160.94 246.677 240 276.5 240C306.323 240 309.099 210.356 317.5 212Z" />
        <path d="M317.5 212C340.5 216.5 305 249 282 249C252.177 249 197 178.06 197 169.5C197 160.94 246.677 240 276.5 240C306.323 240 309.099 210.356 317.5 212Z" />
        <path d="M198.5 159.5C198.5 172 205.29 182 184 182C138.5 182 123 164.06 123 155.5C123 146.94 135.177 125.5 165 125.5C194.823 125.5 198.5 150.94 198.5 159.5Z" />
        <path d="M198.5 159.5C198.5 172 205.29 182 184 182C138.5 182 123 164.06 123 155.5C123 146.94 135.177 125.5 165 125.5C194.823 125.5 198.5 150.94 198.5 159.5Z" />
        <path d="M194 172C194 184.5 374 336 352 328C309.239 312.451 200 197.817 182 192C67.5002 155 149.177 132.5 179 132.5C208.823 132.5 194 163.44 194 172Z" />
        <path d="M194 172C194 184.5 374 336 352 328C309.239 312.451 200 197.817 182 192C67.5002 155 149.177 132.5 179 132.5C208.823 132.5 194 163.44 194 172Z" />

        {/* Enhanced label styling */}
        <text
          x="185"
          y="158"
          fill={getTextFill(BrainSectionEnum.REPT)}
          fontSize="14"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
          textAnchor="middle"
          className="pointer-events-none drop-shadow-sm"
        >
          Reptilian
        </text>
      </g>
    </svg>
  );
};

TriuneBrain.propTypes = {
  setState: PropTypes.func.isRequired,
};
