import React, { useState, useMemo } from 'react';

const Table = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30, relationship: '' },
    { id: 2, name: 'Jane Smith', age: 25, relationship:'' },
    { id: 3, name: 'Bob Johnson', age: 35, relationship: 'test test' },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => requestSort('name')}>
            Name
            {sortConfig.key === 'name' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
          </th>
          <th onClick={() => requestSort('age')}>
            Age
            {sortConfig.key === 'age' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
          </th>
          <th onClick={() => requestSort('relationship')}>
            Relationship
            {sortConfig.key === 'relationship' && (
              <span>{sortConfig.direction === 'ascending' ? ' 🔽' : ' 🔼'}</span>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.relationship}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
