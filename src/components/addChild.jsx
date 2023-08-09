// a component for adding a child, during app setup

const addChild = ({ form, setForm }) => {
  return(
    <form className="new-child">
      

    </form>
  )
}

import Entry from './Entry.jsx'

const Inputs = ({ form, setForm, errors, setErrors }) => {

  return(
		<form className="input">
      <label className="name" > Child
      <input type='text' placeholder="name"
        value={ form.name} onChange={ e =>  
        { setForm({ ...form, name: e.target.value })

        }} />
      </label>
      <label className="name" > Child
      <input type='text' placeholder="name"
        value={ form.name} onChange={ e =>  
        { setForm({ ...form, name: e.target.value })
        }} />
      </label>

	</form>
	)
}

export default Inputs;