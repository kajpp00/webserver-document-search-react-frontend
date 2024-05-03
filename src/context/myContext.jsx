import React, { useState,useEffect, createContext } from 'react'
import Papa from "papaparse"
const DataContext = createContext(undefined);

function DataProvider({ children }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
          async function getData() {
            const response = await fetch('https://www.tamuk.edu/_misc_assets/scraper-export-test.csv')
            const reader = response.body.getReader()
            const result = await reader.read()
            const decoder = new TextDecoder('utf-8')
            const csv = decoder.decode(result.value)
            const results = Papa.parse(csv, { quotes:true, header: true, newline: "\r\n" })
            const rows = results.data
            setRows(rows)
          }
          getData()
        }, [])

    return (
        <DataContext.Provider value={rows}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider, DataContext}

