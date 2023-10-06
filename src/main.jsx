import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./utilites/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<App />
				</ChakraProvider>
			</BrowserRouter>
		</PersistGate>
	</Provider>
);

// <React.StrictMode>
{/* </React.StrictMode> */}
