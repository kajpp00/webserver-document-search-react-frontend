import React, { useState,useEffect, createContext } from 'react'
import Papa from "papaparse"
const DataContext = createContext(undefined);

function DataProvider({ children }) {
    const [rows, setRows] = useState([]);
    const [flags, setFlags] = useState([])

    useEffect(() => {
          async function getData() {
            const response = await fetch('https://www.tamuk.edu/_misc_assets/search-tool/matches-export.csv')
            const reader = response.body.getReader()
            const result = await reader.read()
            const decoder = new TextDecoder('utf-8')
            const csv = decoder.decode(result.value)
            const results = Papa.parse(csv, { header: true })
            const dataRows =  results.data
            setRows(dataRows)
          }
          getData()

        
          async function getFlagged() {
            // const response = await fetch('allowable.csv')
            const response = await fetch('https://www.tamuk.edu/_misc_assets/search-tool/allowable.csv')
            const reader = response.body.getReader()
            const result = await reader.read()
            const decoder = new TextDecoder('utf-8')
            const csv = decoder.decode(result.value)
            const results = Papa.parse(csv, { header: true })
            const dataRows =  results.data
            setFlags(dataRows)
          }
          getFlagged()
          
        }, [])

        const values = {rows, flags}

    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider, DataContext}

