import axios from "axios"
import { useQuery } from 'react-query';
import { getUserConfig } from "../components/userAuth/userHooks";

const baseUrl = 'http://localhost:2002/api/'


// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useKids = () => {
  const config = getUserConfig()
  console.log('returning useKids useQuery')
  console.log('config. if none, returns []', config)
  return useQuery('kids', () => {
    console.log('executing kid query')
    if (!config) return []
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

export const useExposures = (kidId) => {
  const config = getUserConfig()
  const exposureUrl = baseUrl.concat('kid/', kidId, '/exposure/')
  console.log('exposureUrl', exposureUrl)
  return useQuery('exposure', () => 
    axios.get(exposureUrl, config)
  )
}


