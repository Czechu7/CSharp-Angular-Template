import React from 'react'

type SidebarProps = {
	isOpen: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
	const sidebarClass = `bg-white border-r h-full transition-all duration-300 ease-in-out hidden md:block ${
		isOpen ? 'w-64' : 'w-16'
	}`

	const navItems = [{ label: 'Nie bój się' }, { label: 'Nie lękaj się' }, { label: 'Jestem przyjacielem' }]

	return (
		<aside className={sidebarClass}>
			<nav className='mt-10 p-4 space-y-2'>
				{navItems.map(item => (
					<span className='block'>{item.label}</span>
				))}
			</nav>
		</aside>
	)
}

export default Sidebar
