import { reduxForm } from 'redux-form'
import { Maybe } from '../../utils/fp/types/Maybe'
import { required, email, compose as composeValidators } from '../../form/validators'
import { SignInFormValues, SignInForm as SignInFormComponent } from '../components'

const validate = ({ email, password }: SignInFormValues) => {
  const errors: Partial<SignInFormValues> = {}
  Maybe.of(validateEmail(email)).map(error => errors.email = error)
  Maybe.of(validatePassword(password)).map(error => errors.password = error)
  return errors
}

const validateEmail = composeValidators([required, email])

const validatePassword = composeValidators([required])

export const SignInForm = reduxForm({
  form: 'AuthSignInForm',
  validate
})(SignInFormComponent)
