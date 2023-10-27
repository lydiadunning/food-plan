import axios from "axios"
import { useQuery } from 'react-query';

const baseUrl = 'http://localhost:2002/api/'


// Queries ---------------------------------------------------

/**
 * 
 * @returns { isLoading, error, data }
 */
export const useChildren = () => {
  console.log('url', baseUrl,'child/')
  return useQuery('children', () => 
    axios.get(baseUrl.concat('child/'))
  )
}




