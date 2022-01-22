import React, {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../UI/FormContainer'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import {fetchUser, updateUser} from '../../redux/actions'
import {USER_UPDATE_RESET} from '../../redux/actions/types'
import Spinner from '../UI/Spinner'

function EditUser() {
    const {id: userId} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const {userDetails, error, loading} = useSelector(state => state.userDetails)
    const {user} = useSelector(state => state.userInfo)

    const {
        updated,
        error: updateError,
        loading: updateLoading
    } = useSelector(state => state.userUpdate)

    useEffect(() => {
        if (updated) {
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/users')
        } else {
            if (!userDetails.name || userDetails._id !== Number(userId)) {
                dispatch(fetchUser(userId))
            } else {
                setName(userDetails.name)
                setEmail(userDetails.email)
                setIsAdmin(userDetails.is_admin)
            }
        }

    }, [userDetails, userId, updated, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({id: userDetails._id, name, email, isAdmin}))
    }
    if(user['_id'] === +userId) return <Navigate to='/profile'/>
    return (
        <div>
            <Link to='/admin/users' className='btn btn-light'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {updateError && <Alert type='danger'>{updateError}</Alert>}

                {loading ? <Loader/> : error ? <Alert type='danger'>{error}</Alert>
                    : (
                        <Form onSubmit={submitHandler}>
                            <br/>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>
                            <br/>
                            <Button type='submit' variant='primary' disabled={updateLoading}>
                                Update {updateLoading && <Spinner small/>}
                            </Button>

                        </Form>
                    )}

            </FormContainer>
        </div>

    )
}

export default EditUser