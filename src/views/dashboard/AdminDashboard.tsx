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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AdminDashboard = () => {
  return (
    <HelmetWrapper title="Admin Dashboard | HorizonX">
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
          {/* FullCalendar Example */}
          <Card className="col-span-12 md:col-span-6 lg:col-span-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">FullCalendar Example</CardTitle>
            </CardHeader>
            <CardContent>
              <FullCalendarComponent />
            </CardContent>
          </Card>
        </div>
        {/* Customers Section in its own row */}
        <div className="grid grid-cols-12 gap-4">
          <CustomersSection />
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default AdminDashboard;
