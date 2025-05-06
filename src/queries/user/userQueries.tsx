const USER_QUERY_KEY = 'users';


export const userQueryKeys = {
    all: [USER_QUERY_KEY] as const,
    lists: (filters: Record<string, any> = {}) =>
        [...userQueryKeys.all, 'list', filters] as const,
    detail: (id: string) => [...userQueryKeys.all, 'detail', id] as const,
};