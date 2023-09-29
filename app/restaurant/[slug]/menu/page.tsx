import { NavBar } from '@/app/components'
import React from 'react'
import { Header, Menu, RestaurantNavBar } from '../components'

const RestaurantMenuPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar/>
        <Header/>
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar/>
            <Menu/>
          </div>
        </div>
      </main>
    </main>

  )
}

export default RestaurantMenuPage