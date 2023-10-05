import { NavBar } from '@/app/components'
import { Form, Header } from './components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Table | Reservations',
  description: 'Welcome to open table',
}

const ReservationPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
      <NavBar/>
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            <Header/>
            <Form/>
          </div>
        </div>
      </main>
    </main>
  )
}

export default ReservationPage