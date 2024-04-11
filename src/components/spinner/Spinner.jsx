import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './Spinner.css'

export default function BigSpinner() {
  return (
    <Spin
      className="spin"
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 160,
            marginTop: 50,
          }}
        />
      }
    />
  )
}
