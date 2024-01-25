import { FC } from 'react'
import { Form } from 'react-router-dom'
import Button from '../../components/Button/Button'
import BaseForm from '../../components/Form/BaseForm'
import Input from '../../components/Input/Input'

const RestorePassword: FC = () => {
	return (
		<BaseForm title='RESTORE FORM'>
			<>
				<Form className='flex flex-col gap-10'>
					<div className='flex flex-col gap-5'>
						<Input
							name='email'
							labelName='Email:'
							type='text'
							placeholder='Your email...'
							required
						/>
					</div>
					<Button title='Restore' type='submit' className='mt-20 uppercase' />
				</Form>
			</>
		</BaseForm>
	)
}

export default RestorePassword
