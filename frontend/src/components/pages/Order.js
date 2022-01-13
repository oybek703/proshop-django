import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Order = () => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userInfo)
    useEffect(() => {
        if(!user) navigate('/')
    }, [user, navigate])
    return (
        <>
         <h1>ORDER Page</h1>
        </>
    )
}

export default Order