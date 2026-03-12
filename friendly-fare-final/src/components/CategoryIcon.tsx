import React from 'react';

// Modern, colorful SVG icons for each grocery category
const icons: Record<string, React.ReactNode> = {
  'Fruits & Vegetables': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="36" r="20" fill="#4CAF50" opacity="0.15"/>
      <ellipse cx="24" cy="38" rx="12" ry="14" fill="#FF5722"/>
      <ellipse cx="38" cy="40" rx="10" ry="12" fill="#FF9800"/>
      <ellipse cx="31" cy="32" rx="9" ry="11" fill="#E91E63"/>
      <path d="M32 20 C32 20 28 12 22 10 C26 14 30 18 32 20Z" fill="#4CAF50"/>
      <path d="M32 18 C32 18 36 10 42 9 C38 13 34 16 32 18Z" fill="#66BB6A"/>
      <circle cx="44" cy="30" r="6" fill="#FFEB3B"/>
      <circle cx="44" cy="30" r="4" fill="#FFC107"/>
    </svg>
  ),
  'Dairy & Eggs': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="20" width="20" height="28" rx="4" fill="#E3F2FD"/>
      <rect x="18" y="20" width="20" height="28" rx="4" stroke="#1565C0" strokeWidth="2"/>
      <rect x="20" y="22" width="16" height="6" rx="2" fill="#1565C0"/>
      <text x="28" y="29" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">MILK</text>
      <ellipse cx="46" cy="36" rx="8" ry="10" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2"/>
      <ellipse cx="46" cy="38" rx="8" ry="10" fill="#FFFDE7" stroke="#F9A825" strokeWidth="2"/>
      <ellipse cx="46" cy="40" rx="7" ry="8" fill="#FFF8E1"/>
      <circle cx="46" cy="40" r="4" fill="#FFB300" opacity="0.6"/>
    </svg>
  ),
  'Bakery & Bread': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="38" rx="22" ry="12" fill="#D7A96A"/>
      <ellipse cx="32" cy="32" rx="22" ry="14" fill="#E8C08A"/>
      <ellipse cx="32" cy="28" rx="20" ry="10" fill="#F5D4A7"/>
      <ellipse cx="32" cy="26" rx="18" ry="8" fill="#FDDDB0"/>
      <path d="M14 32 Q18 28 22 32 Q26 36 30 32 Q34 28 38 32 Q42 36 46 32 Q50 28 50 32" stroke="#D7A96A" strokeWidth="2" fill="none"/>
      <ellipse cx="32" cy="24" rx="12" ry="5" fill="#F9E4C3" opacity="0.7"/>
    </svg>
  ),
  'Beverages': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="18" width="16" height="32" rx="3" fill="#E3F2FD"/>
      <rect x="20" y="18" width="16" height="32" rx="3" stroke="#0288D1" strokeWidth="2"/>
      <rect x="20" y="18" width="16" height="8" rx="3" fill="#0288D1"/>
      <path d="M36 26 Q42 30 42 36 Q42 42 36 46" stroke="#90CAF9" strokeWidth="2" fill="none"/>
      <circle cx="42" cy="44" r="8" fill="#FF7043"/>
      <circle cx="42" cy="44" r="6" fill="#FF5722"/>
      <text x="42" y="47" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">C</text>
      <rect x="22" y="28" width="12" height="2" rx="1" fill="#0288D1" opacity="0.3"/>
      <rect x="22" y="32" width="12" height="2" rx="1" fill="#0288D1" opacity="0.3"/>
      <rect x="22" y="36" width="12" height="2" rx="1" fill="#0288D1" opacity="0.3"/>
    </svg>
  ),
  'Snacks & Chips': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 26 L48 20 L52 44 L12 48 Z" fill="#FFE082"/>
      <path d="M16 26 L48 20 L52 44 L12 48 Z" stroke="#F9A825" strokeWidth="2"/>
      <rect x="14" y="20" width="36" height="6" rx="3" fill="#FF7043"/>
      <text x="32" y="25" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">SNACKS</text>
      <ellipse cx="24" cy="34" rx="5" ry="3" fill="#FFCC02" opacity="0.8" transform="rotate(-15 24 34)"/>
      <ellipse cx="36" cy="37" rx="5" ry="3" fill="#FFCC02" opacity="0.8" transform="rotate(10 36 37)"/>
      <ellipse cx="28" cy="41" rx="5" ry="3" fill="#FFD740" opacity="0.8" transform="rotate(-5 28 41)"/>
    </svg>
  ),
  'Meat & Chicken': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="38" rx="16" ry="12" fill="#F44336" opacity="0.15"/>
      <path d="M22 44 Q24 36 32 34 Q40 32 44 38" stroke="#D32F2F" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="30" cy="36" rx="14" ry="10" fill="#FFCCBC"/>
      <ellipse cx="30" cy="35" rx="12" ry="9" fill="#FFAB91"/>
      <circle cx="44" cy="24" r="6" fill="#F5F5F5" stroke="#9E9E9E" strokeWidth="1.5"/>
      <path d="M38 24 L30 30" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="30" cy="33" rx="10" ry="7" fill="#FF7043" opacity="0.7"/>
    </svg>
  ),
  'Rice & Grains': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="44" rx="18" ry="8" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5"/>
      <ellipse cx="32" cy="40" rx="18" ry="10" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1.5"/>
      <ellipse cx="32" cy="36" rx="18" ry="10" fill="white" stroke="#E0E0E0" strokeWidth="1.5"/>
      {[28,32,36,25,39,30,34].map((x, i) => (
        <ellipse key={i} cx={x} cy={32 + (i % 3) * 4} rx="2" ry="1" fill="#E8F5E9" stroke="#81C784" strokeWidth="0.5"/>
      ))}
      <path d="M20 20 L22 12 L32 10 L42 12 L44 20" stroke="#8D6E63" strokeWidth="2" fill="none"/>
      <line x1="32" y1="10" x2="32" y2="20" stroke="#8D6E63" strokeWidth="2"/>
    </svg>
  ),
  'Spices & Masala': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34 14 Q36 20 32 24 Q28 20 30 14 Z" fill="#F44336"/>
      <path d="M34 14 Q38 10 42 12 Q40 18 34 18 Z" fill="#66BB6A"/>
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="#FF6F00" opacity="0.2"/>
      <rect x="22" y="28" width="20" height="24" rx="10" fill="#FF6F00"/>
      <rect x="22" y="28" width="20" height="24" rx="10" stroke="#E65100" strokeWidth="1.5"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#FFA726"/>
      <line x1="28" y1="36" x2="36" y2="36" stroke="#E65100" strokeWidth="1" opacity="0.5"/>
      <line x1="26" y1="40" x2="38" y2="40" stroke="#E65100" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  'Household Items': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12 L52 30 L52 50 L12 50 L12 30 Z" fill="#1565C0" opacity="0.15"/>
      <path d="M32 14 L50 30 L50 50 L14 50 L14 30 Z" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2"/>
      <path d="M10 30 L32 12 L54 30" stroke="#1565C0" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="26" y="38" width="12" height="12" rx="2" fill="#1565C0"/>
      <circle cx="32" cy="44" r="2" fill="#90CAF9"/>
      <rect x="20" y="34" width="8" height="8" rx="1" fill="#90CAF9" opacity="0.7"/>
      <rect x="36" y="34" width="8" height="8" rx="1" fill="#90CAF9" opacity="0.7"/>
    </svg>
  ),
  'Personal Care': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="16" width="16" height="32" rx="6" fill="#E1BEE7"/>
      <rect x="24" y="16" width="16" height="32" rx="6" stroke="#7B1FA2" strokeWidth="1.5"/>
      <rect x="26" y="14" width="12" height="6" rx="2" fill="#7B1FA2"/>
      <path d="M30 12 L34 12 L33 14 L31 14 Z" fill="#CE93D8"/>
      <ellipse cx="32" cy="30" rx="5" ry="6" fill="#CE93D8" opacity="0.5"/>
      <text x="32" y="33" textAnchor="middle" fill="#7B1FA2" fontSize="6" fontWeight="bold">♡</text>
      <circle cx="46" cy="22" r="6" fill="#F8BBD0" stroke="#E91E63" strokeWidth="1.5"/>
      <text x="46" y="25" textAnchor="middle" fill="#C2185B" fontSize="8">✦</text>
    </svg>
  ),
  'Baby Products': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="28" r="14" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="2"/>
      <circle cx="28" cy="25" r="2" fill="#333"/>
      <circle cx="36" cy="25" r="2" fill="#333"/>
      <path d="M27 32 Q32 36 37 32" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M18 22 Q14 16 16 12 Q20 10 22 16" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1"/>
      <path d="M46 22 Q50 16 48 12 Q44 10 42 16" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1"/>
      <rect x="20" y="42" width="24" height="12" rx="6" fill="#80DEEA"/>
      <text x="32" y="51" textAnchor="middle" fill="#00838F" fontSize="7" fontWeight="bold">BABY</text>
    </svg>
  ),
  'Dry Fruits & Nuts': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="36" rx="8" ry="10" fill="#D4A96A"/>
      <ellipse cx="24" cy="36" rx="6" ry="8" fill="#C8872A"/>
      <ellipse cx="38" cy="34" rx="10" ry="8" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1.5"/>
      <line x1="38" y1="28" x2="38" y2="40" stroke="#388E3C" strokeWidth="1"/>
      <ellipse cx="46" cy="42" rx="6" ry="8" fill="#D4A96A" stroke="#8D6E63" strokeWidth="1.5"/>
      <ellipse cx="20" cy="44" rx="6" ry="5" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5"/>
      <circle cx="32" cy="30" r="5" fill="#BCAAA4" stroke="#795548" strokeWidth="1.5"/>
      <line x1="30" y1="28" x2="34" y2="32" stroke="#795548" strokeWidth="1"/>
    </svg>
  ),
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-12 h-12' }) => {
  const icon = icons[name];
  if (!icon) return <span className="text-3xl">🛒</span>;
  return <div className={className}>{icon}</div>;
};

export default CategoryIcon;
