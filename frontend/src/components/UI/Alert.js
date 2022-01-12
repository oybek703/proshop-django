import React from 'react'

const Alert = ({type = 'danger', message, children}) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {message || children}
        </div>
    )
}

export default Alert