import logo from './logo.svg';
import './App.css';
import {Counter} from './components/Counter';
import {MyDrawer} from "./components/myDrawer/MyDrawer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
            {/*<Counter />*/}
            <MyDrawer />
      </header>
    </div>
  );
}

export default App;
