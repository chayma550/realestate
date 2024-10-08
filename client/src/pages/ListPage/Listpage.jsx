import React, { Suspense } from 'react'
import "./listpage.scss"
import Filter from '../../components/Filter/Filter'
import Card from '../../components/Card/Card'
import Map from '../../components/Map/Map'
import { Await, useLoaderData } from 'react-router'
const Listpage = () => {
    const data=useLoaderData()

  return (
    <div className='listpage'>
        <div className="listContainer">
            <div className="wrapper"> 
               <Filter/>
             <Suspense
             fallback={<p>Loading...</p>}>
             <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
             </Suspense>
            </div>
        </div>
        <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
        </div>
    </div>
  )
}

export default Listpage
