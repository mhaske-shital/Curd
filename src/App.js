import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Sidebar />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/add-user' element={<AddUser />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
