import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { defaults } from 'chart.js';

defaults.font.family = 'IBM Plex Mono'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
      fontFamily: 'IBM Plex Mono'
    },
    tooltip: {
      backgroundColor: '#000',
      cornerRadius: 0
    }
  },
  scales: {
    y: {
      ticks: { color: '#000', beginAtZero: true },
      grid: {color: '#E4E9F7', borderColor: 'transparent'}
    },
    x: {
      ticks: { color: '#000', beginAtZero: true },
      grid: {color: 'transparent', borderColor: '#000'}
    },

  }
}




const BarChart = ({data}) => {
  return (
    <Bar options={options} data={data} />
  );
};



export default BarChart
