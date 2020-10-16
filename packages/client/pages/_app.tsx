import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/core';
import createTheme from '../components/createTheme';
import GlobalStyle from '../components/GlobalStyle';
import { WithUserProfile, UserProfileState } from '../components/UserProfile';
import { fetchUserProfile } from '../utils/fetchUserProfile';
import App from 'next/app';
import { trackPageView, configureAnalytics } from '../utils/analytics';

export default class CustomApp extends NextApp<{userProfile: UserProfileState}> {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        configureAnalytics();
    }

    render() {
        const { Component, pageProps } = this.props;
        const theme = createTheme();

        return (
            <React.Fragment>
                <WithUserProfile value={this.props.userProfile}>
                    <Head>
                        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                    </Head>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalStyle />
                        <Component {...pageProps} />
                    </ThemeProvider>
                    </WithUserProfile>
            </React.Fragment>
        );
    }
}

CustomApp.getInitialProps = async (appContext) => {
    const [appProps, userProfile] = await Promise.all([
        App.getInitialProps(appContext),
        fetchUserProfile(appContext.ctx)
    ]);
    return {
        ...appProps,
        userProfile
    };
};