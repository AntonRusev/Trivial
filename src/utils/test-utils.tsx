import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import questionsReducer from '../features/questions/questionsSlice';

interface WrapperProps {
    children?: React.ReactNode;
}

function render(ui: any, { route = '/', initialState = {} } = {}) {
    window.history.pushState({}, 'Test page', route);
    const store = configureStore({ reducer: questionsReducer, preloadedState: initialState });

    const Wrapper = ({ children }: WrapperProps) => {
        return (
            <Provider store={store}>
                {children}
            </Provider>
        );
    };

    return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };


// import { render as rtlRender } from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';

// import questionsReducer from '../features/questions/questionsSlice';
// import timerReducer from '../features/timer/timerSlice';
// import scoreReducer from '../features/score/scoreSlice';

// function reducer(ui : any, {
//     preloadedState,
//     store = configureStore({
//         reducer: { question: questionsReducer },
//         preloadedState
//     }),
//     ...renderOptions
// }) {
//     function Wrapper({ children }) {
//         return (
//             <Provider store={store}>
//                 <Router>{children}</Router>
//             </Provider>
//         );
//     };
//     return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// };

// export * from '@testing-library/react';
// export { reducer };