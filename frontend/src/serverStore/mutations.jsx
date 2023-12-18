import axios from "axios"
import { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';

let config = {
  headers: { Authorization: '' }
}

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

export const useLoginAccount = () => {
  const queryClient = useQueryClient()

  return useMutation(credentials => {
    return axios.post(loginUrl, credentials)
  }, {
    onSuccess: async(data) => {
      console.log('login successful')
      config.headers.Authorization = data.token
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
  
  const url = kidUrl.concat(kidId, '/exposure/')
  const queryClient = useQueryClient()


  return useMutation(exposure => {
    console.log(url)
    console.log(exposure)
    return axios.post(url, exposure, config)
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

  const queryClient = useQueryClient()

  return useMutation(kid => {
    const kidToSend = JSON.stringify(kid)
    return axios.put(kidUrl.concat(kidId), kidToSend, config)
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
export const useUpdateExposure = (exposureId) => {
  
  const url = baseUrl.concat('exposure/', exposureId)
  const queryClient = useQueryClient()


  return useMutation(exposure => {
    console.log(url)
    console.log(exposure)
    return axios.put(url, exposure, config)
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

  const queryClient = useQueryClient()
  
  return useMutation (kid => {
    console.log('in delete mutation')
    return axios.delete(kidUrl.concat(kid._id), config)
  }, {
    onSuccess: async (data, variables, context) => {
      console.log('success')
      await queryClient.invalidateQueries('kids')
    }
  })
}

