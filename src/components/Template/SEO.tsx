import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Icon from '../../static/images/logo.svg';
interface Props {
  title: string;
  children: JSX.Element;
}
const SEO = ({ title, children }: Props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title} | GitScout</title>
        <link rel='canonical' href='#' />
        <link rel='icon' type='image/x-icon' href={Icon} />
      </Helmet>
      {children}
    </HelmetProvider>
  );
};

export default SEO;
