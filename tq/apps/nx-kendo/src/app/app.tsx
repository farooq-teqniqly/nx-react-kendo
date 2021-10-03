import '@progress/kendo-theme-material/dist/all.css';
import styles from './app.module.css';
import { Calendar } from '@progress/kendo-react-dateinputs';
import { DataResult, process, State } from '@progress/kendo-data-query';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
} from '@progress/kendo-react-grid';
import {
  DropDownList,
  DropDownListChangeEvent,
} from '@progress/kendo-react-dropdowns';
import products from '../data/products.json';
import categories from '../data/categories.json';
import { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';

export function App() {
  const onChange = (event: DropDownListChangeEvent) => {
    console.log('change', event.target.value);
  };

  const [dataState, setDataState] = useState<State>({
    skip: 0,
    take: 10,
    sort: [{ field: 'ProductName', dir: 'asc' }],
  });

  const [dataResult, setDataResult] = useState<DataResult>(
    process(products, dataState)
  );

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    setDataResult(process(products, event.dataState));
    setDataState(event.dataState);
  };

  const checkboxColumn = (props) => {
    return (
      <td>
        <input type="checkbox" checked={props.dataItem[props.field]} />
      </td>
    );
  };

  const [buttonTitle, setButtonTitle] = useState('Default title');
  const [buttonClickCount, setButtonClickCount] = useState(1);

  const handleClick = () => {
    setButtonClickCount(buttonClickCount + 1);
    setButtonTitle(`Clicked ${buttonClickCount} times!`);
  };

  return (
    <div className="App">
      <h1>Hello KendoReact!</h1>
      <Calendar />
      <br />
      <DropDownList
        data={categories}
        dataItemKey="CategoryID"
        textField="CategoryName"
        defaultItem={{ CategoryID: null, CategoryName: 'Product categories' }}
        onChange={onChange}
      />
      <Grid
        style={{ height: '700px' }}
        data={dataResult}
        {...dataState}
        sortable={true}
        filterable={true}
        pageable={{ buttonCount: 4, pageSizes: true }}
        onDataStateChange={dataStateChange}
      >
        <GridColumn field="ProductName" />
        <GridColumn field="UnitPrice" filter="numeric" format="{0:c}" />
        <GridColumn field="UnitsInStock" />
        <GridColumn
          field="Discontinued"
          cell={checkboxColumn}
          filter="boolean"
        />
      </Grid>
      <Button onClick={handleClick}>{buttonTitle}</Button>
    </div>
  );
}

export default App;
