import { CUSTOMERS, INITIAL_ORDERS } from '../assets/Data';
import DateFromTimestamp from '../helpers/DateFromTimestamp';
import { OrderDetailRow } from '../widgets/TableWidgets';

export default function CustomerSummary({ customerID, onClose }) {
	// Find customer by ID
	const customer = CUSTOMERS.find(
		(customer) => customer.customerID === customerID
	);

	// If customer not found, return null
	if (!customer) return null;

	// Filter orders for the customer
	const customerOrders = INITIAL_ORDERS.filter(
		(order) => order.customerID === customerID
	);

	// Calculate default address
	const defaultAddress =
		customerOrders.length > 0 ? customerOrders[0].shippingAddress : null;

	// Calculate total orders
	const totalOrders = customerOrders.length;

	// Calculate average order value
	const avgOrderValue =
		totalOrders > 0
			? customerOrders.reduce((sum, order) => sum + order.totalPrice, 0) /
			  totalOrders
			: 0;

	// Render order detail row component
	function renderOrderDetailRow(label, value) {
		return (
			<OrderDetailRow
				label={label}
				value={value}
			/>
		);
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'>
			<dialog
				open={true}
				className='fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded-lg'
			>
				<div className='bg-white rounded-lg shadow-lg w-screen max-w-lg overflow-auto'>
					<div className='modal-content p-4 overflow-h-auto'>
						<h2 className='text-lg font-bold mb-4 text-entntblue'>
							Customer Information
						</h2>
						<table className='w-full mb-4 table-auto'>
							<tbody>
								{renderOrderDetailRow(
									'Customer ID',
									customer.customerID
								)}
								{renderOrderDetailRow(
									'Customer Name',
									customer.customerName
								)}
								{defaultAddress &&
									renderOrderDetailRow(
										'Default Address',
										`${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.postalCode}`
									)}
								{renderOrderDetailRow(
									'Total Number of Orders',
									totalOrders
								)}
								{renderOrderDetailRow(
									'Average Order Value',
									`₹${avgOrderValue.toFixed(2)}`
								)}
							</tbody>
						</table>
						<h3 className='text-lg font-bold mt-4'>
							Orders Placed:
						</h3>
						<table className='w-full mb-4'>
							<thead>
								<tr>
									<th>Order ID</th>
									<th>Order Date</th>
									<th>Delivery Date</th>
								</tr>
							</thead>
							<tbody>
								{customerOrders.map((order) => (
									<tr key={order.id}>
										<td className='text-center'>
											{order.id}
										</td>
										<td className='text-center'>
											{DateFromTimestamp(order.orderDate)}
										</td>
										<td className='text-center'>
											{DateFromTimestamp(
												order.deliveryDate
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<button
							onClick={onClose}
							className='mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded md:ml-96 mx-auto'
						>
							Close
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
}
