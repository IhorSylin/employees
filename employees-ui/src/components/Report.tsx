/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Employees.css"
import { Suspense } from "react";
import {
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";


export async function reportPromise() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(
      '/api/report'
    );
  
    const data = await response.json()
    console.log(`AAAAAAA${data}`)
    return data
}
  
export async function reportLoader() {
    return defer({ reportPromise: reportPromise() });
}

export function Report() {
    const data = useLoaderData() as { reportPromise: any };
  
    console.log(" Data", data);
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
          <p>Title</p>
          <div></div>
          <p>Tribe</p>
          <div></div>
          <p>Department</p>
        </div>
      <Suspense fallback={<p>Still loading...</p>}>
        <Await
          resolve={data.reportPromise}
          errorElement={<p>Something bad happened while fetching data</p>}
        >
          {(report: any) => (
            <>
              <h2>Report</h2>
              <ul>
                {report.map((tribe: any, index: number) => {
                    const currentKey = Object.keys(tribe);
                    const tribeObject = tribe[currentKey[0]];

                    console.log(currentKey);

                    if (!tribeObject) {
                        return;
                    }

                    console.log('Tribe', tribeObject);

                    return (
                        <li key={`key-of-tribe-${index}`}>
                            {currentKey[0]}
                            <ul>
                                {tribeObject.employees.map((employee: any) => {return (
                                    <li key={employee.id}>
                                        {employee.employee_name}
                                        {console.log(employee.employee_name)}
                                    </li> )
                                })}
                            </ul>
                        </li>
                    )
                })}
              </ul>
            </>
          )}
        </Await>
      </Suspense>
      </div>
      </div>
    );
  }