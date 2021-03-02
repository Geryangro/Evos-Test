import './App.css';
import { Switch, Route } from "react-router-dom";
import route from "@routes";
import logo from "./evos.png"

function App() {
  return (
    <div className="App">
      <div className="header">
        <img  src={logo} alt="logo" className="logo ml-20" />
      </div>
      <div className="container mx-auto">
        <Switch>
          <Route exact path={route.map((route) => route.path)}>
            <Switch>
              {route.map((props, index) => (
                <Route key={props.name + index} {...props} />
              ))}
            </Switch>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
