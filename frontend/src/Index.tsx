import { Outlet } from 'react-router-dom'
import '../public/tailwindglobals.css'
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  return (
    <Outlet/>
  )
}

export default Index