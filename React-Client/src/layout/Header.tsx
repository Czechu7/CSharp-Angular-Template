import React from 'react'

type HeaderProps = {
	toggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
	return (
		<header className='bg-white shadow px-4 py-3 flex justify-between items-center'>
			<button onClick={toggleSidebar} className='text-xl'>
				☰
			</button>
			<h1 className='text-xl font-semibold'>Dashboard</h1>
			<div>Karmelki</div>
		</header>
	)
}

export default Header
