import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import axios from "axios";

const PieChart = () => {
  const [billRevenueCompare, setBillRevenueCompare] = useState({});
  const data = [
    {
      type: "In Store",
      value: billRevenueCompare.inStoreRevenue,
    },
    {
      type: "Online",
      value: billRevenueCompare.onlineRevenue,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/bill/getBillRevenueCompare")
      .then((res) => {
        setBillRevenueCompare(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <Pie {...config} />;
};

export default PieChart;
