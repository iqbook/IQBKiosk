import React, { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { ErrorBoundary } from "react-error-boundary";
import { ExclamationIcon } from './icons';
import "./App.css"
import ErrorPage from './components/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalProvider } from './context/GlobalContext';
import JoinQueueProtect from './components/JoinQueueProtect/JoinQueueProtect';
import { SocketProvider } from './context/SocketContext';

const Public = React.lazy(() => import("./components/public/Public"));
const JoinQueue = React.lazy(() => import("./components/JoinQueue/JoinQueue"));
const QueueList = React.lazy(() => import("./components/QueueList/QueueList"))
const BarberSignin = React.lazy(() => import("./components/barber/Signin/Signin"));
const AdminSignin = React.lazy(() => import("./components/AdminSignin/AdminSignin"))
const KiyoskDashboard = React.lazy(() => import("./components/Dashboard/Dashboard2"))
const SalonSelection = React.lazy(() => import("./components/SalonSelection/SalonSelection"))
const ProtectedAuthRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedAuthRoute'))
const ProtectedRoute = React.lazy(() => import('./components/Protected/Admin/ProtectedRoute'))
const SalonProtectRoute = React.lazy(() => import('./components/SalonSelection/SalonProtectRoute'))
const AllRoutesProtect = React.lazy(() => import('./components/public/AllRoutesProtect'))
const BarberServeLogin = React.lazy(() => import('./components/QueueList/BarberServeLogin/BarberServeLogin'))
const CancelServeLogin = React.lazy(() => import("./components/QueueList/CancelServeLogin/CancelServeLogin"))
const SalonSettings = React.lazy(() => import('./components/SalonSettings/SalonSettings'))
const SalonSignin = React.lazy(() => import('./components/SalonSettings/SalonSignin/SalonSignin'))
const SalonProtected = React.lazy(() => import("./components/SalonSettings/SalonProtected"))
const BarberKiyoskDashboardProtect = React.lazy(() => import("./components/Protected/Barber/BarberKiyoskDashboardProtect"))
const JoinForm = React.lazy(() => import("./components/JoinForm/JoinForm"))
const SalonServices = React.lazy(() => import("./components/SalonServices/SalonServices"))
const SalonBarbers = React.lazy(() => import("./components/SalonBarbers/SalonBarbers"))
const SalonServices2 = React.lazy(() => import("./components/SalonServices2/SalonServices2"))
const SalonBarbers2 = React.lazy(() => import("./components/SalonBarbers2/SalonBarbers2"))
const JoinQueuePage = React.lazy(() => import("./components/JoinQueuePage/JoinQueuePage"))
const JoinQueueSuccess = React.lazy(() => import("./components/JoinQueueSuccess/JoinQueueSuccess"))

const ErrorFallback = ({ error }) => {

  const navigate = useNavigate()

  const errorLogoutHandler = () => {
    localStorage.setItem('adminkiyoskloggin', 'false')
    localStorage.setItem('adminkiyosktoken', '')
    localStorage.setItem("salonSelect", "false")
    navigate('/')
  }
  return (
    <main className="error_boundary_container">
      <div>
        <div><ExclamationIcon /></div>
        <p>Oops ! Something went wrong</p>
        <button onClick={errorLogoutHandler}>Logout</button>
      </div>
    </main>
  );
};

const ErrorFallbackAuth = () => {
  return (
    <main className="error_boundary_container_auth">
      <div>
        <div><ExclamationIcon /></div>
        <p>Oops ! Something went wrong</p>
      </div>
    </main>
  )
}



const App = () => {

  const { currentTheme, colors } = useSelector(state => state.theme);
  const { modecolors } = useSelector(state => state.modeColor)

  useEffect(() => {
    // This sets globally 
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      p, h1, h2, h3, h4, h5, i, input, textarea, select, button,b, label {
        color:${currentTheme === "Dark" ? "#F4F4F5" : "#09090B"};
      }

      input::placeholder, textarea::placeholder {
        color: ${currentTheme === "Dark" ? "#f4f4f583" : "#09090b71"};
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg-secondary",
      modecolors.color1
    );
  }, [modecolors]);

  return (<>
    <Toaster />
    <GlobalProvider>
      <BrowserRouter>
        <Suspense fallback={
          <div
            style={{
              width: "100vw",
              height: "100svh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#fff"
            }}><Loader /></div>
        }>
          <Routes>

            <Route element={<ErrorBoundary FallbackComponent={ErrorFallbackAuth}><ProtectedAuthRoute /></ErrorBoundary>}>
              <Route path="/" element={<AdminSignin />} />
            </Route>

            <Route element={<ErrorBoundary FallbackComponent={ErrorFallback}><ProtectedRoute /></ErrorBoundary>}>
              <Route element={<SalonProtectRoute />}>
                <Route path="/selectsalon" element={<SalonSelection />} />
              </Route>

              <Route element={<AllRoutesProtect />}>

                <Route element={<SocketProvider><Layout /></SocketProvider>}>
                  <Route path="/kiosk" element={<Public />} />

                  <Route element={<JoinQueueProtect />}>
                    <Route path="/joinForm" element={<JoinForm />} />
                    <Route path="/salonServices" element={<SalonServices />} />
                    <Route path="/salonBarbers" element={<SalonBarbers />} />
                    <Route path="/salonServices2" element={<SalonServices2 />} />
                    <Route path="/salonBarbers2" element={<SalonBarbers2 />} />
                    <Route path="/joinQueuePage" element={<JoinQueuePage />} />
                    <Route path="/joinQueueSuccess" element={<JoinQueueSuccess />} />
                  </Route>

                  <Route path="/salonsignin" element={<SalonSignin />} />

                  <Route element={<SalonProtected />}>
                    <Route path="/salonsettings" element={<SalonSettings />} />
                  </Route>

                  <Route path="/joinqueue" element={<JoinQueue />} />
                  <Route path="/queuelist" element={<QueueList />} />
                  <Route path="/barberservelogn" element={<BarberServeLogin />} />
                  <Route path="/cancelservelogn" element={<CancelServeLogin />} />
                  <Route path="/barbersignin" element={<BarberSignin />} />
                  <Route element={<BarberKiyoskDashboardProtect />}>
                    <Route path="/kiyoskdashboard" element={<KiyoskDashboard />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </GlobalProvider>
  </>
  );
};

export default App;
