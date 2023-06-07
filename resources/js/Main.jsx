import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ValorFuturoPage from './pages/ValorFuturoPage';
import TasaInteresPage from './pages/TasaInteresPage';
import SnackBarContext from './contexts/SnackBarContext';
import AxiosLayer from './components/AxiosLayer';



function App() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <SnackBarContext.Provider value={
            {
                open: open,
                message: message,
                handleOpen: () => setOpen(true),
                handleClose: () => setOpen(false),
                setMessage: (message) => setMessage(message)
            }
        }>
            <AxiosLayer>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<ValorFuturoPage />} />
                        <Route exact path="/tasas-interes" element={<TasaInteresPage />} />
                    </Routes>
                </Router>
            </AxiosLayer>
        </SnackBarContext.Provider>
    );
}

export default App;
let root = document.getElementById('root');
if (root) {
    const Index = ReactDOM.createRoot(root);

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
