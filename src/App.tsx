import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

import { Navbar } from './components/Navbar';
import { LoadingOverlay, loadingOverlayRef } from './components/LoadingOverlay';
import { AlertDialog, alertDialogRef} from './components/AlertDialog';
import { InitializationScreen } from './components/InitializationScreen';
import { useAppDispatch } from './redux/store';
import { initialize } from './redux/slices/auth';

import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { BoardPage } from './pages/BoardPage';
import { BoardsPage } from './pages/BoardsPage';
import { Route404Page } from './pages/Route404';
import { BoardForm } from './pages/BoardForm';

function App() {
  const [initialized, setInitialized] = useState(false)
  //const isInitialized = useSelector(state => state.app.isInitialized);
  const dispatch = useAppDispatch();
  async function initializeApp() {
    await dispatch(initialize()).unwrap()
    setInitialized(true)
  }
  useEffect(() => {
    initializeApp()
  }, []);

  if(!initialized) return <InitializationScreen />

  return (
    <>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/profile" component={ProfilePage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/boards/new" component={BoardForm} />
        <Route exact path="/boards/:boardId" component={BoardPage}/>
        <Route exact path="/boards" component={BoardsPage}/>
        <Route exact path="*" component={Route404Page}/>
      </Switch>
      
      <LoadingOverlay ref={loadingOverlayRef} />
      <AlertDialog ref={alertDialogRef}/>
    </>
  );
}

export default App;
