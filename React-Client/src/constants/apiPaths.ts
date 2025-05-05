export const API_PATHS = {
    example: '/example',
    projects: '/projects',
    project: (id: number) => `/project/${id}`,
    user: '/user',
} as const;
