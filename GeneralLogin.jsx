import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.userDataSession);

  return (
    <Route
      {...rest}
      render={props => {
        if (user && user.userData) {
          // Si el usuario está autenticado, renderiza el componente solicitado
          return <Component {...props} />;
        } else {
          // Si el usuario no está autenticado, redirige a la página de inicio de sesión
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;