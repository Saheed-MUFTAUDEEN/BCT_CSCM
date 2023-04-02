import React from 'react'

function GenInfo({allECSum, ECkey}) {

  // console.log("in gen INFO", allECSum);
  // console.log("KEY");

  // console.log("EC KEYS", Object.keys(allECSum));

  if (allECSum[ECkey] != 0) {
    return (
      <>
        <li> {ECkey} : <b> {allECSum[ECkey]} </b></li>
      </>
    )
  }

}

export default GenInfo