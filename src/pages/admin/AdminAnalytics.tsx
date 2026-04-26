import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [ordersByStatus, setOrdersByStatus] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    revenueGrowth: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: orders } = await supabase.from("orders").select("*");
      const { data: orderItems } = await supabase.from("order_items").select("*");

      if (orders) {
        // Calculate stats
        const totalRevenue = orders.reduce(
          (sum, order) => sum + Number(order.total_amount || 0),
          0
        );
        const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          avgOrderValue,
          revenueGrowth: 12.5, // Mock data
        });

        // Revenue by day (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toISOString().split("T")[0];
        });

        const revenueByDay = last7Days.map((day) => {
          const dayOrders = orders.filter(
            (order) => order.created_at.split("T")[0] === day
          );
          const revenue = dayOrders.reduce(
            (sum, order) => sum + Number(order.total_amount || 0),
            0
          );
          return {
            date: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
            revenue,
            orders: dayOrders.length,
          };
        });

        setRevenueData(revenueByDay);

        // Orders by status
        const statusCounts = orders.reduce((acc: any, order) => {
          acc[order.payment_status] = (acc[order.payment_status] || 0) + 1;
          return acc;
        }, {});

        setOrdersByStatus(
          Object.entries(statusCounts).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
          }))
        );
      }

      // Top products
      if (orderItems) {
        const productCounts = orderItems.reduce((acc: any, item) => {
          acc[item.product_title] = (acc[item.product_title] || 0) + item.quantity;
          return acc;
        }, {});

        const sorted = Object.entries(productCounts)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, value]) => ({ name, value }));

        setTopProducts(sorted);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold">Analytics</h2>
        <p className="text-muted-foreground">Track your store performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  KSh {stats.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <TrendingUp size={16} className="mr-1" />
                  +{stats.revenueGrowth}%
                </div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <DollarSign className="text-green-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <TrendingUp size={16} className="mr-1" />
                  +8.2%
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <ShoppingBag className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">
                  KSh {stats.avgOrderValue.toLocaleString()}
                </p>
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <TrendingDown size={16} className="mr-1" />
                  -2.1%
                </div>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Calendar className="text-purple-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <TrendingUp size={16} className="mr-1" />
                  +0.8%
                </div>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Users className="text-orange-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ordersByStatus.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
