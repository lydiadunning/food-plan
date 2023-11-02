import axios from "axios"
import { useMutation } from 'react-query';


const baseUrl = 'http://localhost:2002/api/'
const childUrl = baseUrl.concat('child/')


// POST ---

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateChild = (child) => {
// useCreateChild is a model for making a useMutation available.

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
  
    const url = childUrl.concat(childId, '/intro/')
  
  
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

export const useUpdateChild = (childId) => {

  return useMutation(child => {
    const childToSend = JSON.stringify(child)
    return axios.put(childUrl.concat(childId), child, {
      onSuccess: (data) => {
        // currently has no visible effect
        console.log('success')
      }
    })
  })
}


// DELETE

/**
 * 
 * @returns mutation object with method mutate
 */
export const useDeleteChild = (child) => {
  
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