import { ClockCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItemInfo {
  path: string;
  icon: JSX.Element;
  label: string;
}
const defaultItem = '/timetracking';
const menuItems: MenuItemInfo[] = [
  {
    path: `/timetracking`,
    icon: <ClockCircleOutlined />,
    label: `Time Tracking`,
  },
  {
    path: `/logtime`,
    icon: <ClockCircleOutlined />,
    label: `Log Time`,
  },
  // {
  //   path: `/project`,
  //   icon: <ProjectOutlined />,
  //   label: `Dự án`,
  // },
  // {
  //   path: `/account`,
  //   icon: <UserOutlined />,
  //   label: `Tài khoản`,
  // },
  // {
  //   path: `/user`,
  //   icon: <TeamOutlined />,
  //   label: `Người dùng hệ thống`,
  // },
  // {
  //   path: `/config`,
  //   icon: <SettingOutlined />,
  //   label: `Cấu hình`,
  // },
];

const MenuLeft = () => {
  const [path, setPath] = useState('/');

  useEffect(() => {
    setPath(
      window.location.pathname === '/' ? defaultItem : window.location.pathname
    );
  }, []);

  return (
    <>
      <div className='overlay menu-overlay' />
      <Sider width={250} className='site-layout-background sider-menu-left'>
        <Menu
          mode='inline'
          selectedKeys={[path]}
          // defaultOpenKeys={['sub1']}
          className='menu-left'
          // items={menuItems}
        >
          {menuItems.map((item: MenuItemInfo) => (
            <Menu.Item key={item.path}>
              {item.icon}
              <span>{item.label}</span>
              <NavLink to={item.path} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
};

export default MenuLeft;
