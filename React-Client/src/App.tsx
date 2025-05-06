import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserLayout from './layout/UserLayout'
import AuthLayout from './layout/AuthLayout'

import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Dashboard from './features/dashboard/Dashboard'
import Home from './features/home/Home'
import Admin from './features/admin/Admin'
import ForgotPassword from './features/auth/ForgotPassword'

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
				</Route>

				<Route element={<UserLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/admin' element={<Admin />} />
				</Route>

				<Route path='*' element={<div>404 Not Found</div>} />
			</Routes>
		</Router>
	)
}

export default App
