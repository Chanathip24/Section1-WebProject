import React from "react";
import { ChevronDown } from "lucide-react";
const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
        {trend && (
          <div
            className={`flex items-center mt-2 text-sm ${
              trend.type === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            <ChevronDown
              className={`h-4 w-4 ${trend.type === "up" ? "rotate-180" : ""}`}
            />
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

export default StatsCard;
