/* eslint-disable @typescript-eslint/no-explicit-any */
import './Employees.css';
import { Suspense } from "react";
import {
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";


export async function tribesPromise() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(
      'api/tribes'
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
  
    console.log("Employees Data", data);
    return (
        <div className="employeesContainer">
        <div className='employeesSearchFieldButtonsContainer'>
          <input type='text' className='employeesTextInput'></input>
          <button type='submit' className='employeesSearchButton'>Search</button>
        </div>
        <div className='employeesListContainer'>
          <div className='employeesListColumnsContainer'>
            <p>ID</p>
            <div></div>
            <p>Name</p>
            <div></div>
            <p>Department</p>
            </div>
      <Suspense fallback={<p>Still loading...</p>}>
        <Await
          resolve={data.tribesPromise}
          errorElement={<p>Something bad happened while fetching data</p>}
        >
          {(tribes: any) => (
            <>
              
                {tribes.map((tribe: any) => (
                <ul className='employeesListColumnsContainer' key={tribe.id}>
                    <li >
                        {tribe.id}
                    </li>
                    <li >
                        {tribe.tribe_name}
                    </li>
                    <li >
                        {tribe.department}
                    </li>
                </ul>
                ))}
              
            </>
          )}
        </Await>
      </Suspense>
      </div>
      </div>
    );
  }