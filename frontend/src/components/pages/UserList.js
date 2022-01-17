import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import {deleteUser, fetchUsers} from '../../redux/actions'
import Spinner from '../UI/Spinner'

function UsersList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading, error, users} = useSelector(state => state.usersList)

    const {user} = useSelector(state => state.userInfo)

    const {
        deleted,
        loading: deleteLoading,
        error: deleteError
    } = useSelector(state => state.userDelete)

    useEffect(() => {
        if (user && user.is_admin) {
            dispatch(fetchUsers())
        } else {
            navigate('/')
        }

    }, [dispatch, navigate, deleted, user])

    function handleDelete(userId) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
                ? (<Loader/>)
                : error || deleteError
                    ? (<Alert type='danger'>{error}</Alert>)
                    : (
                        <Table hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th className='text-center'>ACTION</th>
                            </tr>
                            </thead>

                            <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>{u._id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.is_admin ? (
                                        <i className='fas fa-check-circle' style={{color: 'green'}}/>
                                    ) : (
                                        <i className='fas fa-times-circle' style={{color: 'red'}}/>
                                    )}</td>

                                    <td className='d-flex justify-content-evenly'>
                                        <LinkContainer to={`/admin/users/${u._id}/edit`}>
                                            <Button disabled={user['_id'] === u['_id']} variant='outline-primary' className='btn-sm'>
                                                <i className='fas fa-edit'/>
                                            </Button>
                                        </LinkContainer>
                                        <Button  variant='outline-danger' className='btn-sm'
                                                disabled={deleteLoading || user['_id'] === u['_id']}
                                                onClick={handleDelete.bind(null, u._id)}>
                                            {deleteLoading ? <Spinner small/> : <i className='fas fa-trash'/>}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UsersList
