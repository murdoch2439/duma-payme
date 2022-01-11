import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n'
import App from './App';


// 0978 449 782

// 0824 099 111

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      {/*<Suspense fallback={(<div>Loading¬¬¬</div>)}>*/}
          <App />
      {/*</Suspense>*/}

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
