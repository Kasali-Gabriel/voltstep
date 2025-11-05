'use client';

import { KpiCard } from '@/components/Admin/Cards';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useCustomerTab } from '@/lib/state';
import { CustomerDetailProps } from '@/types/admin';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  DollarSign,
  Package,
  Star,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import CustomerOrdersTab from './CustomerOrdersTab';
import CustomerReviewsTab from './CustomerReviewsTab';
import CustomerTimeline from './CustomerTimeline';
import { BackButton } from '@/components/Buttons/BackButton';

const CustomerDetail = ({
  customer,
  reviews,
  orders,
  spendingData,
  categoryData,
  activities,
}: CustomerDetailProps) => {
  const { activeTab, setActiveTab } = useCustomerTab();

  const tabs = [
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'reviews', label: 'Reviews', icon: Star },
  ];

  return (
    <div className="space-y-6">
      <BackButton />

      {/* Profile Header */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 md:gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={customer.imageUrl || ''} />
              <AvatarFallback className="text-2xl">
                {customer.firstName[0]}
                {customer.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                {customer.firstName} {customer.lastName}
              </h2>

              <p className="text-gray-600">{customer.email}</p>
              <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:gap-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Joined {format(customer.createdAt, 'MMM dd, yyyy')}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  Last active {format(customer.lastActive, 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <KpiCard
          title="Total Orders"
          value={customer.totalOrders}
          icon={<Package className="h-4 w-4 text-gray-400" />}
        />

        <KpiCard
          title="Total Spent"
          value={`$${customer.totalSpent.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4 text-gray-400" />}
        />

        <KpiCard
          title="Avg Order Value"
          value={`$${customer.avgOrderValue.toFixed(2)}`}
          icon={<TrendingUp className="h-4 w-4 text-gray-400" />}
        />

        <KpiCard
          title="Total Reviews"
          value={customer.totalReviews}
          icon={<Star className="h-4 w-4 text-gray-400" />}
        />
      </div>

      {/* Timeline */}
      <CustomerTimeline activities={activities} />

      {/* Tabs */}
      <div className="space-y-6 pt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {activeTab === 'reviews' ? 'Reviews' : 'Orders'}
          </h3>

          <div className="relative flex h-10 w-56 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              layout
              className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-black"
              animate={{
                x: activeTab === 'orders' ? 0 : '100%',
              }}
              transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
            />

            {tabs.map((tab) => {
              const IconComponent = tab.icon;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'reviews' | 'orders')}
                  className={`z-10 flex flex-1 cursor-pointer items-center justify-center gap-2 transition-colors duration-200 ${
                    activeTab === tab.key ? 'text-white' : 'text-black'
                  }`}
                >
                  <IconComponent size={16} />

                  <span className="hidden text-sm sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'reviews' && (
            <CustomerReviewsTab reviews={reviews} loading={false} />
          )}

          {activeTab === 'orders' && (
            <CustomerOrdersTab
              orders={orders}
              spendingData={spendingData}
              categoryData={categoryData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
