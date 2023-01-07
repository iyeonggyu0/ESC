import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider } from 'styled-components';
import theme from './style/theme.js';
import { Provider } from 'react-redux';
import createStore from './store/store';

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
);
