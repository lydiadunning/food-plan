import axios from "axios"
import { useQuery } from 'react-query';

const baseUrl = 'http://localhost:2002/api/'


// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useKids = () => {
  console.log('returning useQuery')
  return useQuery('kids', () => {
    console.log('axios query')
    return axios.get(baseUrl.concat('kid/'))
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


export const useExposure = (exposureId) => {
  const exposureUrl = baseUrl.concat('exposure/', exposureId)
  console.log('exposureUrl', exposureUrl)
  return useQuery(['exposure', exposureId], () => 
    axios.get(exposureUrl)
  )
}
