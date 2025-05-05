import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { ReactNode, useState } from 'react'

interface UserLayoutProps {
	children: ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false)

	const toggleSidebar = () => {
		setSidebarOpen(prev => !prev)
	}

	return (
		<div className='flex h-screen bg-gray-100'>
			<Sidebar isOpen={isSidebarOpen} />
			<div className='flex flex-col flex-1 overflow-hidden'>
				<Header toggleSidebar={toggleSidebar} />
				<main className='flex-1 overflow-y-auto p-4'>{children}</main>
				<Footer />
			</div>
		</div>
	)
}

export default UserLayout
