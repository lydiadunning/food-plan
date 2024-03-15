import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { checkForLogin, getUserConfig } from '../components/userAuth/userHooks'
import sampleKids from '../assets/sample'

const baseUrl = '/api/'

// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useKids = () => {
  let isExample = false
  return useQuery({
    queryKey: ['kids'],
    queryFn: () => {
      const config = getUserConfig()
      if (!config) return []
      isExample = checkForLogin().username === 'Example'
      return axios.get(baseUrl.concat('kid/'), config)
    },
    initialData: isExample ? sampleKids : [],
  })
}

/**
 * @returns { isLoading, error, data }
 */
export const useOutcomeTips = (needOutcomes) => {

  return useQuery({
    queryKey: ['outcomeTips'],
    queryFn: () => axios.get(baseUrl.concat('outcometips/')),
    enabled: needOutcomes // condition required for query call, but returns cached data if any available.
  })
}
