import { TH } from '../widgets/TableWidgets';

export default function ProductsTable({ handleSort, productsList }) {
	return (
		<div className=' bg-stone-200 rounded-lg shadow-lg overflow-auto max-h-[83%] min-h-[83%]'>
			<table className='table-auto md:table-fixed'>
				<thead>
					<tr>
						<TH>#</TH>
						<TH handleSort={handleSort}>Name</TH>
						<TH handleSort={handleSort}>Category</TH>
						<TH handleSort={handleSort}>Price</TH>
						<TH handleSort={handleSort}>Stock Quantity</TH>
						<TH></TH>
					</tr>
				</thead>
				<tbody>{productsList}</tbody>
			</table>
		</div>
	);
}
