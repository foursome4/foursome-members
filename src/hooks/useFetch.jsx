import useSWR from 'swr'
import api from '../services/api';

export function useFetch(url) {
    const { data, error} = useSWR(url, async url => {
        const res = await api.get(url);
        const data = await res.data;

        return data;
    },{
        revalidateOnMount: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 100
    })

    return {data, error}
}