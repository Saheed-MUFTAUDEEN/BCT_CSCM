import React, { useEffect, useState } from 'react';
import {kpis} from './bct_use_cases';
import KPIs from './KPIs';
import{libraries, tools, ledgers} from './bct_techs'

function KPICollator() {

  const allECs = ["EC1", "EC2", "EC3", "EC4", "EC5", "EC6", "EC7", "EC8", "EC9", "EC10", "EC11"]
  const keys = Object.keys(kpis)
  const [results, setResults] = useState({})
  const [resultsWithSum, setResultsWithSum] = useState({})
  const [ecUnionArr, setEcUnionArr] = useState([])
  

  const computeSum = (arg) => {

    const sums = {}
    allECs.forEach(each => {
      sums[each] = 0
    })

    for (let key in arg) {

      const ecArr = arg[key]
      ecArr.forEach(ec => {
        sums[ec] +=1
      });
    }
    const res =  {...arg, sums}

    // console.log("IN THE FUNCTION", res);
    return res

  }

  const handleGetResult = () => {

    const allECUnion = getECUnion()
    for (let key in results) {

      if (Object.keys(results[key]).length !== 0) {
        const res = computeSum(results[key])
        resultsWithSum[key] = res
      }
    }
    setEcUnionArr(allECUnion)

    getRightTool(ecUnionArr)
    getRightLibrary(ecUnionArr)
    getRightLedger(ecUnionArr)
  }

  const addResult = (result) => {

    const key = Object.keys(result)
    results[key[0]] = result[Object.keys(result)]
    setResults({...results})
  }

  const getECUnion = () => {

    let union = []

    for (let key in results) {
      if (Object.keys(results[key]).length !== 0) {
        for (let innerKey in results[key]) {

          const ecArr = results[key][innerKey]
          union = [...union, ...ecArr]
        }
      }
    }

    union = [...new Set([...union])]
    return union
  }

  const isSubset = (tool, ecs) => {
    let m = tool.length;
    let n = ecs.length;

    let s = new Set();
    for (let i = 0; i < m; i++)
    {
      s.add(tool[i]);
    }
    let p = s.size;
    for (let i = 0; i < n; i++)
    {
      s.add(ecs[i]);
    }
    
    if (s.size === p)
    {
      let lengthDiff = m - n
      // console.log(`${ecs} is subset of ${tool} with ${lengthDiff} difference`);
      // console.log(true, lengthDiff);
      return [true, lengthDiff]
    }
    else
    {
      // console.log(`${ecs} is not subset of ${tool}`);
      return null
    }
  }

  const getRightTool = (ecUnionArr) => {

    console.log("EC UNION", ecUnionArr);

    const validTools = []

    for (let key in tools) {
      const validTool = isSubset(tools[key], ecUnionArr)
      // console.log("SSSSS", validTool);
      if (validTool) {
        validTool.push(key)
        validTools.push(validTool)
        // console.log('RIGHT KEY', key);
      }
    }

    validTools.sort((a, b) => a[1] - b[1])

    console.log("VALID TOOLS", validTools);

  }


  const getRightLibrary = (ecUnionArr) => {

    console.log("EC UNION", ecUnionArr);

    const validLibraries = []

    for (let key in libraries) {
      const validLibrary = isSubset(libraries[key], ecUnionArr)
      // console.log("SSSSS", validTool);
      if (validLibrary) {
        validLibrary.push(key)
        validLibraries.push(validLibrary)
      }
    }

    validLibraries.sort((a, b) => a[1] - b[1])

    console.log("VALID LIBRARIES", validLibraries);

  }

  const getRightLedger = (ecUnionArr) => {

    console.log("EC UNION", ecUnionArr);

    const validLedgers = []

    for (let key in ledgers) {
      const validLedger = isSubset(ledgers[key], ecUnionArr)
      // console.log("SSSSS", validTool);
      if (validLedger) {
        validLedger.push(key)
        validLedgers.push(validLedger)
      }
    }

    validLedgers.sort((a, b) => a[1] - b[1])

    console.log("VALID LEDGER", validLedgers);

  }

  return (
    <div>

      {/* <KPIs kpiGroup={kpis[keys[0]]} groupName={keys[0]} addResult={addResult} /> */}

      {keys.map((kpigroup, index) => {

      return (
        <KPIs key={index} kpiGroup={kpis[kpigroup]} groupName={kpigroup} addResult={addResult} handleGetResult={handleGetResult} />
      )
      })}

      <button onClick={handleGetResult}>Get Appropriate tool</button>
    </div>
  )
}

export default KPICollator