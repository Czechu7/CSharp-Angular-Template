import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type HeaderProps = {
	toggleSidebar?: () => void
	isAdmin?: boolean
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isAdmin = true }) => {
	const [userMenuOpen, setUserMenuOpen] = useState(false)

	return (
		<header className='sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow'>
			<div className='flex items-center gap-4'>
				{
					<button onClick={toggleSidebar} className='rounded p-2 hover:bg-gray-100' aria-label='Toggle Sidebar'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				}
				<h1 className='text-xl font-semibold'>Dashboard</h1>
			</div>

			<div className='flex items-center gap-4'>
				{isAdmin && (
					<Link to='/admin' className='rounded bg-blue-500 px-3 py-2 text-gray-700 hover:bg-blue-600'>
						Admin
					</Link>
				)}

				<Link to='/' className='rounded px-3 py-2 text-gray-700 hover:bg-gray-100'>
					Strona główna
				</Link>

				<div className='relative'>
					<button
						onClick={() => setUserMenuOpen(!userMenuOpen)}
						className='flex items-center rounded-full bg-gray-200 p-1 text-gray-700 hover:bg-gray-300'
						aria-label='User menu'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
							/>
						</svg>
					</button>

					{userMenuOpen && (
						<div className='absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg'>
							<Link to='/profile' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
								Profil
							</Link>
							<Link to='/settings' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
								Ustawienia
							</Link>
							<div className='my-1 h-px bg-gray-200'></div>
							<Link to='/login' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
								Wyloguj
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
