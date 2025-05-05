import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false)

	const toggleSidebar = () => {
		setSidebarOpen(prev => !prev)
	}

	return (
		<div className='flex h-screen bg-gray-100'>
			<div className='flex flex-1 flex-col overflow-hidden'>
				<Header />
				<main className='flex-1 overflow-y-auto p-4'>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	)
}

export default UserLayout
