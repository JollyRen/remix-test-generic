import { useOutletContext, Form } from '@remix-run/react'
// import { redirect, json } from '@remix-run/node'

export const loader = ({ request }) => {
  console.log(123)
  return {}
}

// export const action = async ({ request }) => {
//   const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       username: 'jeremytest1234',
//       password: 'jeremytest1234'
//     })
//   })
//   const data = await response.json()
//   console.log(data)
//   return redirect(`/`)
// }

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
      {/* <Form method="post">
        <button type="submit">test</button>
      </Form> */}
    </>
  )
}
