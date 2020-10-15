import React, { PropsWithChildren } from 'react';

export type UserProfileState = {
    targetingBehaviors?: string[];
    targetingTags?: string[];
};

export const UserProfileContext = React.createContext<UserProfileState | null>(null);

export function WithUserProfile(props: PropsWithChildren<{value: UserProfileState}>) {
    return <UserProfileContext.Provider value={props.value}>
        {props.children}
    </UserProfileContext.Provider>;
}

export function useUserProfile() {
    return React.useContext(UserProfileContext);
}