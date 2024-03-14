import { Link, useLocation } from 'react-router-dom';

import { Header } from '../widgets/GeneralWidgets';

export default function Navigation() {
	const location = useLocation();
	const tabCss = 'text-gray-50 hover:text-gray-200 font-medium text-xl';
	return (
		<nav className='flex justify-between items-center py-4 px-8 bg-entntblue rounded-bl-3xl rounded-br-3xl'>
			{location.pathname == '/' && <Header heading='Dashboard' />}
			{location.pathname == '/products-management' && (
				<Header heading='Products' />
			)}
			{location.pathname == '/orders-management' && (
				<Header heading='Orders' />
			)}
			<ul className='flex'>
				{location.pathname !== '/' && (
					<li className='ml-4'>
						<Link
							to='/'
							className={tabCss}
						>
							Dashboard
						</Link>
					</li>
				)}
				{location.pathname !== '/products-management' && (
					<li className='ml-4'>
						<Link
							to='/products-management'
							className={tabCss}
						>
							Products
						</Link>
					</li>
				)}
				{location.pathname !== '/orders-management' && (
					<li className='ml-4'>
						<Link
							to='/orders-management'
							className={tabCss}
						>
							Orders
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}
