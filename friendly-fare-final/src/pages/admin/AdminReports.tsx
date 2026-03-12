import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { day: 'Mon', revenue: 4200 }, { day: 'Tue', revenue: 5800 }, { day: 'Wed', revenue: 3900 },
  { day: 'Thu', revenue: 7200 }, { day: 'Fri', revenue: 8500 }, { day: 'Sat', revenue: 11200 }, { day: 'Sun', revenue: 9400 },
];

const topProducts = [
  { name: 'Ajwa Dates', sales: 38 }, { name: 'Rooh Afza', sales: 31 }, { name: 'Amul Milk', sales: 28 },
  { name: 'India Gate Rice', sales: 24 }, { name: 'Bambino Vermicelli', sales: 21 },
];

const branchData = [
  { name: 'Branch 1', value: 62, color: '#E8192C' },
  { name: 'Branch 2', value: 38, color: '#D4A017' },
];

const AdminReports: React.FC = () => {
  const [range, setRange] = useState('7d');

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = 98;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-3xl text-foreground tracking-wider">REPORTS & ANALYTICS</h1>
        <div className="flex bg-muted rounded-full p-0.5">
          {['7d', '30d', '90d'].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-4 py-1.5 text-xs rounded-full transition-all ${range === r ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue).toLocaleString()}`, sub: '+12% vs last week', color: 'text-gold' },
          { label: 'Total Orders', value: totalOrders, sub: '+8% vs last week', color: 'text-blue-400' },
          { label: 'Avg Order Value', value: `₹${Math.round(totalRevenue / totalOrders)}`, sub: 'Per order', color: 'text-emerald' },
          { label: 'Top Branch', value: 'Branch 1', sub: '62% of sales', color: 'text-primary' },
        ].map(s => (
          <div key={s.label} className="card-glass rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-glass rounded-xl p-5">
          <h2 className="font-display text-lg text-foreground tracking-wider mb-4">REVENUE TREND</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
              <XAxis dataKey="day" stroke="hsl(0 0% 40%)" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(0 0% 40%)" tick={{ fontSize: 12 }} tickFormatter={v => `₹${v/1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid hsl(0 0% 20%)', borderRadius: 8 }} labelStyle={{ color: '#fff' }} formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(355 85% 50%)" strokeWidth={2} dot={{ fill: 'hsl(355 85% 50%)', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Split */}
        <div className="card-glass rounded-xl p-5">
          <h2 className="font-display text-lg text-foreground tracking-wider mb-4">BRANCH SPLIT</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={branchData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} labelLine={false}>
                {branchData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid hsl(0 0% 20%)', borderRadius: 8 }} formatter={(v: number) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            {branchData.map(b => <div key={b.name} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: b.color }} /><span className="text-xs text-muted-foreground">{b.name}</span></div>)}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="card-glass rounded-xl p-5">
        <h2 className="font-display text-lg text-foreground tracking-wider mb-4">TOP SELLING PRODUCTS</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topProducts} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" horizontal={false} />
            <XAxis type="number" stroke="hsl(0 0% 40%)" tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" stroke="hsl(0 0% 40%)" tick={{ fontSize: 11 }} width={130} />
            <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid hsl(0 0% 20%)', borderRadius: 8 }} labelStyle={{ color: '#fff' }} formatter={(v: number) => [v, 'Units Sold']} />
            <Bar dataKey="sales" fill="hsl(43 78% 46%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminReports;
