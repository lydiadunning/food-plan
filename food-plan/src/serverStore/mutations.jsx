import axios from "axios"
import { useMutation, useQueryClient } from 'react-query';


const baseUrl = 'http://localhost:2002/api/'


// POST ---

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateChild = (child) => {
// useCreateChild is a model for making a useMutation available.

  const queryClient = useQueryClient()

  // creating a child should add the child to the list of children in data.

  return useMutation(child => {
    return axios.post(baseUrl.concat('child/'), child,
      {
        onSuccess: (data) => {
          // currently has no visible effect
          console.log('success')
          queryClient.invalidateQueries('children')
        }
      }
    )
  })
}

// PUT ---

export const useUpdateChild = () => {
  const queryClient = useQueryClient()

  return useMutation(child => {
    return axios.put(baseUrl.concat(`child/${child._id}`), child)
  })
}


// DELETE

/**
 * 
 * @returns mutation object with method mutate
 */
export const useDeleteChild = (child) => {
    const queryClient = useQueryClient()
  
    // creating a child should add the child to the list of children in data.
  
    return useMutation(child => {
      console.log('in delete mutation')
      return axios.delete(baseUrl.concat('child/', child._id), child,
        {
          onSuccess: (data) => {
            // currently has no visible effect
            console.log('success')
            queryClient.invalidateQueries('children')
          }
        }
      )
    })
  }