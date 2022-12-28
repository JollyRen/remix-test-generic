const SelectedActivity = ({ activity }) => {
  const { id, name, description } = activity
  return (
    <section style={{ padding: '20px', backgroundColor: 'rgb(0,0,0,0.1)' }}>
      <h3>Name: {name}</h3>
      <p>Description: {description}</p>
    </section>
  )
}
export default SelectedActivity
