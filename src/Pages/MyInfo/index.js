import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import { updateMyInfo as updateMyInfoService } from '../../Services/User'
import MyInfoContainer from '../../Containers/MyInfo'
import { companyRemoveLogo, getCompanyById } from '../../Services/Company'

const MyInfo = ({ company, user, loggedUser, setCompany }) => {
  const [loading, setLoading] = useState(false)

  const updateMyInfo = async (values) => {
    setLoading(true)
    try {
      const { data } = await updateMyInfoService(user.id, values)
      loggedUser({
        ...user,
        ...data
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleUpload = () => {
    return `${process.env.REACT_APP_API_URL}/api//companies/add-logo`
  }

  const handleRemoveLogo = async () => {
    const { data } = await companyRemoveLogo()

    setCompany(data)
  }

  const handleChangeUpload = async (info) => {
    if (info.file.status === 'done') {
      const { data } = await getCompanyById(company.id)
      setCompany(data)
    }
  }

  return (
    <MyInfoContainer
      handleChangeUpload={handleChangeUpload}
      handleUpload={handleUpload}
      handleRemoveLogo={handleRemoveLogo}
      loading={loading}
      user={user}
      company={company}
      updateMyInfo={updateMyInfo}
    />
  )
}

const mapStateToProps = ({ company, user }) => ({
  company,
  user
})

const mapDispatchToProps = (dispatch) => ({
  setCompany: (payload) => dispatch({ type: 'SET_COMPANY', payload }),
  loggedUser: (payload) => dispatch({ type: 'USER_LOGGED', payload })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(MyInfo)
