export const required = (value: string) => value ? undefined : 'This field is required'

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const email = (value: string) => emailPattern.test(value) ? undefined : 'Not a valid email'

export const minLength = (length: number) => (value: string) => value.length >= length ? undefined : `Min ${length} characters`

const initialError: undefined | string = undefined
export const compose = (
  validators: { (value: string): string | undefined }[]
) => (
  value: string
) => {
  return validators.reduce((error, validator) => error ? error : validator(value), initialError)
}
