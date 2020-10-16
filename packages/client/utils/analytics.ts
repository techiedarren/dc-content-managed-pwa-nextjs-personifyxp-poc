import ReactGA, {EventArgs} from 'react-ga';
import { useContentItemContext } from '../components/cms/ContentItemContext';
import { useEditionContext } from '../components/cms/EditionContext';

export const GA_TRACKING_ID = 'UA-180677588-1';

export function configureAnalytics() {
    let global = (window as any);
    if (global && !global.GA_INITIALIZED) {
        ReactGA.initialize(GA_TRACKING_ID);
        global.GA_INITIALIZED = true;
    }
}

export function trackPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

function trackEvent(args: EventArgs) {
    console.log(args);
    ReactGA.event(args);
}

export function useContentAnalytics() {
    const contentItemContext = useContentItemContext();
    const editionContext = useEditionContext();

    return {
        trackEvent: (args: EventArgs) => {
            trackEvent({
                ...args,
                dimension1: contentItemContext ? contentItemContext.deliveryId : undefined,
                dimension2: editionContext ? editionContext.id : undefined
            });
        }
    };
}