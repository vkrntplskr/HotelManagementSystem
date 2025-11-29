import { useEffect, useState } from 'react';
import { dashboardApi } from '../api';

const DashboardCard = ({ title, value, color }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
    <h3 className="text-lg font-semibold opacity-90">{title}</h3>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
    totalActiveBookings: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardApi.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats", error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800">Hotel Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Rooms" value={stats.totalRooms} color="bg-blue-600" />
        <DashboardCard title="Available" value={stats.availableRooms} color="bg-green-500" />
        <DashboardCard title="Booked" value={stats.bookedRooms} color="bg-red-500" />
        <DashboardCard title="Active Bookings" value={stats.totalActiveBookings} color="bg-indigo-600" />
      </div>
    </div>
  );
}