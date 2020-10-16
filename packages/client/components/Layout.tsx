import React, { PropsWithChildren, useEffect} from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import Head from 'next/head';
import PromoBanner from './PromoBanner';
import UserActions from './UserActions';
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { trackPageView } from '../utils/analytics';

const styles = theme => ({
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
    className?: string;
    style?: React.CSSProperties;
    navigation: {
        navigation: {
            links: { title: string, href: string }[]
        }
    };
}

const Layout: React.SFC<Props> = (props) => {
    const {
        classes,
        navigation,
        children,
        ...other
    } = props;

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    /** Data fixes if not loaded **/
    let defaultNavContent = navigation?.navigation?.links || [{ title: 'Error: No Navigation Slot with content for delivery key "slots/navigation"', href: '/' }]
    const navigationLinks = defaultNavContent;

    useEffect(() => {
        trackPageView();
        return () => {};
    })

    return (
        <>
            <Head>
                <title>ANYA FINN</title>
            </Head>

            <div>
                <PromoBanner>ORDER BEFORE 1PM FOR NEXT DAY DELIVERY</PromoBanner>

                <Header actions={<UserActions />}
                    search={<SearchBox />}
                    navigation={(
                        <Navigation links={navigationLinks}>
                        </Navigation>
                    )}
                    onToggleSidebar={handleToggleSidebar}>
                </Header>

                {children}

                <Footer />
            </div>

            <Sidebar links={navigationLinks} open={sidebarOpen} onToggleOpen={handleToggleSidebar} />
        </>
    );
};

export default withStyles(styles)(Layout);