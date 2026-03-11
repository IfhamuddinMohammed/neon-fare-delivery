import React from 'react';
import { MessageCircle, Instagram, Facebook, Phone } from 'lucide-react';

const socials = [
  { icon: MessageCircle, href: 'https://wa.me/918686399850?text=Hi,%20I%20want%20to%20order%20from%20Friendly%20Fare', label: 'WhatsApp', color: 'bg-[#25D366] hover:shadow-[0_0_15px_#25D366aa]' },
  { icon: Instagram, href: 'https://instagram.com/friendlyfarehyderabad', label: 'Instagram', color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:shadow-[0_0_15px_#FD1D1Daa]' },
  { icon: Facebook, href: 'https://facebook.com/friendlyfarehyderabad', label: 'Facebook', color: 'bg-[#1877F2] hover:shadow-[0_0_15px_#1877F2aa]' },
  { icon: Phone, href: 'tel:+918686399850', label: 'Call Us', color: 'bg-primary hover:shadow-[0_0_15px_hsl(355_85%_50%/0.6)]' },
];

const FloatingSocialBar: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground transition-all duration-300 ${s.color}`}
        >
          <s.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default FloatingSocialBar;
