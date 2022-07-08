import { Button, Input, Space } from 'antd';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import Editor from 'components/Template/Editor';
import Template from './Template';
const title = 'Cập nhật tiến độ dự án';

const UpdateProjectProgress = () => {
  return (
    <Template title={title}>
      <section className='section update-project-progress-container'>
        <h2>{title}</h2>
        <div className=''>
          <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
            <Columns>
              <Column span={6}>
                <Input placeholder='Chọn dự án' />
              </Column>
            </Columns>
            <Editor />
            <Button type='primary'>Đăng</Button>
          </Space>
        </div>
      </section>
    </Template>
  );
};

export default UpdateProjectProgress;
