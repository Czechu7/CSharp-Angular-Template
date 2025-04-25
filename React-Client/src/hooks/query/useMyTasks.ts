import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/request.ts';
import { z } from 'zod';
import { ProjectSection, Task } from '@/types';
import { API_PATHS, queryKeys } from '@/constants';

const taskDeleteSchema = z.object({}).optional();

export const useMyTasks = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery<Task[], Error>({
        queryKey: [queryKeys.myTasks()],
        queryFn: () =>
            request({
                url: API_PATHS.myTasks,
                method: 'GET',
                schema: z.array(ProjectSection),
            }),

        staleTime: 60000,
    });

    const deleteMutation = useMutation({
        mutationKey: [queryKeys.myTasks()],
        mutationFn: (ids: number[]) =>
            request({
                url: `${API_PATHS.myTasks}/${ids.join(',')}`,
                method: 'DELETE',
                schema: taskDeleteSchema,
                onError: error => {
                    console.log({ error });
                },
            }),
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: [queryKeys.myTasks()],
            });
        },
        onError: error => {
            console.log({ error });
        },
    });

    const findById = (id: number) => {
        return data?.find(task => task.id === id);
    };

    return {
        data,
        isLoading,
        error,
        findById,
        deleteMutation,
    };
};
