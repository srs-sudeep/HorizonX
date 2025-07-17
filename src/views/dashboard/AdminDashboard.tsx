import React, { useState } from 'react';
import { Users, FileText, Calendar, Building, BarChart } from 'lucide-react';
import {
  CustomersSection,
  MonthlyEarnings,
  ProductsSection,
  ProjectsSection,
  RevenueChart,
  StatCard,
  YearlyBreakup,
  HelmetWrapper,
} from '@/components';
import {   PieChartComponent } from '@/components/dashboard/pieChart';
import { ScatterChartComponent } from '@/components/dashboard/scatterChart';
import { RadarChartComponent } from '@/components/dashboard/radarChart';
import { RadialBarChartComponent } from '@/components/dashboard/radialBarChart';
import FullCalendarComponent from '@/components/dashboard/fullCalendar';
import UploaderComponent from '@/components/dashboard/UploaderComponent';
import CopyToClipboardComponent from '@/components/dashboard/CopyToClipboardComponent';
import ToastDemoComponent from '@/components/dashboard/ToastDemoComponent';
import ScrollDemoComponent from '@/components/dashboard/ScrollDemoComponent';
import TabsDemoComponent from '@/components/dashboard/TabsDemoComponent';
import KanbanBoard from '@/components/dashboard/kanban';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast';

