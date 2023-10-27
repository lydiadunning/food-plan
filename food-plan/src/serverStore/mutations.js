import axios from "axios"
import { useMutation } from 'react-query';

const baseUrl = 'localhost:2002/api/'

// POST ---

/**
 * 
 * @returns object mutation with method mutate
 */
export const CreateChild = () => {
  return useMutation(child => {
    axios.post(baseUrl.concat('child/'), child)
  })
  
}

// PUT ---

export const UpdateChild = () => {
  return useMutation(child => {
    axios.put(baseUrl.concat(`child/${child._id}`))
  })
}



