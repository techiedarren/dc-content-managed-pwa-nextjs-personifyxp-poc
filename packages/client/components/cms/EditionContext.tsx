import React, { PropsWithChildren } from 'react';

export type EditionContextState = {
    id: string;
    start: string;
    end: string;
};

export const EditionContext = React.createContext<EditionContextState | null>(null);

export function WithEdition(props: PropsWithChildren<EditionContextState>) {
    return <EditionContext.Provider value={props}>
        {props.children}
    </EditionContext.Provider>
}

export function useEditionContext() {
    return React.useContext(EditionContext);
}