import ReactDOM from 'react-dom/client';
import App from "./components/App";
import './styles/main.css';
import {store} from "./store";
import {Provider} from "react-redux";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
);