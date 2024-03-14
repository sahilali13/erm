import { useState } from 'react';

import { Bar } from 'react-chartjs-2';
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
	BarElement,
} from 'chart.js';

import { INITIAL_ORDERS, CUSTOMERS } from '../assets/Data';
import { Metric, MetricContent } from '../widgets/GeneralWidgets';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	BarElement
);

export default function CustomerMetrics({ showGraph }) {
	const orders = INITIAL_ORDERS;

	const customerSpending = getSortedcustomerSpending();

	const topThreeCustomers = getTopThreeCustomers(customerSpending);
	const totalCustomers = CUSTOMERS.length;

	const chartData = getChartData(customerSpending);

	const chartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			x: {
				title: {
					display: true,
					text: 'Customers',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Total Spend',
				},
			},
		},
	};

	return (
		<MetricContent
			showGraph={showGraph}
			content={
				<div className='grid grid-cols-2 gap-4'>
					<div className='grid gap-4'>
						<Metric
							label='Number of Customers'
							value={totalCustomers}
						/>
						<Metric
							label='Average Customer Acquisition'
							value={2}
						/>
					</div>
					<div>
						<h2 className='text-lg font-semibold mb-2'>
							Top Customers
						</h2>
						{topThreeCustomers.map((customer, index) => (
							<p key={index}>
								{getCustomerName(customer[0], index)}:{' ₹'}
								{customer[1].toFixed(0)}
							</p>
						))}
					</div>
				</div>
			}
			graph={
				<Bar
					data={chartData}
					options={chartOptions}
				/>
			}
		/>
	);

	function getSortedcustomerSpending() {
		const customerSpendMap = new Map();

		orders.forEach((order) => {
			const customerId = order.customerID;
			const totalPrice = order.totalPrice;
			if (customerSpendMap.has(customerId)) {
				customerSpendMap.set(
					customerId,
					customerSpendMap.get(customerId) + totalPrice
				);
			} else {
				customerSpendMap.set(customerId, totalPrice);
			}
		});

		return Array.from(customerSpendMap.entries()).sort(
			(a, b) => b[1] - a[1]
		);
	}

	function getTopThreeCustomers(customerSpending) {
		return customerSpending.slice(0, 3);
	}

	function getCustomerName(customerId, index) {
		if (index < 3) {
			const customer = CUSTOMERS.find(
				(customer) => customer.customerID === customerId
			);
			return customer ? customer.customerName : `Unknown Customer`;
		}
		return 'Others';
	}

	function getChartData(customerSpending) {
		const topThreeChartData = customerSpending
			.slice(0, 3)
			.map(([customerId], index) => ({
				label: getCustomerName(customerId, index),
				data: customerSpending[index][1],
				backgroundColor: 'rgba(13, 66, 236, 1)',
				borderColor: 'rgba(13, 66, 236, 1)',
				borderWidth: 1,
			}));

		const othersTotalSpend = customerSpending
			.slice(3)
			.reduce((total, [, totalSpend]) => total + totalSpend, 0);

		const labels = [
			...topThreeChartData.map((data) => data.label),
			'Others',
		];
		const data = [
			...topThreeChartData.map((data) => data.data),
			othersTotalSpend,
		];
		const backgroundColor = [
			...topThreeChartData.map((data) => data.backgroundColor),
			'rgba(75, 192, 192, 0.5)',
		];
		const borderColor = [
			...topThreeChartData.map((data) => data.borderColor),
			'rgba(75, 192, 192, 1)',
		];

		return {
			labels,
			datasets: [
				{
					label: 'Total Spend',
					data,
					backgroundColor,
					borderColor,
					borderWidth: 1,
				},
			],
		};
	}
}
