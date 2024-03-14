import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import FallbackPage from './Pages/Fallback';

const ProductsManagement = lazy(() => import('./Pages/ProductsManagement'));
const OrdersManagement = lazy(() => import('./Pages/OrdersManagement'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));

function App() {
	return (
		<HashRouter>
			<Navigation />
			<Suspense fallback={<FallbackPage />}>
				<Routes>
					<Route
						path='/'
						element={<Dashboard />}
					/>
					<Route
						path='/products-management'
						element={<ProductsManagement />}
					/>
					<Route
						path='/orders-management'
						element={<OrdersManagement />}
					/>
				</Routes>
			</Suspense>
		</HashRouter>
	);
}

export default App;
