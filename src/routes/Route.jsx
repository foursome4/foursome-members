import { useContext } from 'react';
import {Route, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

function RouteWrapper({
    element: Element,
    isPrivate,
    ...rest
}){
    const {signed, loading} = useContext(AuthContext)

    if(loading) {
        return(
            <div><h1>Carregando a página</h1></div>
        )
    }

    if(!signed && isPrivate) {
        return <Link to="/" />
    }
    if(signed && !isPrivate) {
        return <Link to="/feed" />
    }

    return (
        <Route
        {...rest}
        render={props => (
            <Element {...props} />
        )}
        />
    )
}

export default RouteWrapper;