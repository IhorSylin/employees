import { SetStateAction, Suspense, useEffect, useState } from "react";
import { Await, defer, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import cat from '../assets/catttt.gif'

const patchEmployee = (id:number, name:string, addedTitle:string, tribeId:number) => {
  const employee_name = name.trim();
  const title = addedTitle.trim();
  const tribe_id  = tribeId;
  if (employee_name && title && tribe_id) {
    fetch(`/api/employees/${id}`, {
      method: "PATCH",
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




export async function employeesByIdPromise(id:string) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(
      `/api/employees/${id}`
    );
  
    const employeeData = await response.json()
    return employeeData;
}




export async function employeesByIdLoader({ params }:LoaderFunctionArgs) {
    console.log("Loader Request", params);
    const id = params.id || '1';
    return defer({ employeesByIdPromise: employeesByIdPromise(id)});
}



export function EmployeesById() {
    const employeeData = useLoaderData() as { employeesByIdPromise: any};
    const revalidator = useRevalidator();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [NeedsRevalidation, setNeedsRevalidation] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [tribeId, setTribeId] = useState<number>(1);

    useEffect(() => {
      revalidator.revalidate();
      setNeedsRevalidation(false);
    }, [NeedsRevalidation === true])
  
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
      event.preventDefault();
      patchEmployee(id, name, title, tribeId);
      setNeedsRevalidation(true);
      exitEditMode();
    };  

    const enterEditMode = (id:number, name:string, title:string, tribe_id:number) => {
      setId(id)
      setName(name);
      setTitle(title);
      setTribeId(tribe_id);
      setEditMode(true);
    }

    const exitEditMode = () => {
      setEditMode(false);
    }

    console.log("Employees Data", employeeData);
    return (
    <div className="employeesContainer">
      <Suspense fallback={<p>Still loading...</p>}>
        <Await
          resolve={employeeData.employeesByIdPromise}
          errorElement={<p>Something bad happened while fetching data</p>}
        >
          {(employee: any) => {
            if(editMode){
              return (
                <div key={employee.id}>
                    <img src={cat} className="employeeImage"></img>
                    <p>Id: {employee.id}</p>
                    <p>Name:</p>
                    <input type="text" value={name} onChange={handleNameChange}></input>
                    <p>Title:</p>
                    <input type="text" value={title} onChange={handleTitleChange}></input>
                    <p>Tribe ID:</p>
                    <input type="text" value={tribeId} onChange={handleTribeIdChange}></input>
                    <p>Tribe Name: {employee.tribe.name}</p>
                    <p>Tribe Department: {employee.tribe.department}</p>
                    <button type="submit" onClick={handleSubmit}>Submit Changes</button>
                    <button onClick={exitEditMode}>Exit Edit</button>
                </div>
              );
            }else{
              return (
                <div key={employee.id}>
                    <img src={cat} className="employeeImage"></img>
                    <p>Id: {employee.id}</p>
                    <p>Name: {employee.name}</p>
                    <p>Title: {employee.title}</p>
                    <p>Tribe ID: {employee.tribe.id}</p>
                    <p>Tribe Name: {employee.tribe.name}</p>
                    <p>Tribe Department: {employee.tribe.department}</p>
                    <button onClick={() => enterEditMode(employee.id, employee.name, employee.title, employee.tribe.id)}>Edit</button>
                </div>
              );
            }
          }
          }
        </Await>
      </Suspense>
      
      </div>
    );
  }