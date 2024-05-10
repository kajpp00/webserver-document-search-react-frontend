import { useState, useEffect } from 'react'
import Papa from "papaparse"
// import "./assets/db.csv"
import './App.css'
// import Tabledata from './components/Table'
import Search from './components/Search'
// import Table from './components/Sample'
import FileFilters from './components/FileFilters'
import {DataProvider} from './context/myContext'

function App() {




  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch('src/data/keyword-and-context-match.csv')
  //     const reader = response.body.getReader()
  //     const result = await reader.read()
  //     const decoder = new TextDecoder('utf-8')
  //     const csv = decoder.decode(result.value)
  //     const results = Papa.parse(csv, { quotes:true, header: true, newline: "\r\n" })
  //     const rows = results.data
  //     setRows(rows)
  //   }
  //   getData()
  //   console.log('test from app')
  // }, [])

  return (
    <>
      <DataProvider>

        {/* <Table/> */}
        <Search />
        {/* <FileFilters /> */}
        {/* <Tabledata rows={rows} /> */}
        {/* <main id="main">
      </main> */}
      </DataProvider>
    </>
  )
}

export default App
