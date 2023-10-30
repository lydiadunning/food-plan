/* eslint-disable react/prop-types */
import Intro from "./Intro.jsx"

const Child = ({ child, openAddIntro, closeChild }) => {
  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }


  return (
    <>
      <p>{ child.name }</p>
      <p>{ listEach(child.tries, 'try') }</p>
      { child.intros.length >= 1 && <Intro introId={ child.intros[0] } /> }
      <button onClick={ () => openAddIntro(child) }>add an introduction</button>
      {/* <button onClick={ deleteChild }>delete</button> */}
      <button onClick={ closeChild }>back to list</button>
    </>
  )
}

export default Child