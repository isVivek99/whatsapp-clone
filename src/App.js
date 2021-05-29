import './App.css';
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './Chat/ChatWindow';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { GlobalContext } from './context/GlobalState';
import { useContext } from 'react';
import Login from './Login';

function App() {

    const { user } = useContext(GlobalContext);

    return (
        !user?(
            <Login/>
        ):
            <div className="app">
                <div className="app__body">
                    <Router>
                        <Sidebar/>
                        <Switch>
                            <Route path={`/rooms/:roomId`}>
                                <ChatWindow/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
    )
}

export default App;