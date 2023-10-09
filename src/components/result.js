import React from 'react'

function Result({res, title}) {

  // let e = res[0]
  let count = 0;

  if (res) {
    return (
      <div>
        <h2 style={{border: " 2px solid black"}} >{title}</h2>
        
        {
        res.map((e, index) => {
          count++;
          if(count < 3) 
          {

            return (
  
            <li style={{listStyle: "none", textAlign: "left", lineHeight: "10px", margin: "25px 0"}}>
              <b style={{display: "block", lineHeight: "20px"}}><h3>{e["tech"].split("_").join(" ")}</h3></b>
  
              {/* <p style={{display: "block", paddingLeft: "16px", fontSize: "14px"}}>
                <b>MATCHES: </b> 
                {e["matches"].length > 0 ? e["matches"].join(", ") : <i>Empty</i>}  {<b>[{e["matches"].length}]</b>}
              </p> */}
  
              {/* <p style={{display: "block", paddingLeft: "16px", fontSize: "14px"}}>
                <b>MISSES: </b> 
                {e["misses"].length > 0 ? e["misses"].join(", ") : <i>Empty</i>} {<b>[{e["misses"].length}]</b>}
              </p> */}
  
              {/* <p style={{display: "block", paddingLeft: "16px", fontSize: "14px"}}>
                <b>EXCESSES: </b>
                {e["excess"].length > 0 ? e["excess"].join(", ") : <i>Empty</i>} {<b>[{e["excess"].length}]</b>}
              </p> */}
                          
            </li>
              
              )
          }
        }
        )
        } 
      </div>
    )
  } 
  
}

export default Result