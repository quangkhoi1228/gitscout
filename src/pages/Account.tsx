import { Input, Space } from 'antd';
import AccountTable from 'components/Account/AccountTable';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import Template from './Template';
const title = 'Tài khoản';

const Account = () => {
  return (
    <Template title={title}>
      <section className='section account-container'>
        <h2>{title}</h2>
        <div className=''>
          <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
            <Columns>
              <Column span={6}>
                <Input placeholder='Tìm kiếm' />
              </Column>
            </Columns>
            <AccountTable />
          </Space>
        </div>
      </section>
    </Template>
  );
};

export default Account;
