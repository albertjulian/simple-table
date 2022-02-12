import React, { FunctionComponent, useState } from 'react';
import './App.css';
import Search from './components/search';
import TableComponent from './components/table';

const initialState = {
  page: 1,
  pageSize: 5,
  results: 20,
};

const App: FunctionComponent = () => {
  const [querySearch, setQuerySearch] = useState(initialState);
  const [trigger, setTrigger] = useState(true);

  const handleSearch = (params: any) => {

    setQuerySearch({
      ...querySearch,
      ...params,
    })

    setTrigger(!trigger);
  }

  return (
    <div className="App">
      <header className="App-header">
        Example With Search and Filter
      </header>
      <Search callback={handleSearch} />
      <TableComponent trigger={trigger} params={querySearch} callback={handleSearch} />
    </div>
  );
}

export default App;
