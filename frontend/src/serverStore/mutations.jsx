import axios from "axios"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserConfig, handleLogin } from "../components/userAuth/userHooks";

const baseUrl = '/api/'
const kidUrl = baseUrl.concat('kid/')

const userUrl = baseUrl.concat('user/')
const loginUrl = baseUrl.concat('login/')

// POST ---

// not currently using this
export const useCreateAccount =  () => {
  // useCreateAccount is a model for making a useMutation available.  
  return useMutation({
    mutationFn: user => axios.post(userUrl, user)
  })
}

// not currently using this
export const useLoginAccount = () => {
  return useMutation({
    mutationFn: credentials => axios.post(loginUrl, credentials),
    onSuccess: async(data) => handleLogin(data.data),
    onError: (data) => {
      console.log(data)
    }
  })
}

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateKid = () => {
// useCreateKid is a model for making a useMutation available.
  const queryClient = useQueryClient()

  // creating a kid should add the kid to the list of kids in data.
  

  return useMutation({
    mutationFn: kid => {
      const config = getUserConfig()
      console.log({config}, {kid})
      return axios.post(kidUrl, kid, config)
    }, 
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries({queryKey: ['kids']})
    }
  })
}

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateExposure = (kidId) => {
  const config = getUserConfig()
  const url = kidUrl.concat(kidId, '/exposure/')
  const queryClient = useQueryClient()


  return useMutation({
    mutationFn: exposure => axios.patch(url, exposure, config), 
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries(['kids'])
    }
  })
}

// PUT ---

export const useUpdateKid = (kidId) => {
  const config = getUserConfig()
  const queryClient = useQueryClient()
  console.log(kidId)

  return useMutation({
    mutationFn: kid => axios.patch(kidUrl.concat(kidId), kid, config),
    onSuccess: async (data) => {
      console.log('success')
      console.log(data.data)
      await queryClient.invalidateQueries(['kids'])
    }
  })
}

/**
 * 
 * @returns mutation object with method mutate
 */
export const useUpdateExposure = (kidId, exposureId) => {
  
  const config = getUserConfig()
  const url = kidUrl.concat(kidId, '/exposure/', exposureId, '/')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: exposure => axios.patch(url, exposure, config),
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries(['kids'])
    }
  })
}

// DELETE

/**
 * 
 * @returns mutation object with method mutate
 */
export const useDeleteKid = () => {
  const config = getUserConfig()
  const queryClient = useQueryClient()
  
  return useMutation ({
    mutationFn: kid => axios.delete(kidUrl.concat(kid.id), config),
    onSuccess: async (data, variables, context) => {
      console.log('success')
      await queryClient.invalidateQueries(['kids'])
    }
  })
}

