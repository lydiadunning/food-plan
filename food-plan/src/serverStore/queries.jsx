import axios from "axios"
import { useQuery } from 'react-query';

const baseUrl = 'http://localhost:2002/api/'


// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useChildren = () => {
  return useQuery('children', () => 
    axios.get(baseUrl.concat('child/'))
  )
}

/**
 * @returns { isLoading, error, data }
 */
export const useTryHints = () => {
  return useQuery('tryHints', () => 
    axios.get(baseUrl.concat('try-hint/'))
  )
}
