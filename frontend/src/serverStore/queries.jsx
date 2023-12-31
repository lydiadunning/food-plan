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
  console.log('returning useQuery')
  return useQuery('kids', () => {
    console.log('kid query')
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

// export const useExposures = (kidId) => {
//   const config = getUserConfig()
//   const exposureUrl = baseUrl.concat('kid', kidId, 'exposure/')
//   console.log('exposureUrl', exposureUrl)
//   return useQuery('exposure', () => 
//     axios.get(exposureUrl, config)
//   )
// }



// export const useExposure = (kidId, exposureId) => {
//   const config = getUserConfig()
//   const exposureUrl = baseUrl.concat('kid', kidId, 'exposure/', exposureId)
//   console.log('exposureUrl', exposureUrl)
//   return useQuery(['exposure', exposureId], () => 
//     axios.get(exposureUrl, config)
//   )
// }

