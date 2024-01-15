import React from 'react'
import './Card.css'

const Card = ({name,description,interests,linkedin,twitter}) => {
  return (
    <div>
        <div>
            <p>{name}</p>
            <p>{description}</p>
            <p>{interests}</p>
            <p>{linkedin}</p>
            <p>{twitter}</p>
        </div>
    </div>
    
  )
}

export default Card