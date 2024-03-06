import { Outlet } from 'react-router-dom'
import './global/tailwindglobals.css'
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  return (
    <Outlet/>
  )
}

export default Index