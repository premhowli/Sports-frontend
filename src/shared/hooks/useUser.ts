import { useCallback, useEffect, useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { fetchUserDetails } from '../../api/userApis';

export function useUser() {
    const [loading, setLoading] = useState<boolean>(true);
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);

    const fetchUserData = useCallback(() => {
        console.log('Fetching user data...');
        setLoading(true);
        fetchUserDetails().then(({ data }) => {
            data && setUser(data);
        }).finally(() => {
            setLoading(false);
        });
    }, [setUser]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData, setUser]);

    return { user, fetchUserData, loading };
}
