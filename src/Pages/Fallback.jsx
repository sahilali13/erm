import { Circles } from 'react-loader-spinner';

export default function FallbackPage() {
	return (
		<div className='flex justify-center items-center h-[90vh] max-w-screen '>
			<Circles
				type='Oval'
				color='#0D42EC'
				height={100}
				width={100}
			/>
		</div>
	);
}
