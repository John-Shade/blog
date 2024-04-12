import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../api/api'
import useAction from '../../hooks/hooks'
import './Forms.css'

export default function LoginForm() {
  const dispatch = useDispatch()
  const { changeMistake } = useAction()
  const timerRef = useRef()
  const { awaitingRequest, mistake } = useSelector((state) => state.user)

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

  useEffect(() => {
    if (mistake) {
      timerRef.current = setTimeout(() => {
        changeMistake()
      }, '4000')
    }
    // eslint-disable-next-line
  }, [mistake])

  useEffect(
    () => () => {
      clearTimeout(timerRef.current)
      changeMistake()
    },
    // eslint-disable-next-line
    []
  )

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
              autoComplete="email"
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
        <button
          type="submit"
          className="form-button"
          disabled={!isValid || awaitingRequest}
        >
          Login
        </button>
        {mistake && <p className="form-error">Ошибка авторизации</p>}
      </form>
    </div>
  )
}
