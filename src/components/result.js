import React from 'react'

function Result({res, title}) {

  if (res) {
    return (
      <div>
        <h3>{title}</h3>
        {res.map((e, index) => {
          return <li key={index}>{e[1]} with <b>{e[0]}</b> excess EC(s)</li>
        })}
      </div>
    )
  } 
  
}

export default Result