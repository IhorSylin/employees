/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function Employees() {
    const data = useLoaderData() as { employeesPromise: any };
  
    console.log("Employees Data", data);
    return (
      <Suspense fallback={<p>Still loading...</p>}>
        <Await
          resolve={data.employeesPromise}
          errorElement={<p>Something bad happened while fetching data</p>}
        >
          {(employees: any) => (
            <>
              <h2>Employees</h2>
              <ul>
                {employees.map((employee: any) => (
                  <li key={employee.id}>
                    {employee.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Await>
      </Suspense>
    );
  }