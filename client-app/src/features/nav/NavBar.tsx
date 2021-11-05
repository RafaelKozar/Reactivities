import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu, MenuItem } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';

export default observer(function () {
    const { userStore: { user, logout } } = useStore();
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" as={NavLink} to='/activities' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />

                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
                <MenuItem position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My Profile' />
                            <Dropdown.Item onClick={logout} text='logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
});


