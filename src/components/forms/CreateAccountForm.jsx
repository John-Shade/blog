import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Forms.css'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createtUser } from '../../api/api'

export default function CreateAccountForm() {
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    clearErrors,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
    },
  })

  const errorMessage = 'Пароли не совпадают'

  const { ref, ...rest } = {
    ...register('password', {
      validate: (pass) => {
        if (pass === watch('repeatPassword')) {
          clearErrors('repeatPassword')
        } else {
          setError('repeatPassword', {
            message: errorMessage,
          })
        }
      },
      required: 'Поле обязательно',
      minLength: { value: 6, message: 'Минимум  6 символа' },
      maxLength: { value: 40, message: 'Максимум 40 символов' },
    }),
  }

  const onSubmit = (data) => {
    const { username, email, password } = { ...data }
    const user = { username, email, password }
    const objUser = { user }
    dispatch(createtUser(objUser))
  }
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="form-title">Create new account</h5>
        <div className="form-inputs">
          <label htmlFor="username" className="form-label">
            Username
            <input
              className="form-input"
              type="text"
              id="username"
              autoComplete="usesrname"
              {...register('username', {
                required: 'Поле обязательно',
                minLength: { value: 3, message: 'Минимум  3 символа' },
                maxLength: { value: 20, message: 'Максимум 20 символов' },
              })}
            />
            <p className="form-error">
              {errors.username ? errors.username.message : null}
            </p>
          </label>
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
              ref={(e) => {
                ref(e)
                inputRef.current = e
              }}
              autoComplete="new-password"
              id="password"
              className="form-input"
              type="password"
              {...rest}
              // {...register('password', {
              //   required: 'Поле обязательно',
              //   minLength: { value: 6, message: 'Минимум  6 символа' },
              //   maxLength: { value: 40, message: 'Максимум 40 символов' },
              // })}
            />
            <p className="form-error">
              {errors.password ? errors.password.message : null}
            </p>
          </label>
          <label htmlFor="repeat-password" className="form-label">
            Repeat Password
            <input
              type=""
              id="repeat-password"
              className="form-input"
              {...register('repeatPassword', {
                required: 'Поле обязательно',
                validate: (password) => {
                  if (
                    // inputRef.current
                    //   ? inputRef.current.value
                    //   : inputRef !== password
                    inputRef.current.value !== password
                  ) {
                    return errorMessage
                  }
                  return null
                },
              })}
            />
            <p className="form-error">
              {errors.repeatPassword ? errors.repeatPassword.message : null}
            </p>
          </label>
        </div>
        <div className="form-agreement">
          <input
            type="checkbox"
            {...register('checkbox', { required: 'Поле обязательно' })}
          />
          <span>I agree to the processing of my personal information</span>
        </div>
        <div className="form-footer-container">
          <button type="submit" className="form-button" disabled={!isValid}>
            Create
          </button>

          <div className="form-footer">
            <span className="form-footer--text form-footer--text--normal">
              Already have an account?
            </span>
            <Link to="/sign-in" className="link">
              <span className="form-footer--text form-footer--text--link">
                Sign In.
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
