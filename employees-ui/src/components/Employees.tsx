/* eslint-disable @typescript-eslint/no-explicit-any */
import './Employees.css';
import { SetStateAction, Suspense, useState } from "react";
import {
  Await,
  Link,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from "react-router-dom";
import cat from '../assets/catttt.gif'

const addEmployee = (name:string, addedTitle:string, tribeId:number) => {
  const employee_name = name.trim()
  const title = addedTitle.trim()
  const tribe_id  = tribeId;
  if (employee_name && title && tribe_id) {
    console.log()
    fetch("api/employees", {
      method: "POST",
      body: JSON.stringify({
        employee_name,
        title,
        tribe_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
  }
}



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
  const overlay = document.getElementsByClassName("addOverlay")[0];

  if (overlay instanceof HTMLElement) {
    overlay.style.display = "block";
  }
}

function off() {
  const overlay = document.getElementsByClassName("addOverlay")[0];

  if (overlay instanceof HTMLElement) {
    overlay.style.display = "none";
}
}
export function Employees() {
    const data = useLoaderData() as { employeesPromise: any }; 
    const [name, setName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [tribeId, setTribeId] = useState<number>(1);
    
  const handleNameChange= (event: { target: { value: SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleTitleChange= (event: { target: { value: SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
  };

  const handleTribeIdChange= (event: React.ChangeEvent<HTMLInputElement> ) => {
    setTribeId((event.target.value as unknown as number));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    // event.preventDefault();
    addEmployee(name, title, tribeId);
    setName('');
    setTitle('');
    setTribeId(1);
    off();
};

    console.log("Employees Data", data);
    return (
      <>
        <div className='addOverlay'>
          <div className='overlayFormContainer'>
            <form onSubmit={handleSubmit}>
              <p>Name</p>
              <input type='text' onChange={handleNameChange} value={name}></input>
              <p>Title</p>
              <input type='text' onChange={handleTitleChange} value={title}></input>
              <p>Tribe ID</p>
              <input type='number' onChange={handleTribeIdChange} value={tribeId}></input>
              <button type='submit'>Add Employee</button>
              <button onClick={() => off()}>Close overlay</button>
            </form>
          </div>
        </div>
        <div className="employeesContainer">
          <div className='employeesSearchFieldButtonsContainer'>
            <input type='text' className='employeesTextInput'></input>
            <button type='submit' className='employeesSearchButton'>Search</button>
            <button className='employeesAddButton' onClick={() => on()} type='submit'>+</button>
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
                        <Link to={`${employee.id}`}>
                        <ul className='employeesListColumnsContainer' key={employee.id}>
                          <li>
                            {employee.id}
                          </li>
                          <li>
                            {employee.name}
                          </li>
                          <li>
                            {employee.title}
                          </li>
                          <li>
                            {employee.tribe.name}
                          </li>
                          <li >
                            {employee.tribe.department}
                          </li>
                        </ul>
                        </Link>
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