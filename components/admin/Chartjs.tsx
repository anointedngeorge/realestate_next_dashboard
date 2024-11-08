"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useCustomSSR } from '@/app/custom_hooks';
import { APIBASEURl } from '@/app/interface';

Chart.register(...registerables);

const Chartjs: React.FC = () => {
  const [monthList, setMonthList] = useState<string[]>(['Jan', 'Feb', 'Mar']);
  const [amountList, setAmountList] = useState<number[]>([0, 0, 0]);

  const { ssrdata } = useCustomSSR({
    url: `${APIBASEURl}/chart/sales/chart/month/`,
    headers: {},
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (ssrdata?.month_list && ssrdata?.amount_list) {
      setMonthList(ssrdata.month_list);
      setAmountList(ssrdata.amount_list);
    }
  }, [ssrdata]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Destroy any existing chart instance
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart instance
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: monthList,
            datasets: [
              {
                label: "Sale's Summary",
                data: amountList,
                backgroundColor: 'rgba(223,57,47, 0.4)',
                borderColor: 'rgba(223,57,47, 0.4)',
                borderWidth: 10,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [monthList, amountList]);

  return (
    <canvas className="w-full h-72 max-sm:w-full max-sm:h-40" ref={canvasRef} />
  );
};

export default Chartjs;