const AdminDashboard = () => {
  const [toasts, setToasts] = useState<any[]>([]);
  const showToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [
      ...prev,
      { id, type, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`, description: `This is a ${type} toast!`, progress: 100 }
    ]);
    // Animate progress bar
    let progress = 100;
    const interval = setInterval(() => {
      progress -= 2;
      setToasts((prev) => prev.map(t => t.id === id ? { ...t, progress } : t));
      if (progress <= 0) {
        clearInterval(interval);
        setToasts((prev) => prev.filter(t => t.id !== id));
      }
    }, 30);
  };

  return (
    <ToastProvider>
      <HelmetWrapper title="Admin Dashboard | HorizonX">
        <ToastViewport />
        <div className="mx-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard
              title="Students"
              value="3,685"
              icon={<Users className="h-5 w-5 text-chip-blue" />}
              iconColor="bg-chip-blue/10"
            />
            <StatCard
              title="Teachers"
              value="256"
              icon={<Users className="h-5 w-5 text-chip-yellow" />}
              iconColor="bg-chip-yellow/10"
            />
            <StatCard
              title="Courses"
              value="64"
              icon={<FileText className="h-5 w-5 text-chip-blue" />}
              iconColor="bg-chip-blue/10"
            />
            <StatCard
              title="Departments"
              value="12"
              icon={<Building className="h-5 w-5 text-destructive" />}
              iconColor="bg-destructive/10"
            />
            <StatCard
              title="Events"
              value="28"
              icon={<Calendar className="h-5 w-5 text-success" />}
              iconColor="bg-success/10"
            />
            <StatCard
              title="Analytics"
              value="89%"
              icon={<BarChart className="h-5 w-5 text-chip-blue" />}
              iconColor="bg-chip-blue/10"
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
            {/* Pie Chart Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pie Chart Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]  text-chip-blue">
                  <PieChartComponent
                    data={[
                      { name: 'Group A', value: 400 },
                      { name: 'Group B', value: 300 },
                      { name: 'Group C', value: 300 },
                      { name: 'Group D', value: 200 },
                    ]}
                    showLegend={true}
                    showTooltip={true}
                    outerRadius={70}
                    height={200}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Scatter Chart Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Scatter Chart Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ScatterChartComponent
                    data={[
                      { x: 10, y: 30 },
                      { x: 20, y: 50 },
                      { x: 30, y: 40 },
                      { x: 40, y: 80 },
                      { x: 50, y: 60 },
                    ]}
                    showLegend={true}
                    showTooltip={true}
                    height={200}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Radar Chart Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Radar Chart Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <RadarChartComponent
                    data={[
                      { subject: 'Math', A: 120, B: 110, fullMark: 150 },
                      { subject: 'Science', A: 98, B: 130, fullMark: 150 },
                      { subject: 'English', A: 86, B: 130, fullMark: 150 },
                      { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
                      { subject: 'History', A: 85, B: 90, fullMark: 150 },
                      { subject: 'Sports', A: 65, B: 85, fullMark: 150 },
                    ]}
                    showLegend={true}
                    showTooltip={true}
                    height={200}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Radial Bar Chart Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Radial Bar Chart Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <RadialBarChartComponent
                    data={[
                      { name: '18-24', value: 31, fill: '#8884d8' },
                      { name: '25-29', value: 26, fill: '#83a6ed' },
                      { name: '30-34', value: 22, fill: '#8dd1e1' },
                      { name: '35-39', value: 18, fill: '#82ca9d' },
                      { name: '40-49', value: 15, fill: '#a4de6c' },
                      { name: '50+', value: 10, fill: '#d0ed57' },
                    ]}
                    showLegend={true}
                    showTooltip={true}
                    height={200}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Uploader Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">File Uploader</CardTitle>
              </CardHeader>
              <CardContent>
                <UploaderComponent />
              </CardContent>
            </Card>
            {/* Copy to Clipboard Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Copy to Clipboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CopyToClipboardComponent />
              </CardContent>
            </Card>
            {/* Toast Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <CardHeader className="pb-2 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 mb-2 shadow">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow">Toast Notifications</CardTitle>
                  <div className="flex flex-col gap-2 w-full">
                    <button className="w-full px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-all duration-200" onClick={() => showToast('success')}>Show Success Toast</button>
                    <button className="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition-all duration-200" onClick={() => showToast('error')}>Show Error Toast</button>
                    <button className="w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition-all duration-200" onClick={() => showToast('info')}>Show Info Toast</button>
                    <button className="w-full px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold shadow transition-all duration-200" onClick={() => showToast('warning')}>Show Warning Toast</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="min-h-[40px] flex items-center justify-center"></CardContent>
            </Card>
            {/* Render toasts */}
            {toasts.map((toast) => (
              <Toast key={toast.id} type={toast.type} progress={toast.progress}>
                <div className="flex flex-col gap-1">
                  <ToastTitle>{toast.title}</ToastTitle>
                  <ToastDescription>{toast.description}</ToastDescription>
                </div>
                <ToastClose />
              </Toast>
            ))}
            {/* Scroll Demo Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col items-center p-6">
              <div className="flex flex-col items-center w-full">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-4 mb-3 shadow">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow mb-1">Scroll Demo</CardTitle>
                <div className="text-base text-gray-500 dark:text-gray-300 mb-5 text-center">Experience smooth, custom scrolling in this demo area.</div>
                <div className="w-full max-w-xl h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 custom-scrollbar">
                  <ScrollDemoComponent />
                </div>
              </div>
            </Card>
            {/* Tabs Demo Example */}
            <Card className="col-span-12 md:col-span-6 lg:col-span-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col items-center p-6">
              <div className="flex flex-col items-center w-full">
                <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 p-4 mb-3 shadow">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" fill="currentColor" opacity=".2"/><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="7" y="3" width="10" height="4" rx="1" fill="currentColor"/></svg>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow mb-1">Tabs Demo</CardTitle>
                <div className="text-base text-gray-500 dark:text-gray-300 mb-5 text-center">Switch between different views with beautiful, animated tabs.</div>
                <div className="w-full max-w-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 flex flex-col items-center justify-center transition-all duration-300">
                  <TabsDemoComponent />
                </div>
              </div>
            </Card>
            {/* FullCalendar Example */}
           {/* <Card className="col-span-12 md:col-span-6 lg:col-span-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">FullCalendar Example</CardTitle>
              </CardHeader>
              <CardContent>
                <FullCalendarComponent />
              </CardContent>
            </Card> */}
          </div>
          {/* Customers Section in its own row */}
          <div className="grid grid-cols-12 gap-4">
            <CustomersSection />
          </div>
          {/* Kanban Board */}
          <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-12">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Kanban Board</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <KanbanBoard />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </HelmetWrapper>
    </ToastProvider>
  );
};

export default AdminDashboard;
