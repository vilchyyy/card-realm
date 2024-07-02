import { Head } from '@inertiajs/react'
import DecksView from '~/components/decks_view'

export default function Home(props: { user: any }) {
  return (
    <>
      <Head title="Homepage" />

      <div>loo {props.user.email}</div>
      <div>
        <DecksView />
      </div>
    </>
  )
}
