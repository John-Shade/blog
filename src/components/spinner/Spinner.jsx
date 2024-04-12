import { Spin } from 'antd'
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons'

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

export function HeaderSpinner() {
  return (
    <Spin
      className="header-spinner"
      indicator={<SyncOutlined spin style={{ fontSize: 45 }} />}
    />
  )
}
