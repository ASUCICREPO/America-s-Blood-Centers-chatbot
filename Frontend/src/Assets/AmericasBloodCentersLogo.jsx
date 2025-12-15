const AmericasBloodCentersLogo = ({ color = "#B91C1C", width = 120, height = 80 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blood drop shape */}
      <path d="M60 15C60 15 45 30 45 45C45 53.284 51.716 60 60 60C68.284 60 75 53.284 75 45C75 30 60 15 60 15Z" fill={color} stroke="#7F1D1D" strokeWidth="2"/>
      
      {/* Cross symbol inside */}
      <rect x="57" y="30" width="6" height="20" fill="white"/>
      <rect x="50" y="37" width="20" height="6" fill="white"/>
      
      {/* Text "America's Blood Centers" below */}
      <text x="60" y="72" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill={color}>America's Blood Centers</text>
    </svg>
  )
}

export default AmericasBloodCentersLogo