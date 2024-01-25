import { FC } from 'react'
import { Form } from 'react-router-dom'
import Button from '../../components/Button/Button'
import BaseForm from '../../components/Form/BaseForm'
import Input from '../../components/Input/Input'

const Registration: FC = () => {
	return (
		<BaseForm title='REGISTRATION FORM'>
			<>
				<Form className='flex flex-col'>
					<div className='flex flex-col gap-4'>
						<Input
							name='name'
							labelName='Name:'
							type='text'
							placeholder='Name...'
							required
						/>
						<Input
							name='Surname'
							labelName='Surname:'
							type='text'
							placeholder='Surname...'
							required
						/>
						<Input
							name='email'
							labelName='Email:'
							type='text'
							placeholder='Email...'
							required
						/>
						<Input
							name='password'
							labelName='Password:'
							type='password'
							placeholder='Password...'
							required
						/>
						<Input
							name='confirmPassword'
							labelName='Confirm password:'
							type='password'
							placeholder='Confirm password...'
							required
						/>
					</div>
					<Button title='Restore' type='submit' className='mt-16 uppercase' />
				</Form>
			</>
		</BaseForm>
	)
}

export default Registration
