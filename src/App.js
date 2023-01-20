// import logo from './logo.svg';
import './App.css';
import KPICollator from './components/KPICollator';
// import KPIs from './components/KPIs';
// import { kpis } from './components/bct_use_cases';

function App() {

  // const keys = Object.keys(kpis)

  return (
    <div className="App">
      <KPICollator />

      {/* <KPIs kpiGroup={kpis[keys[0]]} groupName={keys[0]} /> */}

      {/* {keys.map((kpigroup, index) => {

        // console.log(kpigroup);
        return (
          <KPIs key={index} kpiGroup={kpis[kpigroup]} groupName={kpigroup} />
        )
      })} */}

    </div>


  );
}

export default App;
