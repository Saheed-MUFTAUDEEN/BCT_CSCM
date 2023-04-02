import React from 'react'

function Result({res, title}) {

  if (res) {
    return (
      <div>
        <h3>{title}</h3>
        {res.map((e, index) => {
          return <li key={index}>{e[1]}</li>
        })}
      </div>
    )
  } 
  
}

export default Result