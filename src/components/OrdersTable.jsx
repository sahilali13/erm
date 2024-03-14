import { TH } from '../widgets/TableWidgets';

export default function OrdersTable({ handleSort, ordersList }) {
	return (
		<div className=' bg-stone-200 rounded-lg shadow-lg overflow-auto max-h-[83%] min-h-[83%]'>
			<table className='table-auto md:table-fixed'>
				<thead>
					<tr>
						<TH>#</TH>
						<TH handleSort={handleSort}>ID</TH>
						<TH handleSort={handleSort}>Order Date</TH>
						<TH handleSort={handleSort}>Estimated Delivery Date</TH>
						<TH handleSort={handleSort}>Status</TH>
						<TH></TH>
					</tr>
				</thead>
				<tbody>{ordersList}</tbody>
			</table>
		</div>
	);
}
