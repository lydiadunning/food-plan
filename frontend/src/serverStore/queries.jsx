import axios from "axios"
import { useQuery } from 'react-query';

const baseUrl = 'http://localhost:2002/api/'


// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useKids = (user) => {
  let config = {
    headers: { Authorization: user.token }
  }
  console.log('returning useQuery')
  return useQuery('kids', () => {
    console.log('kid query')
    if (!user) return []
    console.log('axios query')
    return axios.get(baseUrl.concat('kid/'), config)
  })
}

/**
 * @returns { isLoading, error, data }
 */
export const useOutcomeTips = () => {
  return useQuery('outcomeTips', () => 
    axios.get(baseUrl.concat('outcometips/'))
  )
}


export const useExposure = (user, kidId, exposureId) => {
  let config = {
    headers: { Authorization: user.token }
  }
  const exposureUrl = baseUrl.concat('kid', kidId, 'exposure/', exposureId)
  console.log('exposureUrl', exposureUrl)
  return useQuery(['exposure', exposureId], () => 
    axios.get(exposureUrl)
  )
}

