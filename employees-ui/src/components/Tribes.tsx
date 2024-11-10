/* eslint-disable @typescript-eslint/no-explicit-any */
import './Tribes.css';
import './Employees.css';
import { SetStateAction, Suspense, useState } from "react";
import {
  Await,
  defer,
  Link,
  useLoaderData,
} from "react-router-dom";
import { PrintNoEntrysIf } from './Employees';


export async function tribesPromise() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(
      '/api/tribes'
    );
  
    const data = await response.json()
    console.log(`AAAAAAAA`, data)
    return data;
}
  
export async function tribesLoader() {
    return defer({ tribesPromise: tribesPromise() });
}

export function Tribes() {
    const data = useLoaderData() as { tribesPromise: any };
    const [searchInput, setSearchInput] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [atLeastOneEntryCheck, setAtLeastOneEntryCheck] = useState<boolean>(false);

    const handleSearchChange= (event: { target: { value: SetStateAction<string>; }; }) => {
      setSearchInput(event.target.value);
    };

    const handleSearch = (event: {preventDefault: () => void}) => {
      event.preventDefault();
      setSearch(searchInput);
    }
  
    console.log("Employees Data", data);
    return (
        <div className="employeesContainer">
        <div className='employeesSearchFieldButtonsContainer'>
          <input type='text' className='employeesTextInput' onChange={handleSearchChange}></input>
          <button type='submit' className='employeesSearchButton' onClick={handleSearch}>Search</button>
        </div>
        <div className='employeesListContainer'>
          <div className='tribesListColumnsContainer'>
            <p id='employeesListColumnsID'>ID</p>
            <div></div>
            <p>Name</p>
            <div></div>
            <p>Department</p>
            </div>
      <div className='employeesScrolableListPart'>
      <Suspense fallback={<p>Still loading...</p>}>
        <Await
          resolve={data.tribesPromise}
          errorElement={<p>Something bad happened while fetching data</p>}
        >
          {(tribes: any) => (
            <>
              {tribes.map((tribe: any) => {
                if(
                  tribe.tribe_name.toLowerCase().includes(search.toLowerCase()) ||
                  tribe.department.toLowerCase().includes(search.toLowerCase()) || 
                  search === ''
                ){
                  setAtLeastOneEntryCheck(true);
                  return(
                    <div  className='employeesListRowsContainer' >
                    <Link to = {`${tribe.id}`} className='employeesListRowLinkContainer'>
                      <ul className='tribesListRowInfo' key={tribe.id}>
                          <li id='employeesListColumnsID'>
                              {tribe.id}
                          </li>
                          <li >
                              {tribe.tribe_name}
                          </li>
                          <li >
                              {tribe.department}
                          </li>
                      </ul>
                    </Link>
                    </div>
                  );
              }})}
            </>
          )}
        </Await>
      </Suspense>
      <PrintNoEntrysIf check={atLeastOneEntryCheck} />
      </div>
      </div>
      </div>
      
    );
  }