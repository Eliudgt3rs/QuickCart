'use client'

import { useUser } from '@clerk/nextjs';
import Loading from './Loading';

const ClerkLoading = ({ children }) => {
    const { isLoaded } = useUser();

    if (!isLoaded) {
        return <Loading />;
    }

    return children;
}

export default ClerkLoading;
