import React from 'react'

const Display = (props) => {
    return (
        <div className="Display">
            {props.data.join('')}
        </div>
    )
}

export default Display