import { useOutletContext, Form } from '@remix-run/react'
import { redirect, json } from '@remix-run/node'

// loader and action
// export const loader = ({ request }) => {
//   console.log(123)
//   return json({})
// }

// export const action = async ({ request }) => {
//   return redirect(`/`)
// }

// component
export default function Index() {
  const {
    userState: [user, setUser]
  } = useOutletContext()

  return (
    <>
      <h1>Hello</h1>
      <h2>Hello</h2>
      <h3>Hello</h3>
      <p>Hello</p>
      <span>Hello </span>
      <em>Hello </em>
      <strong>Hello </strong>
      <Form method="post">
        <button type="submit">test</button>
      </Form>
    </>
  )
}
