import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Layers, Star, User, Home, Settings, Info } from 'lucide-react';
import 'react-tabs/style/react-tabs.css';

const tabBase =
  'flex items-center gap-2 px-5 py-2 text-base font-semibold rounded-lg transition-all duration-200 cursor-pointer focus:outline-none';
const tabActive =
  'bg-blue-500 text-white shadow-lg scale-105';
const tabInactive =
  'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900';

const TabsDemoComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Horizontal Tabs */}
      <div>
        <div className="font-semibold mb-2 text-lg text-blue-700 dark:text-blue-300">Horizontal Tabs</div>
        <Tabs selectedTabClassName="!bg-blue-500 !text-white !shadow-lg !scale-105">
          <TabList className="flex gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-700 mb-4" selectedTabClassName="!bg-blue-500 !text-white !shadow-lg !scale-105">
            <Tab className={tabBase + ' ' + tabInactive}><Layers className="w-5 h-5" />Tab 1</Tab>
            <Tab className={tabBase + ' ' + tabInactive}><Star className="w-5 h-5" />Tab 2</Tab>
            <Tab className={tabBase + ' ' + tabInactive}><User className="w-5 h-5" />Tab 3</Tab>
          </TabList>
          <TabPanel>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 transition-all duration-300">Content for Tab 1</div>
          </TabPanel>
          <TabPanel>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 transition-all duration-300">Content for Tab 2</div>
          </TabPanel>
          <TabPanel>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 transition-all duration-300">Content for Tab 3</div>
          </TabPanel>
        </Tabs>
      </div>
      {/* Vertical Tabs */}
      <div>
        <div className="font-semibold mb-2 text-lg text-blue-700 dark:text-blue-300">Vertical Tabs</div>
        <div className="flex gap-4">
          <Tabs selectedTabClassName="!bg-blue-500 !text-white !shadow-lg !scale-105">
            <TabList className="flex flex-col min-w-[140px] gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
              <Tab className={tabBase + ' ' + tabInactive}><Home className="w-5 h-5" />Tab A</Tab>
              <Tab className={tabBase + ' ' + tabInactive}><Settings className="w-5 h-5" />Tab B</Tab>
              <Tab className={tabBase + ' ' + tabInactive}><Info className="w-5 h-5" />Tab C</Tab>
            </TabList>
            <div className="flex-1 border rounded-xl p-6 bg-white dark:bg-gray-800 shadow transition-all duration-300 ml-2">
              <TabPanel>
                <div>Content for Tab A</div>
              </TabPanel>
              <TabPanel>
                <div>Content for Tab B</div>
              </TabPanel>
              <TabPanel>
                <div>Content for Tab C</div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabsDemoComponent; 