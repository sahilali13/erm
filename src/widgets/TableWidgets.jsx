import { FaSort } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';

export function TD({ children }) {
	return (
		<td className='p-2 text-center border-solid border-b-2 border-stone-300'>
			{children}
		</td>
	);
}

export function TH({ handleSort, children }) {
	const sort = children && children !== '#';

	return (
		<th className='w-screen text-xl sticky top-0 z-auto bg-stone-300 h-16'>
			<div className='flex justify-center'>
				{children}
				{sort && (
					<button
						className='p-2'
						onClick={() => handleSort(children)}
					>
						<FaSort className='text-base' />
					</button>
				)}
			</div>
		</th>
	);
}

export function IconButton({ type, ...props }) {
	let icon, color;

	switch (type) {
		case 'edit':
			icon = <MdEdit />;
			color = ' text-entntblue';
			break;
		case 'delete':
			icon = <MdDeleteForever />;
			color = ' text-red-500';
			break;
		case 'view':
			icon = <IoMdEye />;
			color = ' text-entntblue';
			break;
		default:
			break;
	}

	const css = `text-xl hover:text-2xl hover:text-bold ${color}`;

	return (
		<button
			className={css}
			{...props}
		>
			{icon}
		</button>
	);
}

export function OrderDetailRow({ label, value }) {
	return (
		<tr>
			<td className='pr-2'>
				<strong>{label}</strong>
			</td>
			<td className='flex gap-2'>
				{label === 'Total Price' && '₹'}
				{value}
			</td>
		</tr>
	);
}
