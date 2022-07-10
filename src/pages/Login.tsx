import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Layout, Space } from 'antd';
import { successNotification } from 'components/Template/Notification';
// import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import SEO from 'components/Template/SEO';
import useApi from 'hooks/useApi';
import { useNavigate } from 'react-router-dom';
import Logo from 'static/images/logo-light.svg';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const history = useNavigate();

  const onFinish = (values: any) => {
    login(values);
  };

  function login(request: { [key: string]: any }) {
    useApi.post('/api/v1/bo/auth/login', {
      params: request,
      onSuccess: (data: { [key: string]: any }) => {
        const jwtData = {
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          transactionTime: data.transactionTime,
        };
        useApi.setJwtData(jwtData);
        successNotification('Đăng nhập thành công');
        history('/dashboard');
      },
    });
  }

  return (
    <SEO title='Login page'>
      <Layout className='container'>
        <section className='login-container'>
          <div className='top'>
            <Space
              direction='vertical'
              size='middle'
              style={{ display: 'flex' }}
            >
              <img className='logo' src={Logo} alt='logo' />
              {/* <Title level={2}>FireAnt Login</Title> */}
            </Space>
          </div>
          <div className='content'>
            <Form form={form} onFinish={onFinish}>
              <Form.Item name='email' rules={[{ required: true }]}>
                <Input
                  size='large'
                  placeholder='Username'
                  autoComplete='true'
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item name='password' rules={[{ required: true }]}>
                <Input.Password
                  size='large'
                  autoComplete='true'
                  placeholder='Password'
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              {/* <Row justify='space-between'>
                <Col>
                  <Checkbox onChange={onChange}>Remember me</Checkbox>
                </Col>
                <Col>
                  <Link to='/forgotpassword'>Forgot password</Link>
                </Col>
              </Row> */}
              <Button type='primary' size='large' htmlType='submit' block>
                Login
              </Button>
              {/* <Space align='center' className='social-container'>
                Login with:
                <Button shape='circle' icon={<FacebookOutlined />} />
                <Button shape='circle' icon={<GoogleOutlined />} />
              </Space> */}
              {/* </Space> */}
            </Form>
          </div>
        </section>
      </Layout>
    </SEO>
  );
};

export default Login;
