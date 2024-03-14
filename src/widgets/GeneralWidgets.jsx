export function Header({ heading }) {
	return (
		<div className='p-2'>
			<h1 className='font-bold text-4xl text-white'>{heading}</h1>
		</div>
	);
}

export function Metric({ label, value }) {
	return (
		<div className='metric'>
			<p className='text-sm text-gray-600'>{label}</p>
			<p className='text-xl font-semibold'>{value}</p>
		</div>
	);
}

export function MetricContent({ showGraph, content, graph }) {
	return (
		<div className='bg-stone-200 p-4 rounded-lg shadow-md h-[85%] overflow-auto max-w-full'>
			{!showGraph && content}
			{showGraph && graph}
		</div>
	);
}
