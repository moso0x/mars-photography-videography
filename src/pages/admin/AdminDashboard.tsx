import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Plus,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Menu,
  LogOut,
  Megaphone,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-hot-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCustomers from "./AdminCustomers";
import AdminAnalytics from "./AdminAnalytics";
import AdminSettings from "./AdminSettings";
import AdminAdvertisements from "./AdminAdvertisements";

type TabType =
  | "overview"
  | "orders"
  | "products"
  | "customers"
  | "analytics"
  | "settings"
  | "advertisements";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    checkAdminAccess();
    fetchStats();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Please login");
        navigate("/auth");
        return;
      }

      setUserEmail(data.session.user.email || "");
      setUserName(
        data.session.user.user_metadata?.full_name ||
          data.session.user.email?.split("@")[0] ||
          "Admin"
      );

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        toast.error("Access denied");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const { data: orders } = await supabase.from("orders").select("*");
    const { data: profiles } = await supabase.from("profiles").select("*");
    const { data: products } = await supabase.from("products").select("*");

    const revenue =
      orders?.reduce(
        (sum, o) => sum + Number(o.total_amount || 0),
        0
      ) || 0;

    setStats({
      totalOrders: orders?.length || 0,
      totalRevenue: revenue,
      totalCustomers: profiles?.length || 0,
      totalProducts: products?.length || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const menuItems = [
    { id: "overview" as TabType, label: "Dashboard", icon: LayoutDashboard },
    { id: "orders" as TabType, label: "Orders", icon: ShoppingCart },
    { id: "products" as TabType, label: "Products", icon: Package },
    { id: "customers" as TabType, label: "Customers", icon: Users },
    { id: "advertisements" as TabType, label: "Advertisements", icon: Megaphone },
    { id: "analytics" as TabType, label: "Analytics", icon: BarChart3 },
  ];

  const statCards = [
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingBag },
    {
      title: "Revenue",
      value: `KSh ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
    { title: "Customers", value: stats.totalCustomers, icon: Users },
    { title: "Products", value: stats.totalProducts, icon: Package },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-muted/30 flex">
        {/* SIDEBAR */}
        <motion.aside
          animate={{ width: sidebarCollapsed ? 80 : 256 }}
          className="fixed lg:static inset-y-0 left-0 z-40 bg-white border-r flex flex-col"
        >
          <div className="p-4 border-b flex justify-between items-center">
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-sky-600">Admin</h1>
                <p className="text-xs text-muted-foreground">
                  Store Management
                </p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded hover:bg-muted"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                      activeTab === item.id
                        ? "bg-sky-600 text-white"
                        : "hover:bg-muted"
                    } ${sidebarCollapsed ? "justify-center" : ""}`}
                  >
                    <item.icon size={20} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </TooltipTrigger>
                {sidebarCollapsed && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </motion.aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col">
          {/* HEADER */}
          <header className="sticky top-0 z-10 bg-white border-b px-6 py-3 flex justify-between">
            <h2 className="text-lg font-semibold text-sky-700">
              Admin Dashboard
            </h2>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-sky-600 text-white">
                        {userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings className="mr-2" size={16} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* CONTENT */}
          <div className="p-6 space-y-6">
            {activeTab === "overview" && (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-sky-700">
                      Dashboard Overview
                    </h2>
                    <p className="text-muted-foreground">
                      Welcome to your admin dashboard
                    </p>
                  </div>
                  <Button className="bg-sky-600 hover:bg-sky-700">
                    <Plus className="mr-2" /> Add Product
                  </Button>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {statCards.map((stat, i) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-sky-100 hover:ring-1 hover:ring-sky-500/30">
                        <CardContent className="p-6 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {stat.title}
                            </p>
                            <p className="text-2xl font-bold text-sky-700">
                              {stat.value}
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-sky-600">
                            <stat.icon className="text-white" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* QUICK ACTIONS */}
               <Card className="shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-sky-100">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sky-700">
                        <TrendingUp size={20} />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("orders")}
                      >
                        View Orders
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("products")}
                      >
                        Manage Products
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("advertisements")}
                      >
                        Manage Ads
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("analytics")}
                      >
                        View Analytics
                      </Button>
                    </CardContent>
                  </Card>

              </>
            )}

            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "products" && <AdminProducts />}
            {activeTab === "customers" && <AdminCustomers />}
            {activeTab === "analytics" && <AdminAnalytics />}
            {activeTab === "settings" && <AdminSettings />}
            {activeTab === "advertisements" && <AdminAdvertisements />}
          </div>
        </main>


        {/* Add product Dialog box  */}
        
      </div>
    </TooltipProvider>
  );
};

export default AdminDashboard;
