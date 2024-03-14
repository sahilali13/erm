import { useState } from 'react';

import {
	FormHeading,
	FormInputField,
	FormButton,
} from '../widgets/FormWidgets';

import DateFromTimestamp from '../helpers/DateFromTimestamp';

export default function OrdersForm({ handleClose, handleSubmit, initialData }) {
	const [orderStatus, setOrderStatus] = useState(
		initialData.orderStatus || 'Pending'
	);
	const {
		id,
		customerName,
		orderDate,
		items,
		shippingAddress,
		paymentMethod,
		totalPrice,
		estimatedDeliveryDate,
	} = initialData;

	function handleFormSubmit(e) {
		e.preventDefault();
		handleSubmit({
			id,
			customerName,
			orderDate,
			status: orderStatus,
			items,
			shippingAddress,
			paymentMethod,
			totalPrice,
			estimatedDeliveryDate,
		});
		alert('Product Status Updated');
	}

	return (
		<div className='bg-stone-200 rounded-lg shadow-lg overflow-auto max-h-[83%] min-h-[83%]'>
			<form
				onSubmit={handleFormSubmit}
				className='max-w-sm mx-auto mt-6'
			>
				<FormHeading
					type='edit'
					productName={'Order #' + id}
				/>
				<FormInputField
					label='Order Date'
					value={DateFromTimestamp(orderDate)}
					type='text'
					readOnly
				/>
				<FormInputField
					label='Estimated Delivery Date'
					value={DateFromTimestamp(estimatedDeliveryDate)}
					type='text'
					readOnly
				/>
				<FormInputField
					label='Shipping Address'
					value={`${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}`}
					type='text'
					readOnly
				/>
				<div className='mb-4'>
					<label
						htmlFor='orderStatus'
						className='block mb-1 font-semibold'
					>
						Order Status:
					</label>
					<select
						className='border p-2 w-full bg-stone-100 shadow-md'
						id='orderStatus'
						value={orderStatus}
						onChange={(e) => setOrderStatus(e.target.value)}
					>
						<option value='Pending'>Pending</option>
						<option value='Shipped'>Shipped</option>
						<option value='Delivered'>Delivered</option>
					</select>
				</div>
				<div className='flex justify-between'>
					<FormButton type='submit'>Update</FormButton>
					<FormButton
						type='button'
						onClick={handleClose}
					>
						Cancel
					</FormButton>
				</div>
			</form>
		</div>
	);
}
