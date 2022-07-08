import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import 'styles/style.less';

import React, { useEffect } from 'react';
import HeaderTop from 'components/Template/HeaderTop';
import MenuLeft from 'components/Template/MenuLeft';
import SEO from 'components/Template/SEO';
import useApi from 'hooks/useApi';
import ApiResponse from 'types/ApiResponse';

type Props = {
  title: string;
  children: JSX.Element[] | JSX.Element;
};

const Template = ({ title, children }: Props) => {
  useEffect(() => {
    useApi.get('/api/v1/bo/user/me', {
      authen: true,
      onSuccess: (data: ApiResponse) => {
        console.log(data);
      },
    });
  }, []);

  return (
    <SEO title={title}>
      <>
        <HeaderTop />
        <div className='main-container'>
          <MenuLeft />
          <Layout className='main-content'>
            <Content
              className='site-layout-background'
              style={{
                padding: 24,
                margin: 0,
              }}
            >
              <div>{children} </div>
            </Content>
          </Layout>
        </div>
      </>
    </SEO>
  );
};

export default Template;
