import { useState } from 'react';

import GenerateUniqueId from '../helpers/GenerateUniqueId';

import {
	FormHeading,
	FormInputField,
	FormButton,
} from '../widgets/FormWidgets';

export default function ProductsForm({
	handleClose,
	handleSubmit,
	initialData,
	isAddForm,
	existingProducts,
}) {
	const [name, setName] = useState(initialData.name || '');
	const [category, setCategory] = useState(initialData.category || '');
	const [price, setPrice] = useState(
		initialData.price ? initialData.price.toString() : ''
	);
	const [stockQuantity, setStockQuantity] = useState(
		initialData.stockQuantity ? initialData.stockQuantity.toString() : ''
	);
	const [id, setId] = useState(initialData.id || '');

	function handleFormSubmit(e) {
		e.preventDefault();

		if (
			name.trim() === '' ||
			category.trim() === '' ||
			isNaN(parseFloat(price)) ||
			isNaN(parseInt(stockQuantity)) ||
			parseFloat(price) < 0 ||
			parseInt(stockQuantity) < 0
		) {
			alert('Please fill out all fields correctly.');
			return;
		}

		if (
			isAddForm &&
			existingProducts.some((product) => product.id === id.trim())
		) {
			alert('A product with the same id already exists.');
			return;
		}

		handleSubmit({
			name,
			category,
			price: parseFloat(price),
			stockQuantity: parseInt(stockQuantity),
			id: isAddForm ? GenerateUniqueId() : id,
		});

		if (isAddForm) {
			setName('');
			setCategory('');
			setPrice('');
			setStockQuantity('');
			setId('');
		}
		if (isAddForm) {
			alert('Product Added');
		} else {
			alert('Product Updated');
		}
	}

	return (
		<div className=' bg-stone-300 rounded-lg shadow-lg overflow-auto max-h-[83%] min-h-[83%]'>
			<form
				onSubmit={handleFormSubmit}
				className='max-w-sm mx-auto mt-6 '
			>
				<FormHeading
					type={isAddForm ? 'add' : 'edit'}
					productName={initialData.name}
				/>
				<FormInputField
					label='Name'
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					type='text'
					maxLength={30}
				/>
				<FormInputField
					label='Category'
					id='category'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					type='text'
					maxLength={30}
				/>
				<FormInputField
					label='Price'
					id='price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					type='text'
					min={0}
				/>
				<FormInputField
					label='Stock Quantity'
					id='stockQuantity'
					value={stockQuantity}
					onChange={(e) => setStockQuantity(e.target.value)}
					type='number'
					min={0}
				/>
				<div className='flex justify-between'>
					<FormButton type='submit'>
						{isAddForm ? 'Add' : 'Update'}
					</FormButton>
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
