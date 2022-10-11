import React from 'react'
import { Progress } from 'antd';

const ProgressCircular = ({ progress }) => {
  return (
    <div>
      <Progress
      type="circle"
      width={50}
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={progress}
    />
    </div>
  )
}

export default ProgressCircular;
