import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-[#AAC832] transition"
        >
          <ShoppingCart className="h-4 w-4 text-white hover:text-[#AAC832]" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-white text-black font-bold border-2 border-white shadow-md">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-white border-l-4 border-blue-500 text-xs">
        <SheetHeader>
          <SheetTitle className="text-blue-600 font-bold text-xs">
            Shopping Cart ({getTotalItems()} items) 
            
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 text-xs">
              <div className="bg-blue-100 p-4 rounded-full mb-3 shadow-inner">
                <ShoppingCart className="h-12 w-12 text-blue-500" />
              </div>
              <p className="font-medium text-gray-900 text-xs">
                Your cart is empty
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Add some items to get started
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 border-b pb-3 border-gray-200 hover:bg-blue-50 rounded-md transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-md border border-blue-200"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-xs">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Ksh. {item.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 border-blue-300 hover:bg-blue-100"
                        onClick={() =>
                          updateQuantity(item.title, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3 text-blue-600" />
                      </Button>

                      <span className="text-xs font-medium w-6 text-center text-gray-900">
                        {item.quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 border-blue-300 hover:bg-blue-100"
                        onClick={() =>
                          updateQuantity(item.title, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3 text-blue-600" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 ml-auto hover:text-red-600"
                        onClick={() => removeFromCart(item.title)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-3 space-y-3 border-t border-gray-200">
                <div className="flex justify-between font-bold text-xs text-gray-900">
                  <span>Total:</span>
                  <span className="text-blue-700">
                    Ksh. {getTotalPrice().toLocaleString()}
                  </span>
                </div>

                <Button
                  className="w-[45%] mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-xs h-8 hover:bg-blue-700 transition"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
