import React, { useState } from 'react';

function App() {
  const [filters, setFilters] = useState({
    PDF: true,
    showGreen: true,
    showBlue: true,
    showYellow: true,
  });

  const handleCheckboxChange = (filterName) => {
    setFilters({ ...filters, [filterName]: !filters[filterName] });
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={filters.PDF}
          onChange={() => handleCheckboxChange('PDF')}
        />
        <label>PDF</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={filters.showGreen}
          onChange={() => handleCheckboxChange('showGreen')}
        />
        <label>Show Green</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={filters.showBlue}
          onChange={() => handleCheckboxChange('showBlue')}
        />
        <label>Show Blue</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={filters.showYellow}
          onChange={() => handleCheckboxChange('showYellow')}
        />
        <label>Show Yellow</label>
      </div>

      <div>
        <div style={{ display: filters.PDF ? 'block' : 'none' }}>PDF</div>
        <div style={{ display: filters.showGreen ? 'block' : 'none' }}>Green Div</div>
       
      </div>
    </div>
  );
}

export default App;
