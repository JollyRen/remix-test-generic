const NoActivities = ({ message, error }) => (
  <p>
    <span style={{ fontWeight: 'bold' }}>
      {message ? message : 'No Activities! Try again later'}
    </span>
    <span style={{ display: 'block' }}>{error ? error : '(not sure why)'}</span>
  </p>
)

export default NoActivities
