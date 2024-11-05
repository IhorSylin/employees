/* eslint-disable @typescript-eslint/no-explicit-any */
import './Employees.css';
import { Suspense } from "react";
import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from "react-router-dom";


export async function employeesPromise() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(
      'api/employees'
    );
  
    const data = await response.json()
    console.log(`AAAAAAAA${data}`)
    return data
}
  
export async function employeesLoader({ request }) {
    console.log("Loader Request", request);
    return defer({ employeesPromise: employeesPromise() });
}

function on() {
  const overlay = document.getElementsByClassName("addEmployeeOverlay")[0];

  if (overlay instanceof HTMLElement) {
    overlay.style.display = "block";
  }
}

function off() {
  const overlay = document.getElementsByClassName("addEmployeeOverlay")[0];

  if (overlay instanceof HTMLElement) {
    overlay.style.display = "block";
}
}
export function Employees() {
    const data = useLoaderData() as { employeesPromise: any };
    
    

    console.log("Employees Data", data);
    return (
      <>
        <div className='addEmployeeOverlay'>
          <div className='overlayFormContainer'>
            <form>
              <p>Name</p>
              <input type='text'></input>
              <p>Title</p>
              <input type='text'></input>
              <p>Tribe ID</p>
              <input type='number'></input>
              <button type='submit'>Add Employee</button>
              <button onClick={off()}>Close overlay</button>
            </form>
          </div>
        </div>
        <div className="employeesContainer">
          <div className='employeesSearchFieldButtonsContainer'>
            <input type='text' className='employeesTextInput'></input>
            <button type='submit' className='employeesSearchButton'>Search</button>
            <button className='employeesAddButton' onClick={on()} type='submit'>+</button>
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
                resolve={data.employeesPromise}
                errorElement={<p>Something bad happened while fetching data</p>}
              >
                {(employees: any) => (
                  <>
                    
                      {employees.map((employee: any) => (
                        <ul className='employeesListColumnsContainer'>
                          <li key={employee.id}>
                            {employee.id}
                          </li>
                          <li key={employee.id}>
                            {employee.name}
                          </li>
                          <li key={employee.id}>
                            {employee.title}
                          </li>
                          <li key={employee.id}>
                            {employee.tribe.name}
                          </li>
                          <li key={employee.id}>
                            {employee.tribe.department}
                          </li>
                        </ul>
                      ))}
                  </>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </>
    );
  }