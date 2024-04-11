// import { Link } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
// import { useParams, useResolvedPath, useOutletContext } from 'react-router-dom'
// import { useOutletContext, Navigate } from 'react-router-dom'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Forms.css'
// import { useRef } from 'react'
import { useEffect } from 'react'
import { createArticle, updateArticle } from '../../api/api'

export default function ArticleForm() {
  const dispatch = useDispatch()

  const state = useOutletContext()

  const slug = state !== undefined ? state.slug : undefined

  const {
    register,
    control,
    formState: { errors, isValid },
    reset,
    watch,
    getValues,
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {},
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  useEffect(() => {
    if (state) {
      const tags = state.tagList.map((el, ind) => ({ tag: el, id: ind }))
      reset({
        title: state.title,
        text: state.body,
        description: state.description,
        tags,
      })
    }
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate()

  const onSubmit = (data) => {
    const { title, description, text: body } = { ...data }
    const tagList = watch(fields.map((field) => `tag${field.id}`)).filter(
      (el) => el !== ''
    )
    const article = { title, description, body, tagList }
    const objArticle = { article }
    if (state)
      dispatch(updateArticle({ objArticle, slug })).then(() => navigate('../'))
    else createArticle(objArticle).then(() => navigate('article'))
  }
  return (
    <div>
      <form className="form form--article" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="form-title">{slug ? 'Edit' : 'Create new'} article</h5>
        <div className="form-inputs">
          <label htmlFor="title" className="form-label">
            Title
            <input
              className="form-input form-input--article"
              type="text"
              id="title"
              {...register('title', {
                required: 'Поле обязательно',
                // minLength: { value: 3, message: 'Минимум  3 символа' },
                // maxLength: { value: 20, message: 'Максимум 20 символов' },
              })}
            />
            <p className="form-error">
              {errors.title ? errors.title.message : null}
            </p>
          </label>
          <label htmlFor="description" className="form-label">
            Short description
            <input
              className="form-input form-input--article"
              id="description"
              type="text"
              {...register('description', {
                required: 'Поле обязательно',
                // pattern: {
                //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                //   message: 'Введите корректный email',
                // },
              })}
            />
            <p className="form-error">
              {errors.description ? errors.description.message : null}
            </p>
          </label>
          <label htmlFor="text" className="form-label">
            Text
            {/* <input type="password" id="password" className="form-input" /> */}
            {/* <input
              className="form-input form-input--article form-input-text--article"
              id="text"
              type="text"
              {...register('password', {
                required: 'Поле обязательно',
                // minLength: { value: 6, message: 'Минимум 6 символа' },
                // maxLength: { value: 40, message: 'Максимум 40 символов' },
              })}
            /> */}
            <textarea
              className="form-input form-input--article form-input-text--article"
              id="text"
              type="text"
              {...register('text', {
                required: 'Поле обязательно',
              })}
            />
            <p className="form-error">
              {errors.text ? errors.text.message : null}
            </p>
          </label>
          Tags
          {fields.map((field, index) => (
            <div className="button-container" key={field.id}>
              <input
                className="form-input"
                type="text"
                {...register(`tag${field.id}`)}
                style={{ marginBottom: 10 }}
                defaultValue={field.tag}
              />
              <button
                type="button"
                className="form-button tag-button tag-button--delete"
                aria-label="Save"
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="button-container">
            <input className="form-input" type="text" {...register('newTag')} />
            <button
              type="button"
              className="form-button tag-button tag-button--delete"
              aria-label="delete"
              onClick={() => setValue('newTag', '')}
            >
              Delete
            </button>
            <button
              type="button"
              className="form-button tag-button tag-button--add"
              aria-label="save"
              onClick={() => {
                const value = getValues('newTag')
                append({ tag: value })
                setValue('newTag', '')
              }}
            >
              Add tag
            </button>
          </div>
        </div>
        <div className="form-footer-container">
          <button type="submit" className="form-button" disabled={!isValid}>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
