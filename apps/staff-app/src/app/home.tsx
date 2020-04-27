import React from 'react';
import {Store} from './store';
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react';
import {Link, useHistory} from 'react-router-dom';
import {auth} from 'firebase';
import logo from '../assets/logo.png';

export default function Home() {
  const store = Store.useStore();
  const user = store.get('currentUser');
  const history = useHistory();
  console.log('history', JSON.stringify(history, null, 2));

  const onLogOut = async () => {
    await auth().signOut();
    store.set('currentUser')(null);
    history.push({pathname: '/login'});
    console.log('history', JSON.stringify(history, null, 2));
  };

  return (
    <Menu fixed='top' compact>
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size='mini' src={logo} style={{marginRight: '.3em'}} />
          Somerville Bike Kitchen
        </Menu.Item>
        <Menu.Item position="right">
          <Dropdown text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as='button' onClick={onLogOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
