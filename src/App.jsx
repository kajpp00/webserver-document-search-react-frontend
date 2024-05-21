import './App.css'
import Search from './components/Search'
import {DataProvider} from './context/myContext'

function App() {

  return (
    <>
      <DataProvider>
        <Search />
      </DataProvider>
    </>
  )
}

export default App
