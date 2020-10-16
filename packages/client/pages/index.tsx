import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { fetchContent } from '../utils/fetchContent';
import ContentBlock from '../components/ContentBlock';
import Layout from '../components/Layout';

interface Props {
  navigation: {
    navigation: {
      links: { title: string, href: string }[]
    }
  },
  slot: {
    component: string;
    components: any[]
  }
}

const Index: NextPage<Props> = (props: Props) => {
  let {
    navigation,
    slot
  } = props;

  return <Layout navigation={navigation}>
    <ContentBlock data={slot} />
  </Layout>;
}

Index.getInitialProps = async (context) => {
  const navigation = fetchContent('slots/navigation', context);
  const slot = fetchContent('slots/homepage-hero', context);

  return {
    navigation: await navigation,
    slot: await slot,
  };
};

export default Index;