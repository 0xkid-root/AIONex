<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
  <defs>
    <!-- Gradients -->
    <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff00ff;stop-opacity:1" />
    </linearGradient>
    
    <!-- Animations -->
    <animateTransform
      xlink:href="#hexagon"
      attributeName="transform"
      type="rotate"
      from="0 200 100"
      to="360 200 100"
      dur="20s"
      repeatCount="indefinite"
    />
    
    <!-- Pulse animation -->
    <animate
      xlink:href="#center-circle"
      attributeName="r"
      values="15;20;15"
      dur="2s"
      repeatCount="indefinite"
    />
  </defs>
  
  <!-- Background hexagon grid -->
  <g id="hexagon" opacity="0.2">
    <path d="M180 40 L220 40 L240 74.6 L220 109.2 L180 109.2 L160 74.6 Z" 
          stroke="#4f46e5" fill="none" stroke-width="2"/>
    <path d="M220 90.8 L260 90.8 L280 125.4 L260 160 L220 160 L200 125.4 Z" 
          stroke="#4f46e5" fill="none" stroke-width="2"/>
    <path d="M140 90.8 L180 90.8 L200 125.4 L180 160 L140 160 L120 125.4 Z" 
          stroke="#4f46e5" fill="none" stroke-width="2"/>
  </g>

  <!-- Central design -->
  <g id="logo-center">
    <!-- Outer ring -->
    <circle cx="200" cy="100" r="60" 
            stroke="url(#text-gradient)" 
            stroke-width="4" 
            fill="none">
      <animate attributeName="stroke-dasharray" 
               values="0,360;360,360"
               dur="2s"
               fill="freeze"/>
    </circle>
    
    <!-- Inner connections -->
    <line x1="160" y1="100" x2="240" y2="100" 
          stroke="#4f46e5" stroke-width="2">
      <animate attributeName="stroke-dasharray" 
               values="0,80;80,80"
               dur="1.5s"
               fill="freeze"/>
    </line>
    <line x1="200" y1="60" x2="200" y2="140" 
          stroke="#4f46e5" stroke-width="2">
      <animate attributeName="stroke-dasharray" 
               values="0,80;80,80"
               dur="1.5s"
               fill="freeze"/>
    </line>
    
    <!-- Pulsing center -->
    <circle id="center-circle" 
            cx="200" cy="100" r="15" 
            fill="url(#text-gradient)"/>
  </g>

  <!-- Text -->
  <text x="200" y="190" 
        text-anchor="middle" 
        font-family="Arial, sans-serif" 
        font-size="36" 
        font-weight="bold" 
        fill="url(#text-gradient)">
    AIONex
  </text>
</svg>