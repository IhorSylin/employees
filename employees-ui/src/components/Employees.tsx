/* eslint-disable @typescript-eslint/no-explicit-any */
import './Employees.css';
import { SetStateAction, Suspense, useEffect, useState } from "react";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useRevalidator,
} from "react-router-dom";
import trashIconRoute from '../assets/delete-button.svg';


const addEmployee = (name:string, addedTitle:string, tribeId:number) => {
  const employee_name = name.trim()
  const title = addedTitle.trim()
  const tribe_id  = tribeId;
  if (employee_name && title && tribe_id) {
    fetch("/api/employees", {
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


const deleteEmployee = (id:number) => {
  console.log("delete employee" + id);
    fetch(`/api/employees/${id}`, {
      method: "DELETE",
    })
}



export async function employeesPromise() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(
      '/api/employees'
    );
  
    const data = await response.json()
    console.log(`AAAAAAAA${data}`)
    return data
}
 

export async function employeesLoader() {
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



export function PrintNoEntrysIf({check}:{check:boolean}){
  if (!check) {
    return (<p>No entrys!</p>);
  }
  else return (<></>);
}

export function Employees() {
  const data = useLoaderData() as { employeesPromise: any }; 
  const revalidator = useRevalidator();
  const [name, setName] = useState<string>('');
  const [NeedsRevalidation, setNeedsRevalidation] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [tribeId, setTribeId] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [atLeastOneEntryCheck, setAtLeastOneEntryCheck] = useState<boolean>(false);

  useEffect(() => {
    revalidator.revalidate();
    setNeedsRevalidation(false);
  }, [NeedsRevalidation === true])
  
  const handleNameChange= (event: { target: { value: SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleSearchChange= (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchInput(event.target.value);
  };

  const handleTitleChange= (event: { target: { value: SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
  };

  const handleTribeIdChange= (event: React.ChangeEvent<HTMLInputElement> ) => {
    setTribeId((event.target.value as unknown as number));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addEmployee(name, title, tribeId);
    setNeedsRevalidation(true);
    setName('');
    setTitle('');
    setTribeId(1);
    off();
  };

  const handleSearch = (event: {preventDefault: () => void}) => {
    event.preventDefault();
    setSearch(searchInput);
  }

  const handleDelete = (id:number) => {
    console.log("handle delete")
    deleteEmployee(id);
  }

  useEffect((() =>{
    setAtLeastOneEntryCheck(false);
  }), [search])

    console.log("Employees Data", data);
  return (
    <>
      <div className='addOverlay'>
        <div className='overlayForm'>
          <form onSubmit={handleSubmit} className='overlayFormContainer'>
            <button onClick={() => off()} className='overlayFormCloseButton'>x</button>
            <h3>Add Employee</h3>
            <input type='text' onChange={handleNameChange} value={name} placeholder='Name' className='overlayFormInput'></input>
            <input type='text' onChange={handleTitleChange} value={title} placeholder='Title' className='overlayFormInput'></input>
            <input type='number' onChange={handleTribeIdChange} value={tribeId} placeholder='Tribe ID' className='overlayFormInput'></input>
            <button type='submit' className='overlayFormAddEmployeeButton'>Add Employee</button>
          </form>
        </div>
      </div>
      <div className="employeesContainer">
        <div className='employeesSearchFieldButtonsContainer'>
          <input type='text' className='employeesTextInput' onChange={handleSearchChange}></input>
          <button type='submit' className='employeesSearchButton' onClick={handleSearch}>Search</button>
          <button className='employeesAddButton' onClick={() => on()} type='submit'>+</button>
        </div>
        <div className='employeesListContainer'>
          <div className='employeesListColumnsContainer'>
            <p id='employeesListColumnsID'>ID</p>
            <div></div>
            <p>Name</p>
            <div></div>
            <p>Title</p>
            <div></div>
            <p>Tribe</p>
            <div></div>
            <p>Department</p>
          </div>
          <div className='employeesScrolableListPart'>
          <Suspense fallback={<p>Still loading...</p>}>
            <Await
              resolve={data.employeesPromise}
              errorElement={<p>Something bad happened while fetching data</p>}
            >
              {(employees: any) => (
                <>
                  {employees.map((employee: any) => {
                    if(
                      employee.name.toLowerCase().includes(search.toLowerCase()) ||
                      employee.title.toLowerCase().includes(search.toLowerCase()) || 
                      employee.tribe.name.toLowerCase().includes(search.toLowerCase()) ||
                      employee.tribe.department.toLowerCase().includes(search.toLowerCase()) ||
                      search === ''
                    ){
                      setAtLeastOneEntryCheck(true);
                      return(
                        <div  className='employeesListRowsContainer' >
                          <Link to={`${employee.id}`} className='employeesListRowLinkContainer'>
                            <ul key={employee.id} className='employeesListRowInfo'>
                              <li id='employeesListColumnsID'>
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
                            <button className='deleteEmployeeButton' type='submit'><img src={trashIconRoute} onClick={() => {handleDelete(employee.id)}}></img></button>
                        </div>
                      );
                    }
                  })}
                </>
              )}
            </Await>
          </Suspense>
          <PrintNoEntrysIf check={atLeastOneEntryCheck}/>
          </div>
        </div>
      </div>
    </>
  );
}