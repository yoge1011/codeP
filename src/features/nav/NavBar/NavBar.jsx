import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";

class NavBar extends Component {
  handleSignIn = () => this.props.openModal("LoginModal");

  handleRegister = () => this.props.openModal("RegisterModal");

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authenticate = auth.isLoaded && !auth.isEmpty;
    console.log(auth,'kkkttt');
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item exact as={NavLink} to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} exact to="/events" name="Events" />
          {authenticate && (
            <Fragment>
              <Menu.Item as={NavLink} to="/people" name="People" />
              <Menu.Item as={NavLink} to="/test" name="Test" />
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>
            </Fragment>
          )}
          {authenticate ? (
            <SignedInMenu
              signOut={this.handleSignOut}
              auth={auth}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = {
  openModal
};

export default withRouter(
  withFirebase(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavBar)
  )
);
