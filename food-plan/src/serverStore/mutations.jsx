import axios from "axios"
import { useMutation, useQueryClient } from 'react-query';


const baseUrl = 'http://localhost:2002/api/'
const childUrl = baseUrl.concat('child/')


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
    return axios.post(childUrl, child,
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

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateIntro = (childId) => {
  // useCreateChild is a model for making a useMutation available.
  
    const queryClient = useQueryClient()
    const url = childUrl.concat(childId, '/intro/')
  
    // creating a child should add the child to the list of children in data.
  
    return useMutation(intro => {
      console.log(url)
      console.log(intro)
      return axios.post(url, intro,
        {
          onSuccess: (data) => {
            // currently has no visible effect
            console.log('success')
          }
        }
      )
    })
  }

// PUT ---

export const useUpdateChild = () => {
  const queryClient = useQueryClient()

  return useMutation(child => {
    return axios.put(childUrl.concat(child._id), child)
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
      return axios.delete(childUrl.concat(child._id), child,
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