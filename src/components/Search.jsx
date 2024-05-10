import React, { useEffect, useContext, useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import Papa from "papaparse"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components'
// import Rows from './Rows'
import { DataContext } from '../context/myContext'

export default function Search() {
  const [filters, setFilters] = useState({
    PDF: true,
    DOCX: true,
    DOC: true,
    XLSX: true,
    PPTX: true,
    HTML: true,
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const data = useContext(DataContext)
  const [checked, setChecked] = useState([])
  const [exportCSV, setExportCSV] = useState([])


  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key === 'KEYWORD_MATCHES' || sortConfig.key === 'RELATIONSHIPS' || sortConfig.key === 'FILE' || sortConfig.key === 'FILE_TYPE' || sortConfig.key === 'ROOT_FOLDER') {
      sortableData.sort((a, b) => {
        // console.log(a.RELATIONSHIPS.localeCompare(b.RELATIONSHIPS))
        const key = sortConfig.key
        console.log(key)
        return sortConfig.direction === 'ascending' ?
          a[`${sortConfig.key}`].localeCompare(b[`${sortConfig.key}`]) :
          b[`${sortConfig.key}`].localeCompare(a[`${sortConfig.key}`]);
      })
    }
    //   else if (sortConfig.key !== null) {
    //     sortableData.sort((a, b) => {
    //       if (a[sortConfig.key] < b[sortConfig.key]) {
    //       return sortConfig.direction === 'ascending' ? -1 : 1;
    //     }
    //     if (a[sortConfig.key] > b[sortConfig.key]) {
    //       return sortConfig.direction === 'ascending' ? 1 : -1;
    //     }
    //     return 0;
    //   });
    // }
    return sortableData;

  }, [data, sortConfig]);

  const requestSort = (key) => {

    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });

  };

  const handleSearch = (e) => {
    var value = e.target.value.toLowerCase()
    const rows = document.querySelectorAll('.rows')

    rows.forEach(x => {
      if (x.innerText.toLowerCase().indexOf(value) > -1) {
        x.classList.remove('d-none')
      } else {
        x.classList.add('d-none')
      }

    })
  }

  const handleCheckboxChange = (filterName) => {
    setFilters({ ...filters, [filterName]: !filters[filterName] });
  };



  const handleExportSelections = (e) => {
    e.target.setAttribute('checked', !e.target.checked)
    setChecked([...checked, e.target.id])
  }
  const handleFilter = (e) => {
    var value = e.target.value.toLowerCase()
    const rows = document.querySelectorAll('.rows')

    console.log(e.target.checked)
  }

  const handleExport = () => {

    const exportArr = []

    if (checked.length) {

      checked.forEach(x => {

        data.forEach(row => {

          if (row.URL === x) {
            exportArr.push(row)
          }

        })

      })

      var csv = Papa.unparse(exportArr)
      var csvData = new Blob([csv], { header: true, type: 'text/csv;charset=utf-8' })
      var csvURL = null

      if (navigator.msSaveBlob) {
        csvURL = navigator.msSaveBlob(csvData, 'download.csv')
      } else {
        csvURL = window.URL.createObjectURL(csvData)
      }

      var tempLink = document.createElement('a')
      tempLink.href = csvURL
      tempLink.setAttribute('download', 'download.csv')
      tempLink.click()
      // setExportCSV(exportArr)

    }
  }



  return (
    <>
      <Navbar
        className="border-bottom bg-light text-center p-2 "
        expand="lg"
        sticky="top"
      >
        {/* <Navbar.Brand>
          <h1 className="h5">ACR Repository</h1>
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <InputGroup size="sm" className="px-lg-5 pt-lg-2 p-2 pt-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Search
            </InputGroup.Text>
            <Form.Control
              aria-label="Search"
              aria-describedby="inputGroup-sizing-default"
              onKeyUp={handleSearch}
            />
          </InputGroup>
          <a href="https://www.tamuk.edu/_misc_assets/scraper-export-multiple-paths.csv">Download csv</a>
          <FileFilterWrapper>
            <div>
              <input type="checkbox" checked={filters.PDF} onChange={() => handleCheckboxChange('PDF')} />
              <label>
                PDF
              </label>
            </div>
            <div>
              <input type="checkbox" checked={filters.DOCX} onChange={() => handleCheckboxChange('DOCX')} />
              <label>
                DOCX
              </label>
            </div>
            <div>
              <input type="checkbox" checked={filters.DOC} onChange={() => handleCheckboxChange('DOC')} />
              <label>
                DOC
              </label>
            </div>
            <div>
              <input type="checkbox" checked={filters.XLSX} onChange={() => handleCheckboxChange('XLSX')} />
              <label>
                XLSX
              </label>
            </div>
            <div>
              <input type="checkbox" checked={filters.PPTX} onChange={() => handleCheckboxChange('PPTX')} />
              <label>
                PPTX
              </label>
            </div>
            <div>
              <input type="checkbox" checked={filters.HTML} onChange={() => handleCheckboxChange('HTML')} />
              <label>
                HTML
              </label>
            </div>
          </FileFilterWrapper>
        </Navbar.Collapse>
      </Navbar>
      <StickyWrapper className=" sticky-top">
        <ColumnHeader>
          <div>Row</div>
          <div onClick={() => requestSort('FILE')}>
            File
            {sortConfig.key === 'FILE' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
          </div>
          <div onClick={() => requestSort('FILE_TYPE')}>
            File Type
            {sortConfig.key === 'FILE_TYPE' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
          </div>
          <div onClick={() => requestSort('ROOT_FOLDER')}>
            Root Folder
            {sortConfig.key === 'ROOT_FOLDER' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
          </div>
          <div onClick={() => requestSort('KEYWORD_MATCHES')}>
            Context
            {sortConfig.key === 'KEYWORD_MATCHES' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
            </div>
          {/* <div>Created Date</div>
          <div>Modified Date</div> */}
          <div onClick={() => requestSort('RELATIONSHIPS')}>
            Relationships
            {sortConfig.key === 'RELATIONSHIPS' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
          </div>
          {/* <div onClick={handleExport} type="button" disabled value="download CSV">Export</div> */}
        </ColumnHeader>
      </StickyWrapper>
      {/* <Rows props={sortedData}/> */}
      <div>
        {sortedData.map((x, i) =>
            <DataWrapper
              className='rows'
              style={{ display: filters[x.FILE_TYPE.toUpperCase()] ? 'grid' : 'none' }}
              data-id={x.URL} key={i}>
              <div>{i = i + 1}</div>
              <div><a href={x.URL}>{x.FILE}</a></div>
              <div className="text-center">{x.FILE_TYPE.toUpperCase()}</div>
              <div className="text-center">{x.ROOT_FOLDER}</div>
              <div>
                    <div>Keyword Matches: {x.KEYWORD_MATCHES.replace(';', ', ')}</div>
                <details>
                  <summary>Show Context</summary>
                  <Context>
                    <ul>{x.CONTEXT !== undefined &&
                      x.CONTEXT.split('<li>').map((xx, key) =>
                        <li key={key} dangerouslySetInnerHTML={{ __html: xx }}></li>
                      )
                    }
                    </ul>
                  </Context>
                </details>
              </div>
              {/* <div>{x.CREATION_DATE}</div>
            <div>{x.MODIFIED_DATE}</div> */}
              <div>
                <ul>
                  {x.RELATIONSHIPS &&
                    x.RELATIONSHIPS.split(';').map((xx, key) =>
                      xx === 'N/A' ?
                        <p key={key}>{xx}</p>
                        :
                        <li key={key}><a href={xx}>{xx}</a></li>
                    )
                  }
                </ul>
              </div>
              {/* <div>
              <label>
                <input type="checkbox" id={x.URL} onChange={(e) => handleExportSelections(e)} />
              </label>
            </div> */}
            </DataWrapper>
        )}
      </div>

    </>
  );
}

const grid = '.08fr .25fr .15fr .15fr 1fr .5fr'
// const grid = 'repeat(6, 1fr)'

const ColumnHeader = styled.div`
  display:grid;
  // padding:0 20px;
  grid-template-columns:${grid};
  div {
    display:flex;
    justify-content:center;
    border-right:1px solid;
    font-weight:bold;
    &:last-child {
      border-right:0px!important
    }

}
span {
  cursor: pointer
}
`

const StickyWrapper = styled.div`
  top:64px;
  background:white;
  border-bottom:1px solid;
`

const DataWrapper = styled.div`
    display:grid;
    grid-template-columns:${grid};
    word-break:break;
    &:nth-child(even){
      background:#eee;
    };
    > div {
      padding:20px;
        word-break:break-word;
    }
   
`

const Context = styled.div`
overflow:auto;
word-break:keep-all!important;
span {
    font-weight:800;
    color:red;
    text-decoration:underline
}
li {
    padding:10px 0
}
`

const FileFilterWrapper = styled.div`
  width:100%;
  display:flex;
  div {
    padding:20px;
  }
`