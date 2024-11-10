import { Suspense } from "react";
import { Await, defer, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import cat from '../assets/catttt.gif'

export async function tribesByIdPromise(id:string) {  
    const response = await fetch(
      `/api/tribes/${id}`
    );
  
    const tribeData = await response.json()
    return tribeData;
}

export async function tribesByIdLoader({ params }:LoaderFunctionArgs) {
    const id = params.id || '1';
    return defer({ tribesByIdPromise: tribesByIdPromise(id)});
}

export function TribesById() {
    const tribeData = useLoaderData() as { tribesByIdPromise: any };
  
    console.log("Employees Data", tribeData);
    return (
    <div className="employeesContainer">
      <Suspense fallback={<p>Still loading...</p>}>
        <Await
          resolve={tribeData.tribesByIdPromise}
          errorElement={<p>Something bad happened while fetching data</p>}
        >
          {(tribe: any) => (
            <>
            <div key={tribe.id}>
                <img src={cat} className="employeeImage"></img>
                <p>Id: {tribe.id}</p>
                <p>Name: {tribe.name}</p>
                <p>Department: {tribe.department}</p>
            </div>
            </>
          )}
        </Await>
      </Suspense>
      </div>
    );
  }