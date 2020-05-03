import React from 'react';
import {Store} from './store';
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Responsive,
  Icon,
  Button,
} from 'semantic-ui-react';
import {Link, useHistory} from 'react-router-dom';
import {auth} from 'firebase';
import logo from '../assets/logo.png';

export default function Home() {
  const store = Store.useStore();
  const user = store.get('currentUser');
  const history = useHistory();

  const coopName = 'Somerville Bike Kitchen';

  const onLogOut = async () => {
    await auth().signOut();
    store.set('currentUser')(null);
    history.push('/login');
  };

  const userDropDownMenu = (
    <Dropdown.Menu>
      <Dropdown.Item as='button' onClick={onLogOut}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  );

  const userIcon = user?.photoURL ?
    <Image src={user?.photoURL} avatar circular size='mini' /> :
    <Icon as={Button} size='large' name='bicycle' />;

  return (
    <Menu fixed='top' compact>
      <Container>

        <Menu.Item as={Link} to="/" header position='left'>
          <Image size='mini' src={logo} style={{marginRight: '.3em'}} />
          {coopName}
        </Menu.Item>

        <Menu.Item position="right">
          <Dropdown as={Responsive} minWidth='700' text={user?.displayName} direction='left'>
            {userDropDownMenu}
          </Dropdown>
          <Dropdown as={Responsive} maxWidth='700' compact direction='left' icon={userIcon}>
            {userDropDownMenu}
          </Dropdown>
        </Menu.Item>

      </Container>
    </Menu>
  );
};
