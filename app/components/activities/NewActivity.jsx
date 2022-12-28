import { Form } from '@remix-run/react'
// import { json } from '@remix-run/node'
// import { createActivity } from '~/utils'

// export const action = async ({ request: req, params }) => {
//   // convert request form data
//   const formData = await req.formData()
//   const {
//     _action,
//     values: { ...values }
//   } = Object.fromEntries(formData)

//   // branching actions
//   if (_action == 'createActivity') {
//     const body = {
//       name: values.name,
//       description: values.description
//     }
//     const createdActivity = await createActivity(body)
//     return json(createdActivity)
//   }
//   return
// }

const NewActivity = () => {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '250px',
    minWidth: '200px'
  }

  const nameLabelStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: '50px',
    marginTop: '16px'
  }

  const descLabelStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: '50px',
    marginTop: '16px'
  }

  // name="name"
  // value= <whatever is in the text box>

  // name: value

  return (
    <Form method="post" style={formStyle}>
      <label htmlFor="name" style={nameLabelStyle}>
        <span style={{ display: 'block' }}>Activity Name</span>
        <input title="name" name="name" placeholder="Enter Activity Name" type="text" required />
      </label>
      <label htmlFor="description" style={descLabelStyle}>
        <span style={{ display: 'block' }}>Activity Description</span>
        <textarea
          title="description"
          name="description"
          placeholder="Enter Activity Description"
          style={{ minHeight: '100px', minWidth: '250px' }}
          required
        />
      </label>
      <button
        type="submit"
        name="_action"
        value="createActivity"
        style={{ width: '250px', marginTop: '16px' }}>
        Create New Activity
      </button>
    </Form>
  )
}
export default NewActivity
