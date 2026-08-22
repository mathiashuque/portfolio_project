import {
  LayoutGrid,
  Gauge,
  Database,
  Binary,
  Code2,
  GraduationCap,
} from "lucide-react";
import type { ServiceIconKey } from "./types";

export const serviceIcons: Record<ServiceIconKey, React.ReactNode> = {
  layoutGrid: <LayoutGrid className="h-5 w-5" />,
  gauge: <Gauge className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  binary: <Binary className="h-5 w-5" />,
  code2: <Code2 className="h-5 w-5" />,
  graduationCap: <GraduationCap className="h-5 w-5" />,
};
