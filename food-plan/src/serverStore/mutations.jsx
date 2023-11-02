import axios from "axios"
import { useMutation, useQueryClient } from 'react-query';


const baseUrl = 'http://localhost:2002/api/'
const childUrl = baseUrl.concat('child/')


// POST ---

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateChild = () => {
// useCreateChild is a model for making a useMutation available.
  const queryClient = useQueryClient()

  // creating a child should add the child to the list of children in data.

  return useMutation(child => {
    return axios.post(childUrl, child)
  }, {
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries('children')
    }
  })
}

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateIntro = (childId) => {
  
  const url = childUrl.concat(childId, '/intro/')
  const queryClient = useQueryClient()


  return useMutation(intro => {
    console.log(url)
    console.log(intro)
    return axios.post(url, intro)
  }, {
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries('intro')
    }
  })
}

// PUT ---

export const useUpdateChild = (childId) => {

  const queryClient = useQueryClient()

  return useMutation(child => {
    const childToSend = JSON.stringify(child)
    return axios.put(childUrl.concat(childId), child)
  }, {
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries('children')
    }
  })
}


// DELETE

/**
 * 
 * @returns mutation object with method mutate
 */
export const useDeleteChild = (child) => {

  const queryClient = useQueryClient()
  
  return useMutation (child => {
    console.log('in delete mutation')
    return axios.delete(childUrl.concat(child._id))
  }, {
    onSuccess: async (data, variables, context) => {
      console.log('success')
      await queryClient.invalidateQueries('children')
    }
  })
}

