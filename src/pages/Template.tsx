import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import 'styles/style.less';

import HeaderTop from 'components/Template/HeaderTop';
import MenuLeft from 'components/Template/MenuLeft';
import SEO from 'components/Template/SEO';

type Props = {
  title: string;
  children: JSX.Element[] | JSX.Element;
};

const Template = ({ title, children }: Props) => {
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
