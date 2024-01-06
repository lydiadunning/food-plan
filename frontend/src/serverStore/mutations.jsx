import axios from "axios"
import { useMutation, useQueryClient } from 'react-query';
import { getUserConfig, handleLogin } from "../components/userAuth/userHooks";

const baseUrl = 'http://localhost:2002/api/'
const kidUrl = baseUrl.concat('kid/')

const userUrl = baseUrl.concat('user/')
const loginUrl = baseUrl.concat('login/')

// POST ---

/**
 * 
 * @returns mutation object with method mutate
 */
export const useCreateAccount = () => {
  // useCreateAccount is a model for making a useMutation available.
  const queryClient = useQueryClient()
  
  return useMutation(user => {
    return axios.post(userUrl, user)
  })
}

// not currently using this
export const useLoginAccount = () => {
  const queryClient = useQueryClient()

  return useMutation(credentials => {
    return axios.post(loginUrl, credentials)
  }, {
    onSuccess: async(data) => {
      console.log('login successful')
      console.log(data)
      handleLogin(data.data)
    },
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
  

  return useMutation(kid => {
    const config = getUserConfig()
    console.log({config}, {kid})
    return axios.post(kidUrl, kid, config)
  }, {
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries('kids')
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


  return useMutation(exposure => {
    console.log({url})
    console.log({exposure})
    console.log({kidId})
    return axios.patch(url, exposure, config)
  }, {
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries('exposure')
      await queryClient.invalidateQueries('kids')

    }
  })
}

// PUT ---

export const useUpdateKid = (kidId) => {
  const config = getUserConfig()
  const queryClient = useQueryClient()
  console.log(kidId)

  return useMutation(kid => {
    console.log(kidUrl.concat(kidId), kid, kidId)
    console.log({kid})
    return axios.patch(kidUrl.concat(kidId), kid, config)
  }, {
    onSuccess: async (data) => {
      console.log('success')
      console.log(data.data)
      await queryClient.invalidateQueries('kids')
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

  return useMutation(exposure => {
    console.log({url})
    console.log({exposure})
    return axios.patch(url, exposure, config)
  }, {
    onSuccess: async (data) => {
      console.log('success')
      await queryClient.invalidateQueries('exposure')
      await queryClient.invalidateQueries('kids')
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
  
  return useMutation (kid => {
    console.log('in delete mutation', kidUrl.concat(kid.id))
    return axios.delete(kidUrl.concat(kid.id), config)
  }, {
    onSuccess: async (data, variables, context) => {
      console.log('success')
      await queryClient.invalidateQueries('kids')
    }
  })
}

