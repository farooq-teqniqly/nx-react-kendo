import '@progress/kendo-theme-material/dist/all.css';
import styles from './app.module.css';
import { Calendar } from '@progress/kendo-react-dateinputs';

export function App() {
  return (
    <div className="App">
      <h1>Hello KendoReact!</h1>
      <Calendar />
    </div>
  );
}

export default App;
