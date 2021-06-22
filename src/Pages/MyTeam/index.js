import React, { useEffect, useState } from 'react'
import ManagerContainer from '../../Containers/MyTeam/Manager'
import {
  createUser,
  getAll,
  updateUser,
  sendInviteMember
} from '../../Services/User'
import { connect } from 'react-redux'
import { compose, isEmpty } from 'ramda'

const initialFilterState = {
  activated: ['Ativo', 'Inativo'],
  name: ''
}

const Manager = ({ myTeamSearch, setMyTeamSearch, cleanMyTeamSearch }) => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(10)

  useEffect(() => {
    getAllUsers()
  }, [page])

  const buildMyTeamSearch = (values) => {
    const { name, activated } = values
    const checkedActivated =
      activated && activated.length < 2 && activated.length !== 0
        ? {
            activated: activated[0] !== 'Inativo'
          }
        : {}

    const checkedName = isEmpty(name) ? {} : { name }

    return {
      ...checkedActivated,
      ...checkedName,
      page,
      limit: 10
    }
  }

  const onChangeTable = ({ current }) => {
    setPage(current)
  }

  const getAllUsers = async () => {
    setLoading(true)
    try {
      const {
        data: { source, total }
      } = await getAll(buildMyTeamSearch(myTeamSearch))
      setUsers(source)
      setTotal(total)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleSubmit = async (values) => {
    try {
      await createUser(values)
      getAllUsers()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSubmitUpdate = async (values) => {
    try {
      await updateUser(values)
      getAllUsers()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    if (name === 'activated') {
      return setMyTeamSearch({
        [name]: value.length === 0 ? initialFilterState.activated : value
      })
    }

    return setMyTeamSearch({ [name]: value })
  }

  const clearFilters = () => {
    cleanMyTeamSearch()
  }

  const handleGetUsersByFilters = () => {
    if (page !== 1) {
      setPage(1)
    } else {
      getAllUsers()
    }
  }

  const handleClickMail = async (userId) => {
    try {
      await sendInviteMember(userId)
      getAllUsers()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ManagerContainer
      handleClickMail={handleClickMail}
      users={users}
      handleSubmit={handleSubmit}
      handleSubmitUpdate={handleSubmitUpdate}
      handleGetUsersByFilters={handleGetUsersByFilters}
      handleOnChange={handleOnChange}
      filters={myTeamSearch}
      clearFilters={clearFilters}
      loading={loading}
      total={total}
      page={page}
      onChangeTable={onChangeTable}
    />
  )
}

const mapStateToProps = ({ myTeamSearch }) => ({
  myTeamSearch
})

const mapDispatchToProps = (dispatch) => ({
  setMyTeamSearch: (payload) =>
    dispatch({ type: 'SET_MYTEAM_GLOBAL_SEARCH', payload }),
  cleanMyTeamSearch: () => dispatch({ type: 'CLEAN_MYTEAM_GLOBAL_SEARCH' })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Manager)
