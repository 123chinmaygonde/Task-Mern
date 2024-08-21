import React,{useState} from 'react'
import TransactionTable from './components/TransactionTable'
import Statistics from './components/Statistics'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import './App.css'

function App() {
  const[month,setMonth]=useState('March');
 

  return (
    <div>
        <h1>Transaction Dashboard</h1>
            <TransactionTable />
            <Statistics month={month} />
            <BarChart month={month} />
            <PieChart month={month} />
    </div>
  )
}

export default App
