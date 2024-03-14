import { Pie } from 'react-chartjs-2';

import { INITIAL_ORDERS } from '../assets/Data';
import { Metric, MetricContent } from '../widgets/GeneralWidgets';

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
	ArcElement,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	ArcElement
);

export default function OrderMetrics({ showGraph }) {
	const orders = INITIAL_ORDERS;

	const processingTimes = orders.map(
		(order) => (order.deliveryDate - order.orderDate) / (60 * 60 * 24)
	);
	const averageProcessingTime = (
		processingTimes.reduce((total, time) => total + time, 0) / orders.length
	).toFixed(0);

	const statusCounts = orders.reduce((counts, order) => {
		counts[order.status] = (counts[order.status] || 0) + 1;
		return counts;
	}, {});

	const pendingOrders = orders.filter((order) => order.status === 'Pending');
	const orderBacklog = pendingOrders.length;

	const pieChartData = {
		labels: Object.keys(statusCounts),
		datasets: [
			{
				data: Object.values(statusCounts),
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
				hoverBackgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56',
					'#4BC0C0',
				],
			},
		],
	};

	const pieChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				position: 'right',
			},
		},
	};

	return (
		<MetricContent
			showGraph={showGraph}
			content={
				<div className='grid grid-cols-2 h-full max-h-[90%]'>
					<div className='grid gap-4 h-[50%]'>
						<Metric
							label='Average Order Processing Time (Days)'
							value={averageProcessingTime}
						/>
						<Metric
							label='Order Backlog'
							value={orderBacklog}
						/>
					</div>
					<div className='max-h-full overflow-auto'>
						<h2 className='text-lg font-semibold mb-2 sticky top-0 bg-stone-200'>
							Backlog
						</h2>
						<ul>
							{pendingOrders.map((order) => (
								<li key={order.id}>{'Order #' + order.id}</li>
							))}
						</ul>
					</div>
				</div>
			}
			graph={
				<Pie
					data={pieChartData}
					options={pieChartOptions}
				/>
			}
		/>
	);
}
