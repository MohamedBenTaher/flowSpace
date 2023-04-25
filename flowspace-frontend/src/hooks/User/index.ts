import { getAuthenticatedUser } from '@/services/user/api';
import {useQuery} from '@tanstack/react-query'

export const useUsers = (token:string) => {
    return useQuery(['user', token], () => getAuthenticatedUser(token));
  };