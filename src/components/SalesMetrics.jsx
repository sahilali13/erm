import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';

import { INITIAL_ORDERS } from '../assets/Data';
import { Metric, MetricContent } from '../widgets/GeneralWidgets';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export default function SalesMetrics({ showGraph }) {
	const {
		totalRevenue,
		numOrders,
		totalUnitsSold,
		averageOrderValue,
		chartData,
		chartOptions,
	} = calculateMetrics();

	return (
		<MetricContent
			showGraph={showGraph}
			content={renderMetrics(
				totalRevenue,
				numOrders,
				totalUnitsSold,
				averageOrderValue
			)}
			graph={renderChart(chartData, chartOptions)}
		/>
	);
}

function calculateMetrics() {
	const orders = INITIAL_ORDERS;
	const totalRevenue = orders.reduce(
		(total, order) => total + order.totalPrice,
		0
	);
	const numOrders = orders.length;
	const totalUnitsSold = orders.reduce(
		(total, order) =>
			total +
			order.items.reduce(
				(orderTotal, item) => orderTotal + item.quantity,
				0
			),
		0
	);
	const averageOrderValue = totalRevenue / numOrders;

	const filteredOrders = INITIAL_ORDERS.filter(
		(order) => new Date(order.orderDate * 1000).getFullYear() === 2024
	);
	const { chartLabels, revenueData, cumulativeRevenueData } =
		processChartData(filteredOrders);

	const chartData = {
		datasets: [
			{
				label: 'Revenue Trend',
				data: revenueData,
				fill: false,
				borderColor: 'rgba(13, 66, 236, 1)',
				tension: 0.1,
			},
			{
				label: 'Cumulative Revenue',
				data: cumulativeRevenueData,
				fill: true,
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				tension: 0.1,
			},
		],
	};

	const chartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			x: {
				type: 'category',
				labels: chartLabels,
				title: {
					display: true,
					text: 'Month',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Revenue',
				},
			},
		},
	};

	return {
		totalRevenue,
		numOrders,
		totalUnitsSold,
		averageOrderValue,
		chartData,
		chartOptions,
	};
}

function processChartData(filteredOrders) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const chartLabels = [];
	const revenueData = [];
	let cumulativeRevenue = 0;
	const cumulativeRevenueData = [];

	filteredOrders.forEach((order) => {
		const monthIndex = new Date(order.orderDate * 1000).getMonth();
		const monthName = monthNames[monthIndex];
		const totalPrice = order.totalPrice;

		if (!chartLabels.includes(monthName)) {
			chartLabels.push(monthName);
			revenueData.push(totalPrice);
			cumulativeRevenue += totalPrice;
			cumulativeRevenueData.push(cumulativeRevenue);
		} else {
			const index = chartLabels.indexOf(monthName);
			revenueData[index] += totalPrice;
			cumulativeRevenueData[index] += cumulativeRevenue;
		}
	});

	return { chartLabels, revenueData, cumulativeRevenueData };
}

function renderMetrics(
	totalRevenue,
	numOrders,
	totalUnitsSold,
	averageOrderValue
) {
	return (
		<div className='grid grid-cols-2 gap-4'>
			<Metric
				label='Total Revenue'
				value={`₹${totalRevenue.toFixed(2)}`}
			/>
			<Metric
				label='Number of Orders'
				value={numOrders}
			/>
			<Metric
				label='Average Order Value'
				value={`₹${averageOrderValue.toFixed(2)}`}
			/>
			<Metric
				label='Total Units Sold'
				value={totalUnitsSold}
			/>
		</div>
	);
}

function renderChart(chartData, chartOptions) {
	return (
		<div>
			<Line
				data={chartData}
				options={chartOptions}
			/>
		</div>
	);
}
