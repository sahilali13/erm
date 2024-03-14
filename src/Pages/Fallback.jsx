import { Circles } from 'react-loader-spinner';

export default function FallbackPage() {
	return (
		<div className='flex justify-center items-center h-screen m-auto'>
			<Circles
				type='Oval'
				color='#0D42EC'
				height={80}
				width={80}
			/>
		</div>
	);
}
