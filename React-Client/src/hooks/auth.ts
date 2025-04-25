import { useAuth } from 'react-oidc-context';

export const useUserSession = () => {
    const auth = useAuth();
    if (!auth.isAuthenticated) {
        auth.signinRedirect();
    }

    if (!auth.user?.profile.sub || !auth.user.profile.nickname) throw new Error('User not authenticated');

    return {
        id: auth.user?.profile.sub,
        name: auth.user?.profile.nickname,
    };
};
