import { reduxForm } from 'redux-form'
import { Maybe } from '../../utils/fp/types/Maybe'
import { required, email, compose as composeValidators } from '../../form/validators'
import { SignUnFormValues, SignUpForm as SignUnFormComponent } from '../components'

const validate = ({ email, password, confirmPassword }: SignUnFormValues) => {
  const errors: Partial<SignUnFormValues> = {}
  Maybe.of(validateEmail(email)).map(error => errors.email = error)
  Maybe.of(validatePassword(password)).map(error => errors.password = error)
  Maybe.of(validatePasswordConfirmation(password, confirmPassword)).map(error => errors.confirmPassword = error)
  return errors
}

const validateEmail = composeValidators([required, email])

const validatePassword = composeValidators([required])

const validatePasswordConfirmation = (password: string, confirmPassword: string) => {
  const match = () => password === confirmPassword ? undefined : 'Passwords do not match'
  return composeValidators([required, match])(confirmPassword)
}

export const SignUpForm = reduxForm({
  form: 'AuthSignUpForm',
  validate
})(SignUnFormComponent)
