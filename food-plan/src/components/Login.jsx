export function Login({ closeLogin }) {
  return (
    <>
      <form>
        <label>username: </label>
        <input></input>
        <label>password: </label>
        <input></input>
      </form>
      <button onClick={ closeLogin }>Back</button>
    </>
  )
}