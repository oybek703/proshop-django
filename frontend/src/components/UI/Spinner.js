import React from 'react'

const Spinner = ({small}) => {
    return (
        <div className={`spinner-border ${small && 'spinner-border-sm'}`} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Spinner