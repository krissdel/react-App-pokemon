import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-details';
import PokemonList from './pages/pokemon-list';
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';
const App: FunctionComponent = () => {

    return (
        <Router>
            <div>
                {/* la barre de navigation commun a toutes les pages */}
                <nav>
                    <div className="nav-wrapper pink">
                    <img src="../assets/images/logo.png" alt="logo" className="img" />
                        <Link to="/" className="brand-logo center">Meet me up !!!..</Link>
                    </div>
                </nav>
                {/* { le systeme de gestion des routes de notre application} */}
                <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route exact path="/pokemons" component={PokemonList} />
                    <Route path="/pokemons/edit/:id" component={PokemonEdit} />
                    <Route path="/pokemons/:id" component={PokemonsDetail} /> 
                    <Route component={PageNotFound} />
                </Switch>
            </div>


        </Router>
    )
}

export default App;