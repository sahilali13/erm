import { useState } from 'react';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CalendarView({ orders }) {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleDateSelect = (date) => {
		setSelectedDate(date);
	};
	const localizer = momentLocalizer(moment);

	const maxDeliveryDate = Math.max(
		...orders.map((order) => order.deliveryDate)
	);

	const startDate = new Date(maxDeliveryDate * 1000);

	return (
		<div className='grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4 bg-stone-200 rounded-lg shadow-lg overflow-auto max-h-[83%] min-h-[83%] p-2'>
			<div className='p-4 bg-stone-100 rounded-lg row-span-2 md:col-span-2'>
				<Calendar
					selectable
					localizer={localizer}
					events={orders.map((order) => ({
						id: order.id,
						start: new Date(order.deliveryDate * 1000), // Convert timestamp to Date object
						end: new Date(order.deliveryDate * 1000), // Same as start for simplicity
						title: `Order ${order.id}`,
					}))}
					onSelectEvent={(event) => handleDateSelect(event.start)}
					defaultDate={startDate}
					defaultView='month'
				/>
			</div>
			<div className='p-4 md:col-span-1'>
				{!selectedDate && (
					<h3 className='mb-2 font-bold text-xl p-1'>
						No Date Selected
					</h3>
				)}
				{selectedDate && (
					<div>
						<div className='w-full flex'>
							<h3 className='mb-2 font-bold text-xl p-1'>
								Orders on
							</h3>
							<h3 className='text-entntblue text-xl p-1 font-bold'>
								{' '}
								{selectedDate.toDateString()}
							</h3>
						</div>
						<ul className='mt-8'>
							{orders
								.filter((order) => {
									const orderDate = new Date(
										order.deliveryDate * 1000
									);
									return (
										orderDate.toDateString() ===
										selectedDate.toDateString()
									);
								})
								.map((order) => (
									<li
										key={order.id}
										className='mb-2'
									>
										Order ID: {order.id} - Status:{' '}
										{order.status}
									</li>
								))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
