import React, { useState } from 'react';
import {kpis} from './bct_use_cases';
import KPIs from './KPIs';
import{libraries, tools, ledgers} from './bct_techs'
import Result from './result';
import GenInfo from './genInfo';

function KPICollator() {

  const allECs = ["EC1", "EC2", "EC3", "EC4", "EC5", "EC6", "EC7", "EC8", "EC9", "EC10", "EC11"]
  const keys = Object.keys(kpis)
  const [results, setResults] = useState({})
  const resultsWithSum = {}
  const [validTools, setValidTools] = useState(null)
  const [validLedgers, setValidLedgers] = useState(null)
  const [validLibraries, setValidLibraries] = useState(null)
  const [allECSum, setAllECSum] = useState ({})


  const getAllECSums = (arg) => {
    const ecSums = {}
    allECs.forEach(each => {
      ecSums[each] = 0
    })
    for (let key in arg) {
      // console.log("TEST", arg[key]['sums']);
      for (let ec in arg[key]['sums']) {
        ecSums[ec] += arg[key]['sums'][ec]
      }
    }

    setAllECSum(ecSums)
    console.log("GEN EC SUM", ecSums);
  }

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
    getRightTool(allECUnion)
    getRightLibrary(allECUnion)
    getRightLedger(allECUnion)
    getAllECSums(resultsWithSum)


    // console.log("RES WITH SUM", resultsWithSum);
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
      
      return [lengthDiff]
    }
    else
    {
      // console.log(`${ecs} is not subset of ${tool}`);
      return null
    }
  }

  const getRightTool = (arg) => {

    console.log("EC UNION", arg);

    const validTools = []

    for (let key in tools) {
      const validTool = isSubset(tools[key], arg)
      // console.log("SSSSS", validTool);
      if (validTool) {
        validTool.push(key)
        validTools.push(validTool)
        // console.log('RIGHT KEY', key);
      }
    }

    validTools.sort((a, b) => a[1] - b[1])

    setValidTools((validTools.length > 0) ? validTools: null)
    // console.log("VALID TOOLS", validTools);

  }

  const getRightLibrary = (arg) => {

    const validLibraries = []

    for (let key in libraries) {
      const validLibrary = isSubset(libraries[key], arg)
      // console.log("SSSSS", validTool);
      if (validLibrary) {
        validLibrary.push(key)
        validLibraries.push(validLibrary)
      }
    }

    validLibraries.sort((a, b) => a[1] - b[1])

    setValidLibraries((validLibraries.length > 0) ? validLibraries: null)
    // console.log("VALID LIBRARIES", validLibraries);

  }

  const getRightLedger = (arg) => {

    const validLedgers = []

    for (let key in ledgers) {
      const validLedger = isSubset(ledgers[key], arg)
      // console.log("SSSSS", validTool);
      if (validLedger) {
        validLedger.push(key)
        validLedgers.push(validLedger)
      }
    }

    validLedgers.sort((a, b) => a[1] - b[1])

    setValidLedgers((validLedgers.length > 0) ? validLedgers: null)
    // console.log("VALID LEDGER", validLedgers);

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

     

      <section>

        <h3>EC COUNT</h3>

        {(Object.keys(allECSum)).map((each, key) => {

          return <GenInfo allECSum={allECSum} ECkey={each} key={key} />

        })}


        {validLedgers ? <Result title={"ELIGIBLE LEDGER(S)"} res={validLedgers} /> : <h3>NO ELIGIBLE LEDGER</h3>}

        {validTools ? <Result title={"ELIGIBLE TOOL(S)"} res={validTools} /> : <h3>NO ELIGIBLE TOOL</h3>}

        {validLibraries ? <Result title={"ELIGIBLE LIBRARY(IES)"} res={validLibraries} /> : <h3>NO ELIGIBLE LIBRARY</h3>}


      </section>

      

      {/* {(validLedgers || validLibraries || validTools) && <Result tools={validTools} libraries={validLibraries} ledgers={validLedgers} results={resultsWithSum} />} */}
    </div>
  )
}

export default KPICollator