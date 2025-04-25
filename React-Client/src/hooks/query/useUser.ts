import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/request.ts';
import { userSchema } from '@/types';
import { API_PATHS, queryKeys } from '@/constants';

export const useUser = () => {
    const query = useQuery({
        queryKey: queryKeys.user(),
        queryFn: () =>
            request({
                url: API_PATHS.user,
                method: 'GET',
                schema: userSchema,
                onError: error => {
                    console.error({ error });
                },
            }),
    });

    return {
        ...query,
    };
};
