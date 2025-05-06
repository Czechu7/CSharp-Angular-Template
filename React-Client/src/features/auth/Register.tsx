import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

enum GenderEnum {
	female = 'female',
	male = 'male',
	other = 'other',
}

interface IRegisterForm {
	firstName: string
	lastName: string
	username: string
	email: string
	password: string
	confirmPassword: string
}

const Register = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IRegisterForm>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		criteriaMode: 'all',
		delayError: 500,
	})
	const onSubmit: SubmitHandler<IRegisterForm> = data => console.log(data)

	const password = watch('password')

	return (
		<>
			<div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md'>
					<div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
						<div className='px-8 pt-8 pb-6 bg-indigo-600'>
							<h1 className='text-center text-3xl font-bold text-white'>Rejestracja</h1>
							<p className='mt-2 text-center text-indigo-200'>Utwórz nowe konto</p>
						</div>

						<form className='p-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<div className='space-y-5'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>Imię</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<svg
												className='h-5 w-5 text-gray-400'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
										<input
											type='text'
											{...register('firstName', {
												required: 'Imię jest wymagane',
												maxLength: {
													value: 50,
													message: 'Imię może mieć maksymalnie 50 znaków',
												},
											})}
											placeholder='Jan'
											className='appearance-none rounded-md block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
									{errors.firstName && <p className='mt-1 text-sm text-red-600'>{errors.firstName.message}</p>}
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>Nazwisko</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<svg
												className='h-5 w-5 text-gray-400'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
										<input
											type='text'
											{...register('lastName', {
												required: 'Nazwisko jest wymagane',
												maxLength: {
													value: 50,
													message: 'Nazwisko może mieć maksymalnie 50 znaków',
												},
											})}
											placeholder='Kowalski'
											className='appearance-none rounded-md block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
									{errors.lastName && <p className='mt-1 text-sm text-red-600'>{errors.lastName.message}</p>}
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>Login</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<svg
												className='h-5 w-5 text-gray-400'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
										<input
											type='text'
											{...register('username', {
												required: 'Login jest wymagany',
												minLength: {
													value: 3,
													message: 'Login musi mieć co najmniej 3 znaki',
												},
												pattern: {
													value: /^[A-Za-z0-9_-]+$/i,
													message: 'Login może zawierać tylko litery, cyfry oraz znaki - i _',
												},
											})}
											placeholder='jankowalski'
											className='appearance-none rounded-md block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
									{errors.username && <p className='mt-1 text-sm text-red-600'>{errors.username.message}</p>}
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<svg
												className='h-5 w-5 text-gray-400'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
												<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
											</svg>
										</div>
										<input
											type='email'
											{...register('email', {
												required: 'Email jest wymagany',
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: 'Nieprawidłowy format email',
												},
											})}
											placeholder='jan.kowalski@mail.com'
											className='appearance-none rounded-md block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
									{errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>Hasło</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<svg
												className='h-5 w-5 text-gray-400'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
										<input
											type='password'
											{...register('password', {
												required: 'Hasło jest wymagane',
												minLength: {
													value: 6,
													message: 'Hasło musi mieć co najmniej 6 znaków',
												},
											})}
											placeholder='******'
											className='appearance-none rounded-md block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
									{errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>Powtórz hasło</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<svg
												className='h-5 w-5 text-gray-400'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
										<input
											type='password'
											{...register('confirmPassword', {
												required: 'Powtórzenie hasła jest wymagane',
												validate: value => value === password || 'Hasła muszą być identyczne',
											})}
											placeholder='******'
											className='appearance-none rounded-md block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
									{errors.confirmPassword && (
										<p className='mt-1 text-sm text-red-600'>{errors.confirmPassword.message}</p>
									)}
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'>
									Zarejestruj się
								</button>
							</div>

							<div className='text-center text-sm'>
								<span className='text-gray-600'>Masz już konto? </span>
								<Link to='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
									Zaloguj się
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register
