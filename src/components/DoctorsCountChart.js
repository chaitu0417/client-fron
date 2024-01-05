import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ dataURL }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(dataURL);
            const chartData = response.data;

            // Adjust chart data and options according to the fetched data
            // Replace this with the specific chart data format required

            const data = {
                labels: chartData.labels,
                datasets: [
                    {
                        label: chartData.label,
                        backgroundColor: chartData.backgroundColor,
                        borderColor: chartData.borderColor,
                        borderWidth: 1,
                        data: chartData.values,
                    },
                ],
            };

            const options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                },
                legend: {
                    display: false,
                },
            };

            setChartData(data);
            setChartOptions(options);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;
