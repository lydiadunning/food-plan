import Intro from './Intro.jsx'

const AllIntros = ({ child }) => {
  console.log('child.intros', child.intros)

  return (
    <>
      { child.intros.map(intro => 
        <Intro key={ intro } introId={ intro } />
      )}
      hi
    </>
  )
}

export default AllIntros