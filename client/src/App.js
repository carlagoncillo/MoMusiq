import './App.css';
import { Switch, Route } from 'react-router-dom';
import Lyrics from './components/Lyrics';
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/lyrics">
          <Lyrics/>
        </Route>
        <Route exact path="/createLyrics">
          <Create/>
        </Route>
        <Route exact path="/showLyrics/:id">
          <Show/>
        </Route>
        <Route exact path="/editLyrics/:id">
          <Edit/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
