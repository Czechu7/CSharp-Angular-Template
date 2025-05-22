import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const AuthLayout = () => {
	return (
		<div className='flex h-screen flex-col bg-gray-100'>
			<main className='flex-1 overflow-y-auto p-4'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default AuthLayout
