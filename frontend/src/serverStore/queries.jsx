import axios from "axios"
import { useQuery } from '@tanstack/react-query';
import { getUserConfig } from "../components/userAuth/userHooks";

const baseUrl = '/api/'


// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useKids = () => {
  return useQuery({
    queryKey: ['kids'], 
    queryFn: () => {
      const config = getUserConfig()
      if (!config) return []
      return axios.get(baseUrl.concat('kid/'), config)
    }
  })
}

/**
 * @returns { isLoading, error, data }
 */
export const useOutcomeTips = () => {
  return useQuery({
    queryKey: ['outcomeTips'], 
    queryFn: () => axios.get(baseUrl.concat('outcometips/'))
  })
}

