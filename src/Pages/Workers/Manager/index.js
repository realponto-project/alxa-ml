import React, { useEffect, useState } from 'react'

import ManagerWorkerContainer from '../../../Containers/Workers/Manager'
import { getWorkerInfo } from '../../../Services/Worker'

const Manager = () => {
  const [queues, setQueues] = useState([])

  useEffect(() => {
    getWorkerInfo()
      .then(({ data }) => {
        setQueues(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return <ManagerWorkerContainer queues={queues} />
}

export default Manager
