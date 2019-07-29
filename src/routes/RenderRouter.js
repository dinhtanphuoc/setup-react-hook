import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ConnectedSwitch from 'routes/ConnectedSwitch';

const RenderRoutes = ({ routes, location }) => {
  return (
    <ConnectedSwitch>
      {routes.map((route, i) => (
        <Route
          key={i}
          exact
          path={route.path}
          render={props => <route.component {...props} routes={route.routes} />}
        />
      ))}
    </ConnectedSwitch>
  );
};

RenderRoutes.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  routes: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default withRouter(
  connect(
    null,
    null
  )(RenderRoutes)
);
