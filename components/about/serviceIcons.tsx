import {
  LayoutGrid,
  Smartphone,
  Gauge,
  CreditCard,
  ShoppingCart,
  Database,
} from "lucide-react";
import type { ServiceIconKey } from "./types";

export const serviceIcons: Record<ServiceIconKey, React.ReactNode> = {
  layoutGrid: <LayoutGrid className="h-5 w-5" />,
  smartphone: <Smartphone className="h-5 w-5" />,
  gauge: <Gauge className="h-5 w-5" />,
  creditCard: <CreditCard className="h-5 w-5" />,
  shoppingCart: <ShoppingCart className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
};
