import { useState } from 'react'
import './App.css'
import { Button } from './components/Button/Button'
import UserLayout from './layout/UserLayout'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<UserLayout>
				<Button
					label='Eluwina'
					onClick={() => {}}
					size='actionButton'
					type='confirm'
					variant='filled'
					key='asds'
					disabled={false}></Button>
			</UserLayout>
		</>
	)
}

export default App
