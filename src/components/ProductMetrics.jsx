import { INITIAL_ORDERS, INITIAL_PRODUCTS } from '../assets/Data';
import { Pie } from 'react-chartjs-2';
import { MetricContent } from '../widgets/GeneralWidgets';
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

export default function ProductMetrics({ showGraph }) {
	const orders = INITIAL_ORDERS;
	const products = INITIAL_PRODUCTS;

	const productSalesMap = orders.reduce((salesMap, order) => {
		order.items.forEach((item) => {
			salesMap[item.productId] =
				(salesMap[item.productId] || 0) + item.quantity;
		});
		return salesMap;
	}, {});

	const bestSellingProductIds = Object.keys(productSalesMap)
		.sort((a, b) => productSalesMap[b] - productSalesMap[a])
		.slice(0, 3);

	const bestSellingProducts = bestSellingProductIds.map((productId) => {
		const product = products.find((p) => p.id === productId);
		return product.name;
	});

	const inventoryAlertProducts = products.filter(
		(product) => product.stockQuantity < 50
	);

	const totalItemsSold = Object.values(productSalesMap).reduce(
		(total, quantity) => total + quantity,
		0
	);

	const marketShareData = {
		labels: products.map((product) => product.name),
		datasets: [
			{
				label: 'Market Share',
				data: products.map(
					(product) =>
						(productSalesMap[product.id] / totalItemsSold) * 100
				),
				backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56',
					'#4BC0C0',
					'#9966FF',
				],
			},
		],
	};

	const marketShareOptions = {
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
					<div className='max-h-full overflow-auto'>
						<h2 className='text-lg font-semibold mb-2 sticky top-0 bg-white'>
							Best Selling Products
						</h2>
						<ul>
							{bestSellingProducts.map((product, index) => (
								<li key={index}>{product}</li>
							))}
						</ul>
					</div>
					<div className='max-h-full overflow-auto'>
						<h2 className='text-lg font-semibold mb-2 sticky top-0 bg-white'>
							Inventory Alert
						</h2>
						<ul>
							{inventoryAlertProducts.map((product, index) => (
								<li key={index}>
									{product.name} - {product.stockQuantity}
								</li>
							))}
						</ul>
					</div>
				</div>
			}
			graph={
				<div className='max-h-full overflow-auto'>
					<Pie
						data={marketShareData}
						options={marketShareOptions}
					/>
				</div>
			}
		/>
	);
}
