import { postQuery } from "./backendQuery"

const createChild = (child) => {
  return postQuery('child/', child)
}

export {createChild}