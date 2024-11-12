import React, { useState } from 'react';
import {
  Users,
  ChevronDown,
  DollarSign,
  ShoppingCart,
  Package
} from 'lucide-react';
import Dashnav from './components/Dashnav';



const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${
            trend.type === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <ChevronDown className={`h-4 w-4 ${trend.type === 'up' ? 'rotate-180' : ''}`} />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      <Dashnav/>
      
      <main className=" p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back to your beverage store dashboard</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Revenue"
            value="$24,560"
            icon={DollarSign}
            trend={{ type: 'up', value: '12.5%' }}
          />
          <StatsCard
            title="Total Orders"
            value="1,483"
            icon={ShoppingCart}
            trend={{ type: 'up', value: '8.2%' }}
          />
          <StatsCard
            title="Active Customers"
            value="892"
            icon={Users}
            trend={{ type: 'down', value: '2.4%' }}
          />
          <StatsCard
            title="Products Sold"
            value="3,642"
            icon={Package}
            trend={{ type: 'up', value: '5.8%' }}
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-lg">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Order ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Customer</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Product</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    id: '#12345',
                    customer: 'John Doe',
                    product: 'Sparkling Water (6-pack)',
                    amount: '$12.99',
                    status: 'Delivered'
                  },
                  {
                    id: '#12346',
                    customer: 'Jane Smith',
                    product: 'Green Tea (12-pack)',
                    amount: '$24.99',
                    status: 'Processing'
                  },
                ].map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{order.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;