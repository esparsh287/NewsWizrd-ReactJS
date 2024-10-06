import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  
  const [progress, setProgress] = useState(10)
    return (
      <div>
        <Router>
          <Navbar />
              <LoadingBar
              height={3}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress}  key="general" pageSize={7} country="us" category="general" />} />
            <Route exact path='/business' element={<News setProgress={setProgress}  key="business" pageSize={7} country="us" category="business" />} />
            <Route exact path='/sports' element={<News setProgress={setProgress}  key="sports" pageSize={7} country="us" category="sports" />} />
            <Route exact path='/tech' element={<News setProgress={setProgress}  key="tech" pageSize={7} country="us" category="technology" />} />
            <Route exact path='/health' element={<News setProgress={setProgress}  key="health" pageSize={7} country="us" category="health" />} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress}  key="entertainment" pageSize={7} country="us" category="entertainment" />} />
            <Route exact path='/science' element={<News setProgress={setProgress}  key="science" pageSize={7} country="us" category="science" />} />
          </Routes>
        </Router>
      </div>
    );
  
}
export default App