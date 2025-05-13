
import React from 'react';
import { Users, Calendar, MessageSquare, Mail, FileText, ShoppingBag } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import YearlyBreakup from '@/components/dashboard/YearlyBreakup';
import MonthlyEarnings from '@/components/dashboard/MonthlyEarnings';
import ProductsSection from '@/components/dashboard/ProductsSection';
import ProjectsSection from '@/components/dashboard/ProjectsSection';
import CustomersSection from '@/components/dashboard/CustomersSection';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          title="Profile" 
          value="3,685" 
          icon={<Users className="h-5 w-5 text-blue-500" />}
          iconColor="bg-blue-100"
        />
        <StatCard 
          title="Blog" 
          value="256" 
          icon={<FileText className="h-5 w-5 text-yellow-500" />}
          iconColor="bg-yellow-100"
        />
        <StatCard 
          title="Calendar" 
          value="932" 
          icon={<Calendar className="h-5 w-5 text-blue-500" />}
          iconColor="bg-blue-100"
        />
        <StatCard 
          title="Email" 
          value="$348K" 
          icon={<Mail className="h-5 w-5 text-red-500" />}
          iconColor="bg-red-100"
        />
        <StatCard 
          title="Chats" 
          value="96" 
          icon={<MessageSquare className="h-5 w-5 text-green-500" />}
          iconColor="bg-green-100"
        />
        <StatCard 
          title="Contacts" 
          value="48" 
          icon={<Users className="h-5 w-5 text-blue-500" />}
          iconColor="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <RevenueChart />
        <YearlyBreakup />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <MonthlyEarnings />
        <ProductsSection />
        <ProjectsSection />
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        <CustomersSection />
      </div>
    </div>
  );
};

export default Dashboard;
