import React, { PropsWithChildren } from 'react';

export type ContentItemContextState = {
    name: string;
    schema: string;
    deliveryId: string;
    deliveryKey?: string;
};

export const ContentItemContext = React.createContext<ContentItemContextState | null>(null);

export function WithContentItem(props: PropsWithChildren<ContentItemContextState>) {
    return <ContentItemContext.Provider value={props}>
        {props.children}
    </ContentItemContext.Provider>
}

export function useContentItemContext() {
    return React.useContext(ContentItemContext);
}