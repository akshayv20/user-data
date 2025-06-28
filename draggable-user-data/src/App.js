import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import DraggableTable from "./components/DraggableTable";

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
 
        <DraggableTable />
      </div>
    </Provider>
  );
}

export default App;
