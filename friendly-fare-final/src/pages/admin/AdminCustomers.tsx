import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'Fatima Begum', phone: '+91 98765 43210', email: 'fatima@email.com', orders: 12, spent: 8450, joined: '2025-01-15' },
  { id: '2', name: 'Rajesh Kumar', phone: '+91 91234 56789', email: '', orders: 7, spent: 3200, joined: '2025-02-01' },
  { id: '3', name: 'Ayesha Khan', phone: '+91 90000 11111', email: 'ayesha@email.com', orders: 24, spent: 15600, joined: '2024-12-10' },
  { id: '4', name: 'Mohammed Ali', phone: '+91 88888 77777', email: '', orders: 3, spent: 1250, joined: '2025-03-01' },
];

const AdminCustomers: React.FC = () => (
  <div className="p-6 space-y-6">
    <h1 className="font-display text-3xl text-foreground tracking-wider">CUSTOMERS</h1>
    <div className="card-glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['Customer', 'Phone', 'Email', 'Orders', 'Total Spent', 'Joined', 'Actions'].map(h => (
                <th key={h} className="text-left p-3 text-muted-foreground font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map(c => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{c.name[0]}</div>
                    <span className="text-foreground font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{c.phone}</td>
                <td className="p-3 text-muted-foreground">{c.email || '—'}</td>
                <td className="p-3 text-foreground font-medium">{c.orders}</td>
                <td className="p-3 text-gold font-bold">₹{c.spent.toLocaleString()}</td>
                <td className="p-3 text-muted-foreground text-xs">{c.joined}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <a href={`tel:${c.phone}`} className="p-1.5 bg-emerald/20 text-emerald rounded hover:bg-emerald/30 transition-colors"><Phone className="w-3.5 h-3.5" /></a>
                    <a href={`https://wa.me/${c.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-[#25D366]/20 text-[#25D366] rounded hover:bg-[#25D366]/30 transition-colors"><MessageCircle className="w-3.5 h-3.5" /></a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminCustomers;
