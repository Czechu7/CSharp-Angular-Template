export const queryKeys = {
    root: () => [''],
    projects: () => [queryKeys.root(), 'project'],
    project: (id: number) => [queryKeys.projects(), id],
    user: () => [queryKeys.root(), 'user'],
} as const;
