import { useState } from 'react';

import { FaList, FaCalendarAlt } from 'react-icons/fa';

import { INITIAL_ORDERS as initialOrdersData } from '../assets/Data';
import OrdersTable from '../components/OrdersTable';
import OrdersForm from '../components/OrdersForm';
import OrderSummary from '../components/OrderSummary';
import CalendarView from '../components/CalendarView';

import { IconButton, TD } from '../widgets/TableWidgets';
import DateFromTimestamp from '../helpers/DateFromTimestamp';

let sortedOrders = { id: 1, orderDate: 1, estimatedDeliveryDate: 1, status: 1 };

export default function OrdersManagement() {
	const [searchTerm, setSearchTerm] = useState('');
	const [initialOrders, setInitialOrders] = useState(initialOrdersData);
	const [filteredOrders, setFilteredOrders] = useState(initialOrders);
	const [editOrderStarted, setEditOrderStarted] = useState(false);
	const [currentOrder, setCurrentOrder] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inCalendarView, setInCalendarView] = useState(false);

	function handleSearch(event) {
		const searchTerm = event.target.value.toLowerCase();
		setSearchTerm(searchTerm);
		const filtered = initialOrders.filter((order) =>
			order.id.toLowerCase().includes(searchTerm)
		);
		setFilteredOrders(filtered);
	}

	function sortTable(sortCriteria) {
		const sorted = [...initialOrders];
		const { id, orderDate, estimatedDeliveryDate, status } = sortedOrders;
		switch (sortCriteria) {
			case 'ID':
				sorted.sort((a, b) => id * a.id.localeCompare(b.id));
				sortedOrders.id *= -1;
				break;
			case 'Status':
				sorted.sort(
					(a, b) => status * a.status.localeCompare(b.status)
				);
				sortedOrders.status *= -1;
				break;
			case 'Order Date':
				sorted.sort((a, b) => orderDate * (a.orderDate - b.orderDate));
				sortedOrders.orderDate *= -1;
				break;
			default:
				sorted.sort(
					(a, b) =>
						estimatedDeliveryDate *
						(a.estimatedDeliveryDate - b.estimatedDeliveryDate)
				);
				sortedOrders.estimatedDeliveryDate *= -1;
				break;
		}
		setInitialOrders(sorted);
		setFilteredOrders(sorted);
	}

	function handleEditOrder(order) {
		setCurrentOrder(order);
		setEditOrderStarted(true);
	}

	function editOrder(updatedOrder) {
		const updatedOrders = initialOrders.map((order) =>
			order.id === updatedOrder.id ? { ...updatedOrder } : order
		);
		setInitialOrders(updatedOrders);
		setFilteredOrders(updatedOrders);
		setEditOrderStarted(false);
		setSearchTerm('');
	}

	function handleClose() {
		setFilteredOrders(filteredOrders);
		setEditOrderStarted(false);
	}

	function handleDeleteOrder(id) {
		const shouldDelete = window.confirm(
			'Are you sure you want to delete this product?'
		);
		if (shouldDelete) {
			const updatedOrders = initialOrders.filter(
				(order) => order.id !== id
			);
			setInitialOrders(updatedOrders);
			setFilteredOrders(updatedOrders);
		}
		setSearchTerm('');
	}

	function handleViewOrder(order) {
		setCurrentOrder(order);
		setIsModalOpen(true);
	}

	function handleCloseView() {
		setIsModalOpen(false);
	}

	function toggleView() {
		setInCalendarView(!inCalendarView);
		setSearchTerm('');
		setFilteredOrders(initialOrders);
	}

	const ordersTable = filteredOrders.map((order, index) => (
		<tr key={order.id}>
			<TD>{index + 1}</TD>
			<TD>{order.id}</TD>
			<TD>{DateFromTimestamp(order.orderDate)}</TD>
			<TD>{DateFromTimestamp(order.deliveryDate)}</TD>
			<TD>{order.status}</TD>
			<TD>
				<div className='flex justify-evenly'>
					<IconButton
						type='view'
						onClick={() => handleViewOrder(order)}
					/>
					<IconButton
						onClick={() => handleEditOrder(order)}
						type='edit'
					/>
					<IconButton
						onClick={() => handleDeleteOrder(order.id)}
						type='delete'
					/>
				</div>
			</TD>
		</tr>
	));

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const updateScreenWidth = () => {
		setScreenWidth(window.innerWidth);
	};

	window.addEventListener('resize', updateScreenWidth);

	return (
		<div className='h-[90vh] p-2  overscroll-none  w-[99vw] m-auto'>
			<div className=' p-2 flex justify-between'>
				<input
					type='text'
					placeholder='Search by order id'
					value={searchTerm}
					onChange={handleSearch}
					className='p-2 border border-gray-300 rounded-lg w-10/12'
					disabled={inCalendarView || editOrderStarted}
				/>

				<>
					<FaList
						className={`mt-3 text-xl text-entntblue ${
							!inCalendarView && screenWidth > 1168
								? ''
								: 'hidden'
						}`}
					/>
					<FaCalendarAlt
						className={`mt-3 text-xl text-entntblue ${
							inCalendarView && screenWidth > 1168 ? '' : 'hidden'
						}`}
					/>
				</>

				<button
					onClick={toggleView}
					className='bg-entntblue p-2 rounded-lg text-lg text-slate-200 hover:bg-blue-600 hover:font-semibold w-40'
				>
					Toggle View
				</button>
			</div>
			{!inCalendarView && isModalOpen && currentOrder && (
				<OrderSummary
					isOpen={isModalOpen}
					order={currentOrder}
					onClose={handleCloseView}
				/>
			)}
			{!inCalendarView && editOrderStarted && (
				<OrdersForm
					handleClose={handleClose}
					handleSubmit={editOrder}
					initialData={currentOrder}
				/>
			)}
			{!inCalendarView && !editOrderStarted && (
				<OrdersTable
					handleSort={sortTable}
					ordersList={ordersTable}
				/>
			)}
			{inCalendarView && <CalendarView orders={initialOrders} />}
		</div>
	);
}
