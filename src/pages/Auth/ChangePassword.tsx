import { FC } from 'react'
import { Form } from 'react-router-dom'
import Button from '../../components/Button/Button'
import BaseForm from '../../components/Form/BaseForm'
import Input from '../../components/Input/Input'

const ChangePassword: FC = () => {
	return (
		<BaseForm title='UPDATE FORM'>
			<>
				<Form className='flex flex-col'>
					<div className='flex flex-col gap-5'>
						<Input
							name='password'
							labelName='Password:'
							type='password'
							placeholder='Password...'
							required
						/>
						<Input
							name='confirmPassword'
							required
							labelName='Confirm password:'
							type='password'
							placeholder='Confirm password...'
						/>
					</div>
					<Button title='Login' type='submit' className='mt-20 uppercase' />
				</Form>
			</>
		</BaseForm>
	)
}

export default ChangePassword
