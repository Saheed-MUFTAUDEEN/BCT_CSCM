import React, { useState } from 'react';
import {kpis} from './bct_use_cases';
import KPIs from './KPIs';
import{libraries, tools, ledgers} from './bct_techs'
import Result from './result';
import GenInfo from './genInfo';

import "../styles.scss"

function KPICollator() {

  const allECs = ["EC1", "EC2", "EC3", "EC4", "EC5", "EC6", "EC7", "EC8", "EC9", "EC10", "EC11"]
  const keys = Object.keys(kpis)
  const [results, setResults] = useState({})
  const resultsWithSum = {}
  const [validTools, setValidTools] = useState(null)
  const [validLedgers, setValidLedgers] = useState(null)
  const [validLibraries, setValidLibraries] = useState(null)
  const [allECSum, setAllECSum] = useState ({})
  const [ECUnion, setECUnion] = useState()


  const getAllECSums = (arg) => {
    const ecSums = {}
    allECs.forEach(each => {
      ecSums[each] = 0
    })
    for (let key in arg) {
      for (let ec in arg[key]['sums']) {
        ecSums[ec] += arg[key]['sums'][ec]
      }
    }

    setAllECSum(ecSums)
    // console.log("GEN EC SUM", ecSums);
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
    console.log("COMPUTE SUM" + res)
    return res


  }

  const handleGetResult = () => {

    const allECUnion = getECUnion()

    if (allECUnion.length > 0) {

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
    } 
    
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
    console.log("EC UNION", union);
    setECUnion(union)
    return union
  }

  // const isSubset = (tool, ecs) => {
  //   let m = tool.length;
  //   let n = ecs.length;
  //   // console.log("SELECTED ECS", ecs);

  //   let s = new Set();
  //   for (let i = 0; i < m; i++)
  //   {
  //     s.add(tool[i]);
  //   }
  //   let p = s.size;
  //   for (let i = 0; i < n; i++)
  //   {
  //     s.add(ecs[i]);
  //   }
    
  //   if (s.size === p)
  //   {
  //     let lengthDiff = m - n
      
  //     return [lengthDiff]
  //   }
  //   else
  //   {
  //     return null
  //   }
  // }

  const getCompatibility = (tech, selectedECs) => {

    let finalRes = []
    
    for (let each in tech) {
      let res = {}
      let matches = []
      let misses = []
      let excess = []
      selectedECs.forEach(ec => {
        if (tech[each].includes(ec)) {
          matches.push(ec)
        }
        else {
          misses.push(ec)
        }
      })

      tech[each].forEach(each => {
        if (!matches.includes(each) && !misses.includes(each)) {
          excess.push(each)
        }
      })
      res["tech"] = each
      res["matches"] = matches
      res["misses"] = misses
      res["excess"] = excess
      finalRes.push(res)
      // console.log("RESULT", res);
    }

    let sortedRes = finalRes.sort((a, b) => (a["matches"].length < b["matches"].length) ? 1 : (a["matches"].length > b["matches"].length) ? -1 : 0)
    return sortedRes
  }


  const getRightTool = (arg) => {

    const validTools = getCompatibility(tools, arg)
    console.log("VALID TECH", validTools);

    // valid

    // arg = allECUnion
    // console.log("EC UNION", arg);

    // const validTools = []
    // getCompatibility(tools, arg)

    // for (let key in tools) {

      // I should not check if it is subset again.
      // const validTool = isSubset(tools[key], arg)

      // if (validTool) {
      //   validTool.push(key)
      //   validTools.push(validTool)
      //   // console.log(validTool) // 0 = difference, 1 = tool name
      // }
    // }

    // validTools.sort((a, b) => a[1] - b[1])

    setValidTools(validTools)
  }

  const getRightLibrary = (arg) => {

    const validLibraries = getCompatibility(libraries, arg)


  //   const validLibraries = []

  //   for (let key in libraries) {
  //     const validLibrary = isSubset(libraries[key], arg)
  //     if (validLibrary) {
  //       validLibrary.push(key)
  //       validLibraries.push(validLibrary)
  //     }
  //   }

  //   validLibraries.sort((a, b) => a[1] - b[1])

    setValidLibraries(validLibraries)

  }

  const getRightLedger = (arg) => {

    const validLedgers = getCompatibility(ledgers, arg)

    // const validLedgers = []

    // for (let key in ledgers) {
    //   const validLedger = isSubset(ledgers[key], arg)
    //   if (validLedger) {
    //     validLedger.push(key)
    //     validLedgers.push(validLedger)
    //   }
    // }

    // validLedgers.sort((a, b) => a[1] - b[1])
    // console.log("VALID LEDGERS" + validLedgers);

    setValidLedgers(validLedgers)

  }

  return (
    <div>

      {/* <KPIs kpiGroup={kpis[keys[0]]} groupName={keys[0]} addResult={addResult} /> */}


      <div className='kpi_container'>

        {keys.map((kpigroup, index) => {

          return (
            <KPIs key={index} kpiGroup={kpis[kpigroup]} groupName={kpigroup} addResult={addResult} handleGetResult={handleGetResult} />
        )
        })}
      </div>

      <button onClick={handleGetResult} id="get_results" >GET RESULTS</button>

      <section id='ecCount'>

        <h2>EC COUNT</h2>

        {(Object.keys(allECSum)).map((each, key) => {

          return <GenInfo allECSum={allECSum} ECkey={each} key={key} />

        })}

          
      </section>

      {
        ECUnion &&
        <section id='results' >
  
            {<Result title={"BEST FIT LEDGER"} res={validLedgers} /> }
    
            {<Result title={"BEST FIT TOOL"} res={validTools} /> }
    
            {<Result title={"BEST FIT LIBRARY"} res={validLibraries} /> }
        </section>
        // <h2>NO ENTRY</h2>
      }


      

      {/* {(validLedgers || validLibraries || validTools) && <Result tools={validTools} libraries={validLibraries} ledgers={validLedgers} results={resultsWithSum} />} */}
    </div>
  )
}

export default KPICollator