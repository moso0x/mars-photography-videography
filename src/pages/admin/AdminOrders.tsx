import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Package
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_title: string;
  product_price: string;
  quantity: number;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId: string) => {
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    setOrderItems(data || []);
  };

  const viewOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
    setDialogOpen(true);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    const { error } = await supabase
      .from("orders")
      .update({ payment_status: newStatus })
      .eq("id", orderId);

    if (!error) {
      setOrders(orders.map(o =>
        o.id === orderId ? { ...o, payment_status: newStatus } : o
      ));
      toast.success("Order status updated");
    }
    setUpdatingStatus(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "cancelled":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-yellow-500" size={16} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return map[status] || map.pending;
  };

  const filteredOrders = orders.filter(o =>
    (o.customer_name + o.customer_email)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) &&
    (statusFilter === "all" || o.payment_status === statusFilter)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-blue-700">Orders</h2>
        <p className="text-blue-600/70">Manage customer orders</p>
      </div>

      {/* Filters */}
      <Card className="border-blue-100">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <Input
                className="pl-10 focus-visible:ring-blue-500"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 border-blue-200 focus:ring-blue-500">
                <Filter size={16} className="mr-2 text-blue-500" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Package size={20} />
            Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs text-blue-600">
                    {order.id.slice(0, 8)}…
                  </TableCell>

                  <TableCell>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer_email}
                    </p>
                  </TableCell>

                  <TableCell className="font-semibold text-blue-700">
                    KSh {order.total_amount.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Select
                      value={order.payment_status}
                      onValueChange={(v) => updateOrderStatus(order.id, v)}
                      disabled={updatingStatus === order.id}
                    >
                      <SelectTrigger className={`w-32 ${getStatusBadge(order.payment_status)}`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.payment_status)}
                          {order.payment_status}
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="capitalize">
                    {order.payment_method}
                  </TableCell>

                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-blue-600 hover:bg-blue-50"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <Eye size={16} /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Order Details Dialog */}
<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="max-w-2xl border-blue-200">
    <DialogHeader>
      <DialogTitle className="text-blue-700">
        Order Details
      </DialogTitle>
    </DialogHeader>

    {selectedOrder && (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Customer Name</p>
            <p className="font-medium">{selectedOrder.customer_name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{selectedOrder.customer_email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{selectedOrder.customer_phone}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="font-medium capitalize">
              {selectedOrder.payment_method}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-blue-700">Order Items</h4>
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 rounded-lg bg-blue-50"
              >
                <div>
                  <p className="font-medium">{item.product_title}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {item.product_price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-blue-700">
            KSh {Number(selectedOrder.total_amount).toLocaleString()}
          </span>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>

    </motion.div>
  );
};

export default AdminOrders;
