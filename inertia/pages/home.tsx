import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Home(props: { user: any }) {
  useEffect(() => {
    const socket = io('http://localhost:3333')
    console.log('hello')
    socket.on('msgFromBE', (data) => {
      console.log('msgFromBE', data)
    })
    return () => {
      socket.close()
    }
  }, [])
  return (
    <>
      <Head title="Homepage" />

      <div>loo {props.user.email}</div>
    </>
  )
}
