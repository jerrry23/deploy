/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-06-20 11:40:08
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-06-20 16:44:23
 * @FilePath: \deploy\4.docker缓存优化\cra-deploy\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>当前在 Home 页面</h1>
        <Link to="/about" className="App-link">About</Link>
      </header>
    </div>
  )
}

function About() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>当前在 About 页面</h1>
        <Link to="/" className="App-link">Home</Link>
      </header>
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
