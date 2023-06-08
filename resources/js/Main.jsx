import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AxiosLayer from './components/AxiosLayer';
import SnackBarContext from './contexts/SnackBarContext';
import AmortizacionPage from './pages/AmortizacionPage';
import AnualidadesPage from './pages/AnualidadesPage';
import TasaInteresPage from './pages/TasaInteresPage';
import ValorTiempoPage from './pages/ValorTiempoPage';



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
                        <Route exact path="/" element={<ValorTiempoPage />} />
                        <Route exact path="/tasas-interes" element={<TasaInteresPage />} />
                        <Route exact path="/amortizacion" element={<AmortizacionPage />} />
                        <Route exact path="/anualidades" element={<AnualidadesPage />} />
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
