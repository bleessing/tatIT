  import React from 'react';
import './App.css';
  import DocumentCard from "./components/DocumentCard";

function App() {
  return (

    <div className="App">

      <header className="App-header">
        <h2 className='form__title'>Карточка документа</h2>
        <div className="form">


          <DocumentCard/>
        </div>
      </header>
    </div>
  );
}

  export default App;
