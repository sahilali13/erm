import { useState } from 'react';

import { INITIAL_PRODUCTS as initialProductsData } from '../assets/Data';

import ProductsForm from '../components/ProductsForms';
import ProductsTable from '../components/ProductsTable';

import { IconButton, TD } from '../widgets/TableWidgets';

let sortedOrders = { name: 1, category: 1, price: 1, stockQuantity: 1 };

export default function ProductsManagement() {
	const [searchTerm, setSearchTerm] = useState('');
	const [initialProducts, setInitialProducts] = useState(initialProductsData);
	const [filteredProducts, setFilteredProducts] = useState(initialProducts);
	const [addProductStarted, setAddProductStarted] = useState(false);
	const [editProductStarted, setEditProductStarted] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);

	function handleSearch(event) {
		setSearchTerm(event.target.value);
		const filtered = initialProducts.filter((product) =>
			product.name
				.toLowerCase()
				.includes(event.target.value.toLowerCase())
		);
		setFilteredProducts(filtered);
	}

	function sortTable(sortCriteria) {
		const sorted = [...initialProducts];

		switch (sortCriteria) {
			case 'Name':
				sorted.sort(
					(a, b) => sortedOrders.name * a.name.localeCompare(b.name)
				);
				sortedOrders.name *= -1;
				break;
			case 'Category':
				sorted.sort(
					(a, b) =>
						sortedOrders.category *
						a.category.localeCompare(b.category)
				);
				sortedOrders.category *= -1;
				break;
			case 'Price':
				sorted.sort((a, b) => sortedOrders.price * (a.price - b.price));
				sortedOrders.price *= -1;
				break;
			default:
				sorted.sort(
					(a, b) =>
						sortedOrders.stockQuantity *
						(a.stockQuantity - b.stockQuantity)
				);
				sortedOrders.stockQuantity *= -1;
				break;
		}

		setInitialProducts(sorted);
		setFilteredProducts(sorted);
	}

	function handleAddProduct() {
		setAddProductStarted(true);
	}

	function addProduct(newProduct) {
		setSearchTerm('');
		setInitialProducts((prevProducts) => [...prevProducts, newProduct]);
		setFilteredProducts((prevProducts) => [...prevProducts, newProduct]);
		setAddProductStarted(false);
	}

	function handleEditProduct(product) {
		setCurrentProduct(product);
		setEditProductStarted(true);
	}

	function editProduct(updatedProduct) {
		setSearchTerm('');
		const updatedProducts = initialProducts.map((product) =>
			product.id === updatedProduct.id ? updatedProduct : product
		);
		setInitialProducts(updatedProducts);
		setFilteredProducts(updatedProducts);
		setEditProductStarted(false);
	}

	function handleClose() {
		setAddProductStarted(false);
		setEditProductStarted(false);
	}

	function handleDeleteProduct(id) {
		const shouldDelete = window.confirm(
			'Are you sure you want to delete this product?'
		);
		if (shouldDelete) {
			const updatedProducts = initialProducts.filter(
				(product) => product.id !== id
			);
			setInitialProducts(updatedProducts);
			setFilteredProducts(updatedProducts);
		}
		setSearchTerm('');
	}

	const productsTable = filteredProducts.map((product, index) => (
		<tr key={product.id}>
			<TD>{index + 1}</TD>
			<TD>{product.name}</TD>
			<TD>{product.category}</TD>
			<TD>₹{product.price}</TD>
			<TD>{product.stockQuantity}</TD>
			<TD>
				<div className='flex justify-evenly'>
					<IconButton
						onClick={() => handleEditProduct(product)}
						type='edit'
					/>
					<IconButton
						onClick={() => handleDeleteProduct(product.id)}
						type='delete'
					/>
				</div>
			</TD>
		</tr>
	));

	return (
		<div className='h-[93vh] p-2 w-[99vw] m-auto'>
			<div className='p-2 pr-2 flex justify-between'>
				<input
					type='text'
					placeholder='Search by product name'
					value={searchTerm}
					onChange={handleSearch}
					className='p-2 border border-gray-300 rounded-lg w-10/12'
					disabled={addProductStarted || editProductStarted}
				/>
				<button
					onClick={handleAddProduct}
					className='p-2 bg-green-600 text-lg rounded-lg text-stone-50 hover:bg-green-400 hover:text-bold hover:text-white'
				>
					Add Product
				</button>
			</div>
			{addProductStarted && (
				<ProductsForm
					handleClose={handleClose}
					handleSubmit={addProduct}
					initialData={{
						name: '',
						category: '',
						price: '',
						stockQuantity: '',
					}}
					existingProducts={initialProducts}
					isAddForm={true}
				/>
			)}
			{editProductStarted && (
				<ProductsForm
					handleClose={handleClose}
					handleSubmit={editProduct}
					initialData={currentProduct}
					isAddForm={false}
				/>
			)}
			{!addProductStarted && !editProductStarted && (
				<ProductsTable
					handleSort={sortTable}
					productsList={productsTable}
				/>
			)}
		</div>
	);
}
