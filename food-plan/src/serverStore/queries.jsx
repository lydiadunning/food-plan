import axios from "axios"
import { useQuery } from 'react-query';

const baseUrl = 'http://localhost:2002/api/'


// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useChildren = () => {
  console.log('returning useQuery')
  return useQuery('children', () => {
    console.log('axios query')
    return axios.get(baseUrl.concat('child/'))
  })
}

/**
 * @returns { isLoading, error, data }
 */
export const useTryHints = () => {
  return useQuery('tryHints', () => 
    axios.get(baseUrl.concat('try-hint/'))
  )
}


export const useIntro = (introId) => {
  const introUrl = baseUrl.concat('intro/', introId)
  console.log('introUrl', introUrl)
  return useQuery(['intro', introId], () => 
    axios.get(introUrl)
  )
}
