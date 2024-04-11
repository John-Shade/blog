import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getUser } from '../../api/api'
import './Forms.css'

export default function LoginForm() {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (data) => {
    const { email, password } = { ...data }
    const user = { email, password }
    const objUser = { user }
    dispatch(getUser(objUser))
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="form-title">Sign In</h5>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email address
            <input
              className="form-input"
              id="email"
              type="email"
              {...register('email', {
                required: 'Поле обязательно',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Введите корректный email',
                },
              })}
            />
            <p className="form-error">
              {errors.email ? errors.email.message : null}
            </p>
          </label>

          <label htmlFor="password" className="form-label">
            Password
            <input
              autoComplete="new-password"
              id="password"
              className="form-input"
              type="password"
              {...register('password', {
                required: 'Поле обязательно',
                minLength: { value: 6, message: 'Минимум  6 символа' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
              })}
            />
            <p className="form-error">
              {errors.password ? errors.password.message : null}
            </p>
          </label>
        </div>
        <button type="submit" className="form-button" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  )
}
