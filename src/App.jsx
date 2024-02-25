import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/login/Login";
import HrDashboard from "./HrDashboard";
import CardForm from './components/emp_card/CardForm';
import AssignBatchesContainer from './components/assignbatches/AssignBatchesContainer';
import HrMyProfile from "./components/HrMyProfile/HrMyProfile";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    { path: "/dashboard", element: <Dashboard /> },
    {
      path:"/hrdashboard",
      element:<HrDashboard/>,
      children:[
        {
          path:"empcard",
          element:<CardForm/>
        },
        {
          path:"assignbatch",
          element:<AssignBatchesContainer/>
        },
        {
          path:"myprofile/:userId",
          element:<HrMyProfile/>
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
