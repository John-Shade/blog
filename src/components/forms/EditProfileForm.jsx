import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import './Forms.css'
import { updateUser } from '../../api/api'

export default function EditProfileForm() {
  const dispatch = useDispatch()

  const { awaitingRequest } = useSelector((state) => state.user)

  const {
    username: usernameState,
    email: emailState,
    image: imgLink = '',
  } = useSelector((state) => state.user.userInfo)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: usernameState,
      email: emailState,
      imgLink,
    },
  })

  const mistake = () => {
    if (
      watch('email') === emailState &&
      watch('username') === usernameState &&
      watch('imgLink') === imgLink &&
      isValid
    ) {
      setError('root', { message: 'Все значения остались прежними' })
    } else if (isValid && errors.root) {
      clearErrors('root')
    }
  }
  const onSubmit = (data) => {
    const { username, email, imgLink: image } = { ...data }
    const user = { username, email, image }
    const objUser = { user }
    dispatch(updateUser(objUser))
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {mistake()}
        <h5 className="form-title">Edit Profile</h5>
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
          <label htmlFor="img-link" className="form-label">
            Avatar image (url)
            <input
              className="form-input"
              type="text"
              id="img-link"
              {...register('imgLink')}
            />
          </label>
        </div>
        <div className="form-footer-container">
          <p className="form-error">
            {errors.root ? errors.root.message : null}
          </p>
          <button
            type="submit"
            className="form-button"
            disabled={!isValid || awaitingRequest}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
