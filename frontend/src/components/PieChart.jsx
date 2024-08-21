import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/pie-chart?month=${month}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching pie chart data:', error);
            }
        };
        fetchData();
    }, [month]);

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Item Distribution',
                data: Object.values(data),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
