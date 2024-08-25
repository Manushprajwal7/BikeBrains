import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./components/frebase/firebase";
import { login, logout, selectUser } from "./features/counter/UserSlice";
import Homepage from "./pages/homepage";
import NewQuestionPage from "./pages/NewQuestionPage";
import ViewQuestionPage from "./pages/ViewQuestionPage";
import AuthentationPage from "./pages/authentationPage";

// Define PrivateRoute as a separate component
function PrivateRoute({ children }) {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/auth" replace />;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/add-question",
      element: (
        <PrivateRoute>
          <NewQuestionPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/view-question",
      element: (
        <PrivateRoute>
          <ViewQuestionPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/auth",
      element: <AuthentationPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
