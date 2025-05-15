import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
        <ToastContainer position="bottom-center" autoClose={3000} />
      </main>
    </>
  );
}

export default App;
