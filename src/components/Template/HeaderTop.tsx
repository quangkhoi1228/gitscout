import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../static/images/logo.svg';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { setShowMenu } from '../../utils/utils';
import useApi from 'hooks/useApi';
import ApiResponse from 'types/ApiResponse';
import { successNotification } from './Notification';
const HeaderTop = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();

  const onLogout = () => {
    useApi.get('/api/v1/bo/auth/logout', {
      authen: true,
      onSuccess: (data: ApiResponse) => {
        if (data.message === 'success') {
          successNotification('Đăng xuất thành công');
          useApi.removeJwtData();
          history('/login');
        }
      },
    });
  };
  return (
    <Header
      className='header'
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      {!collapsed ? (
        <MenuUnfoldOutlined
          className='trigger'
          onClick={() => {
            setShowMenu(true);
            setCollapsed(!collapsed);
          }}
        />
      ) : (
        <MenuFoldOutlined
          className='trigger'
          onClick={() => {
            setShowMenu(false);
            setCollapsed(!collapsed);
          }}
        />
      )}
      <NavLink to='/' className='logo'>
        <img src={Logo} alt='logo' />
      </NavLink>
      <Menu style={{ justifyContent: 'end' }} theme='dark' mode='horizontal'>
        <Menu.Item key={1}>
          <UserOutlined />
          <span>Thông tin</span>
          <NavLink to='/profile' />
        </Menu.Item>
        <Menu.Item key={2}>
          <SettingOutlined />
          <span>Cài đặt</span>
          <NavLink to='/setting' />
        </Menu.Item>
        <Menu.Item key={3} onClick={onLogout}>
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderTop;
