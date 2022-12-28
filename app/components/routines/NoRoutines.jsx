const NoRoutines = ({ message, error }) => (
  <p>
    <span style={{ fontWeight: 'bold' }}>{message ? message : 'No Routines! Try again later'}</span>
    <span style={{ display: 'block' }}>{error ? error : '(not sure why)'}</span>
  </p>
)

export default NoRoutines
