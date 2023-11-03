import Intro from './Intro.jsx'

const AllIntros = ({ child, openEditIntros }) => {
  console.log('child.intros', child.intros)

  return (
    <>
      { child.intros.map(intro => 
        <Intro key={ intro } introId={ intro } openEditIntros={openEditIntros}  />
      )}
      hi
    </>
  )
}

export default AllIntros