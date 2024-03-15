import { useState } from 'react';

import { IoMdEye } from 'react-icons/io';

import { CUSTOMERS, INITIAL_PRODUCTS } from '../assets/Data';
import CustomerSummary from './CustomerSummary';
import DateFromTimestamp from '../helpers/DateFromTimestamp';
import { OrderDetailRow } from '../widgets/TableWidgets';

export default function OrderSummary({ isOpen, order, onClose }) {
	const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);

	if (!isOpen) return null;

	function renderOrderDetailRow(label, value) {
		return (
			<OrderDetailRow
				label={label}
				value={value}
			/>
		);
	}

	function getCustomerName(customerID) {
		const customer = CUSTOMERS.find(
			(cust) => cust.customerID === customerID
		);
		return customer ? customer.customerName : 'Unknown Customer';
	}

	function getProductName(productID) {
		const product = INITIAL_PRODUCTS.find((prod) => prod.id === productID);
		return product ? product.name : 'Unknown Product';
	}

	function handleViewCustomerInfo() {
		setShowCustomerInfoModal(true);
	}

	return (
		<>
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'></div>
			<dialog
				open={isOpen}
				className='fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded-lg'
			>
				<div className='bg-white rounded-lg shadow-lg w-screen max-w-lg overflow-auto'>
					<div className='modal-content p-4 overflow-h-auto'>
						<h2 className='text-lg font-bold mb-4 text-entntblue'>
							Order Details
						</h2>
						<table className='w-full mb-4'>
							<tbody>
								{renderOrderDetailRow('Order ID', order.id)}
								{renderOrderDetailRow(
									'Customer Name',
									<>
										{getCustomerName(order.customerID)}{' '}
										<div className='mt-1'>
											<button
												onClick={handleViewCustomerInfo}
												className='text-entntblue text-lg'
											>
												<IoMdEye />
											</button>
										</div>
									</>
								)}
								{renderOrderDetailRow(
									'Order Date',
									DateFromTimestamp(order.orderDate)
								)}
								{renderOrderDetailRow('Status', order.status)}
								{renderOrderDetailRow(
									'Total Price',
									order.totalPrice.toFixed(2)
								)}
								{renderOrderDetailRow(
									'Delivery Date',
									DateFromTimestamp(order.deliveryDate)
								)}
								{renderOrderDetailRow(
									'Payment Method',
									order.paymentMethod
								)}
								{renderOrderDetailRow(
									'Shipping Address',
									`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`
								)}
							</tbody>
						</table>
						<h3 className='text-lg font-bold mt-4'>Items:</h3>
						<ul>
							{order.items.map((item) => {
								return (
									<li key={item.productId}>
										{getProductName(item.productId)} -
										Quantity: {item.quantity}, Price: ₹
										{item.price.toFixed(2)}
									</li>
								);
							})}
						</ul>
						<button
							onClick={onClose}
							className='mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded md:ml-96 mx-auto'
						>
							Close
						</button>
					</div>
				</div>
			</dialog>
			{showCustomerInfoModal && (
				<CustomerSummary
					customerID={order.customerID}
					onClose={() => setShowCustomerInfoModal(false)}
				/>
			)}
		</>
	);
}
