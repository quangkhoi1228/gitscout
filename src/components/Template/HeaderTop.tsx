import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { setShowMenu } from '../../utils/utils';
import Logo from '../../static/images/logo.svg';
const HeaderTop = () => {
  const [collapsed, setCollapsed] = useState(false);

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
        {/* <Menu.Item key={3} onClick={onLogout}>
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </Menu.Item> */}
      </Menu>
    </Header>
  );
};

export default HeaderTop;
