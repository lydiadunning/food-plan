import axios from "axios"
import { useQuery } from '@tanstack/react-query';
import { getUserConfig } from "../components/userAuth/userHooks";

const baseUrl = 'http://localhost:2002/api/'


// Queries ---------------------------------------------------

/**
 * @returns { isLoading, error, data }
 */
export const useKids = () => {
  const config = getUserConfig()
  return useQuery({
    queryKey: ['kids'], 
    queryFn: () => {
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

