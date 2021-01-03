import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux' 
import firebase from 'firebase'
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent ] = useState("home");
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type: 'LOGGED_OUT',
      payload: null
    })
    history.push('/login')
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      <Item key="login" icon={<UserOutlined />} className='float-right'>
        <Link to='/login'>Login</Link>
      </Item>

      <Item key="register" icon={<UserAddOutlined/>}  className='float-right'>
        <Link to='/register'>Register</Link>
      </Item>
      <SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title="Username"
      >
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LoginOutlined />} onClick={logout}>Logout</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
