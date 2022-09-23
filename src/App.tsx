import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <button>Dark mode</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
