import logo from './logo.svg';
import './App.css';
import Calendar from "./Calendar/Calendar";
import EventList from "./Calendar/EventList";

function App() {
  return (
    <div className="App">
      {/*<Calendar/>*/}
        <EventList/>
    </div>
  );
}

export default App;
