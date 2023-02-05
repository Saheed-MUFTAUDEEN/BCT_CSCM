import React from 'react'

function GenInfo({allECSum}) {

  console.log("in gen INFO", allECSum);

  for (let key in allECSum) {
    // console.log(key);
    return (
      <li>{key} : <b>{allECSum[key]}</b></li>
    )
  }
}

export default GenInfo