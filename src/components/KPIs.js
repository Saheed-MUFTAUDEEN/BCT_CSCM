import React, { useEffect, useState } from 'react';
import { kpis } from './bct_use_cases';

function KPIs({kpiGroup, groupName, addResult}) {
  // console.log(Object.keys(kpigroup));

  const kpi_list = Object.keys(kpiGroup)
  const [selected, setSelected] = useState({})

  const res = {
    [groupName]: selected
  }

  // console.log("RES", res[Object.keys(res)]);

  // console.log("RESSSS", res);

  useEffect(() => {
    addResult(res)
  }, [selected])


  const checkSelected = (e) => {

    const ecArray = e.target.value
    const kpi_choice = `${e.target.name}`
    // console.log(kpi_choice);

    if (e.target.checked) {
      selected[kpi_choice] = ecArray.split(",")
      setSelected(
        {...selected}
      );

    } else {
      delete selected[kpi_choice] 
      setSelected(
        {...selected}
      )
      // addResult(res)

    }

  }

  return (
    <div>
      <h2>{groupName}</h2>

      {kpi_list.map((kpi, index) => {
        const val = kpis[groupName][kpi]
          return (
            <div key={index}>
            <p>
              <input type="checkbox" onClick={checkSelected} value={val} id={kpi} name={kpi}  />
              <label key={index} htmlFor={kpi} >{(kpi.split("_")).join(" ")}</label>
            </p>
            </div>
          )
      })}
    </div>
  )
}

export default KPIs


// To Get The Ecs 
// {kpis[groupName][kpi]}
