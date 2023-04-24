import logo from './logo.svg';
import './App.css';
import { FoodMenu } from './ListMenu/FoodMenu';
import { OrderMenu } from './ListMenu/OderMenu';
import { ReservationMenu } from './ListMenu/ReservationMenu';
import { FoodCategoryMenu } from './ListMenu/FoodCategoryMenu';
import { MainShell } from './MainShell';
import 'bootstrap/dist/css/bootstrap.css';
function App() {

  return (
    <div className="App">
      <MainShell />
    </div>
  );
}

export default App;
