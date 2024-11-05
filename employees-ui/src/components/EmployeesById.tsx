import { Suspense } from "react";
import { Await, defer, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import cat from '../assets/catttt.gif'

export async function employeesByIdPromise(id:string) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(
      `api/employees/${id}`
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
    const employeeData = useLoaderData() as { employeesByIdPromise: any };
  
    console.log("Employees Data", employeeData);
    return (
    <div className="employeesContainer">
      <Suspense fallback={<p>Still loading...</p>}>
        <Await
          resolve={employeeData.employeesByIdPromise}
          errorElement={<p>Something bad happened while fetching data</p>}
        >
          {(employee: any) => (
            <>
            <div key={employee.id}>
                <img src={cat} className="employeeImage"></img>
                <p>Id: {employee.id}</p>
                <p>Name: {employee.name}</p>
                <p>Title: {employee.title}</p>
                <p>Tribe ID: {employee.tribe.id}</p>
                <p>Tribe Name: {employee.tribe.name}</p>
                <p>Tribe Department: {employee.tribe.department}</p>
            </div>
            </>
          )}
        </Await>
      </Suspense>
      </div>
    );
  }