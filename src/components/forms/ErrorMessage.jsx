import { Alert } from 'antd'

export default function ErrorMessage() {
  return (
    <Alert type="error" message="У вас нет прав для просмотра этой страницы" />
  )
}
