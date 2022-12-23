export const fetchWithAbort = (url, timeout) => {
  const ctrl = new AbortController()
  return Promise.race([
    fetch(url, {
      signal: ctrl.signal
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          error: 'serverError',
          message: 'No data found in time, try again later',
          name: 'serverError'
        })
        ctrl.abort()
      }, timeout)
    })
  ])
}
