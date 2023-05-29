import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import SignIn from './Auth/SignIn.jsx';
import Signup from './Auth/SignUp.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import CreateVm from './CreateVM/CreateVM.jsx';
import PipelineStatus from './PipelineStatus.jsx';
import VMdetails from './Dashboard/VMdetails.jsx';
import Monitoring from './Monitoring/Monitoring.jsx';
import AnsiblePipelineStatus from './AnsiblePipelineStatus.jsx';
//import TerminalSSH from './SSH/TerminalSSH.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "SignIn",
    element: <SignIn />
  },
  {
    path: "/CreateVM",
    element: <CreateVm />,
    
  },
  {
    path: "SignUp",
    element: <Signup />
  },
  {
    path: "Dashboard",
    element: <Dashboard />
  },
  {
    path: "PipelineStatus",
    element: <PipelineStatus />
  },
  {
    path: "/vms/:vmName",
    element: <VMdetails />
  },
  {
    path: "Monitoring",
    element: <Monitoring />
  },
  {
    path: "AnsiblePipeline",
    element: <AnsiblePipelineStatus />
  },
  /*{
    path: "SSH",
    element: <TerminalSSH />
  }*/
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)