import React, {Suspense, useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import ErrorBoundary from './ErrorBoundary'
import Header from './Components/Header';

const Article = React.lazy(() => import('./Components/Article'));
const Form = React.lazy(() => import('./Components/Form'));

function App() {
const [data, setData] = useState(null)

useEffect(() => {
const fetchData = async () => {
await axios.get('/get')
.then((res) => {
setData(res.data)
})
}; fetchData();
}, [])


  return (
    <>
    <Header/>
    <div style={{paddingLeft:"150px", width:"850px"}}>
    <Suspense fallback={<div>Loading article...</div>}>
    <Article/>
    </Suspense>
    <Suspense fallback={<div>Loading comments...</div>}>
   <ErrorBoundary>
    <Form data={data}/>
   </ErrorBoundary>
    </Suspense>
    </div>
    </>
  );
}

export default App;
