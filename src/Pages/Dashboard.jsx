import { useState } from 'react';

import { VscGraphLine } from 'react-icons/vsc';
import { MdDashboard } from 'react-icons/md';

import SalesMetrics from '../components/SalesMetrics';
import ProductMetrics from '../components/ProductMetrics';
import CustomerMetrics from '../components/CustomerMetrics';
import OrderMetrics from '../components/OrderMetrics';

const metricsData = [
	{ component: SalesMetrics, title: 'Sales' },
	{ component: CustomerMetrics, title: 'Customer' },
	{ component: OrderMetrics, title: 'Order' },
	{ component: ProductMetrics, title: 'Product' },
];

export default function Dashboard() {
	const [visibility, setVisibility] = useState({
		sales: false,
		customer: false,
		orders: false,
		product: false,
	});

	function toggleVisibility(section) {
		setVisibility({ ...visibility, [section]: !visibility[section] });
	}

	return (
		<div className='container mx-auto mt-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
				{metricsData.map((item, index) => {
					const Icon = visibility[item.title.toLowerCase()]
						? MdDashboard
						: VscGraphLine;

					const buttonText = visibility[item.title.toLowerCase()]
						? 'Show Metrics'
						: 'Show Graph';

					return (
						<div
							key={index}
							className='bg-stone-200 p-4 rounded-lg h-[17rem]'
						>
							<div className='flex justify-between items-center mb-2'>
								<h2 className='text-xl font-semibold'>
									{item.title}
								</h2>
								<div>
									<button
										onClick={() =>
											toggleVisibility(
												item.title.toLowerCase()
											)
										}
										className='text-sm text-blue-500 focus:outline-none flex items-center'
									>
										<Icon className='font-semibold text-xl hover:font-bold hover:text-2xl text-entntblue' />
										<span className='ml-2'>
											{buttonText}
										</span>
									</button>
								</div>
							</div>
							<item.component
								showGraph={visibility[item.title.toLowerCase()]}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
