import { Heading } from "@radix-ui/themes"
import { Link } from "react-router-dom"

const PageNotFound = () => {
  console.log('not found')
  return  (
    <>
      <Heading>Nothing is here</Heading>
      <Link to='/'>Go Back</Link>
    </>
  )
}

export default PageNotFound