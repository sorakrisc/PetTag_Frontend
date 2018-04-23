import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login'
import Register from './Register'
import Profile from './EditProfile'
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import {createMuiTheme} from "material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f05545',
            main: '#4184f5',
            dark: '#4893ea',
            contrastText: '#f7f3ed',
        },
        secondary: {
            light: '#000',
            main:'#4184f5',
            dark: "#3c7ac3",
            contrastText: '#f7f3ed'
        },
    }
})

function MainApp(){
    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/edit-profile" component={Profile} />
                    </div>
                </Router>
            </MuiThemeProvider>
        </div>
    )
}

    ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();
