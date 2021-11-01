import logo from './logo.svg';
import './App.css';
import {Header} from "./components/Header/Header";
import {Modal} from "./components/Modal/Modal";
import {useSelector} from "react-redux";
import {Router} from "./components/Router/Router";

function App() {
    const modal = useSelector(store => store.object.modal);

    return (
    <div className="App">
        {modal.visible &&
            <Modal type={modal.type} />
        }
      <Header/>
      <Router/>
    </div>
    );
}

export default App;
