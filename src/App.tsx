import React from 'react';
import PropTypes from 'prop-types';
import 'src/styles/globals.css';
import 'src/styles/calendar.css';
import 'src/styles/markdown.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor, RootState } from 'src/store';
import { darkTheme, lightTheme } from 'src/styles/theme';
import { IconDefinition, IconName, IconPrefix, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PersistGate } from 'redux-persist/integration/react';
import { createTheme } from '@mui/material/styles';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { onBrowserThemeChange } from 'src/store/theme';
import { useVisitor } from 'src/hooks/visitors';
import { useSetting } from 'src/hooks/setting';
import {
  createBrowserRouter,
  Outlet,
  Router,
  Route,
  RouterProvider,
  useNavigate,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import Home from './pages/home';
import SimpleLayout from './layouts/SimpleLayout';
import PublicationView from './pages/pubs';
import ExperienceView from './pages/experience';
import MiscellaneousView from './pages/miscellaneous';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

library.add(fab);
library.add(fas);

const faCVStyle = {
  prefix: 'fac' as IconPrefix,
  iconName: 'cv' as IconName,
  icon: [
    406,
    512,
    [],
    'e001',
    'M 70.0681 6.8382 c -5.5436 2.0776 -7.1618 3.3512 -9.3542 8.0858 c -1.6182 3.5809 -1.8479 27.0292 -1.8479 246.953 c 0 240.3653 0 242.9075 2.3125 246.7233 c 1.2685 2.0776 3.9254 4.7345 6.0082 6.0082 c 3.8106 2.3072 5.7733 2.3072 195.322 2.0776 l 191.5061 -0.3445 l 4.6197 -4.8494 l 4.5049 -4.8494 v -207.6777 c 0 -199.5919 -0.1148 -207.7978 -2.0776 -211.1438 c -3.8106 -6.1231 -79.5841 -79.5841 -83.6296 -81.0875 C 371.5387 4.6458 76.0763 4.7606 70.0681 6.8382 z M 361.4902 70.0211 v 30.1455 l 3.3512 3.3512 l 3.3512 3.3512 h 30.7249 h 30.7249 l -0.2297 187.9304 l -0.3445 188.0453 H 261 H 92.9369 l -0.3445 -221.542 l -0.2297 -221.4272 h 134.5664 h 134.5664 V 70.0211 z M 232.0081 183.4465 c -12.7055 3.5809 -21.4855 12.0112 -24.9516 23.9128 c -2.3125 8.2006 -2.3125 36.0389 0.2297 44.584 c 3.3512 11.6667 12.9352 20.6764 25.0664 23.5631 c 7.6212 1.8479 25.411 0.9239 31.8785 -1.733 c 9.8188 -4.0403 13.5146 -12.8203 7.7413 -18.4788 c -3.3512 -3.4661 -5.6585 -3.5809 -13.2849 -0.5794 c -7.9709 3.1216 -18.9434 3.1216 -24.0224 0 c -6.2379 -3.8106 -8.3155 -9.9337 -8.3155 -25.2961 c 0 -11.0873 0.3445 -14.094 2.4273 -18.2491 c 4.6197 -9.5891 15.8218 -12.1261 28.7622 -6.6973 c 3.8106 1.6182 7.9709 2.8867 9.2394 2.8867 c 3.9254 0 8.0858 -5.0843 8.0858 -9.8188 c 0 -5.0843 -3.5809 -9.0097 -11.317 -12.361 C 256.8397 182.178 239.8642 181.2541 232.0081 183.4465 z M 294.1522 183.7962 c -6.9322 3.8106 -6.9322 4.2752 9.704 47.1262 C 320.9465 275.047 321.8704 276.66 330.8801 276.66 c 3.5809 0 5.8882 -0.6943 7.9709 -2.657 c 1.9627 -1.733 7.2767 -14.094 17.9046 -41.4677 c 8.3155 -21.3707 15.1328 -40.194 15.1328 -41.6974 c 0 -4.39 -5.0843 -8.3155 -10.9724 -8.3155 c -3.1163 0 -5.8934 0.6943 -6.9322 1.733 c -0.9239 1.0388 -6.5824 16.4012 -12.4758 34.0762 l -10.8576 32.3431 l -10.6279 -31.9934 c -8.5451 -25.7555 -11.317 -32.5728 -13.6294 -34.4207 C 302.927 181.4837 298.6571 181.3689 294.1522 183.7962 z M 142.8349 327.2522 c -2.4273 2.657 -2.4273 4.7345 -0.1148 8.0858 l 1.733 2.5421 h 108.4612 c 97.0241 0 108.576 -0.2297 110.1942 -1.8479 c 2.1924 -2.0776 2.4273 -7.5064 0.4594 -9.4691 c -1.0388 -1.0388 -27.144 -1.3885 -110.0794 -1.3885 C 149.5373 325.1747 144.5679 325.2895 142.8349 327.2522 z M 143.1846 384.0824 c -1.2685 1.2737 -2.3125 3.3512 -2.3125 4.6197 s 1.0388 3.3512 2.3125 4.6197 c 2.3125 2.3125 3.8106 2.3125 110.0794 2.3125 c 103.0324 0 107.9966 -0.1148 109.7296 -2.0776 c 2.7718 -3.0015 2.4273 -7.8561 -0.5794 -9.9337 c -2.3125 -1.6182 -14.6682 -1.8479 -109.7296 -1.8479 C 146.9952 381.7699 145.4918 381.7699 143.1846 384.0824 z',
  ],
} as IconDefinition;

const faGoogleScholarStyle = {
  prefix: 'fac' as IconPrefix,
  iconName: 'google-scholar' as IconName,
  icon: [
    512,
    512,
    [],
    '',
    'M 278.25 22.26 C 137.0051 22.26 22.26 137.0051 22.26 278.25 C 22.26 419.4949 137.0051 534.24 278.25 534.24 C 419.4949 534.24 534.24 419.4949 534.24 278.25 C 534.24 137.0051 419.4949 22.26 278.25 22.26 z M 278.25 44.52 C 407.4641 44.52 511.98 149.0359 511.98 278.25 C 511.98 407.4641 407.4641 511.98 278.25 511.98 C 149.0359 511.98 44.52 407.4641 44.52 278.25 C 44.52 149.0359 149.0359 44.52 278.25 44.52 z M 233.73 122.43 L 122.43 222.6 L 197.9053 222.6 C 198.1279 254.2871 222.2386 286.3801 264.5549 286.3801 C 268.5617 286.3801 273.0154 285.9341 277.4674 285.4889 C 275.464 290.4974 273.3589 294.612 273.3589 301.4013 C 273.3589 314.2008 279.8126 321.8805 285.4889 329.2263 C 267.347 330.4506 233.6161 332.5592 208.7962 348.0299 C 185.0893 362.3876 177.8626 383.2059 177.8626 397.8975 C 177.8626 428.1711 205.9102 456.33 264.1201 456.33 C 333.1261 456.33 369.7464 417.4924 369.7464 379.0939 C 369.7464 350.935 353.7053 337.0155 336.0086 321.8787 L 321.6614 310.4227 C 317.2094 306.8611 311.0748 301.8491 311.0748 292.9451 C 311.0748 283.9298 317.2128 278.1361 322.4439 272.7937 C 339.2502 259.4377 356.16 244.4174 356.16 214.1438 C 356.16 202.5352 353.4465 193.0876 349.5733 185.3189 L 389.55 151.0376 L 389.55 192.2968 C 382.9277 196.1478 378.42 203.2449 378.42 211.47 L 378.42 278.25 C 378.42 290.5375 388.3925 300.51 400.68 300.51 C 412.9675 300.51 422.94 290.5375 422.94 278.25 L 422.94 211.47 C 422.94 203.2561 418.4324 196.1589 411.81 192.2968 L 411.81 133.56 C 411.81 133.0814 411.5942 132.6797 411.5274 132.2122 L 422.94 122.43 L 233.73 122.43 z M 270.1199 158.4938 C 303.5099 158.4938 320.7701 204.2355 320.7701 233.73 C 320.7701 240.9645 319.8753 253.9857 310.7487 263.4462 C 304.2933 270.0129 293.5085 274.9023 283.3802 274.9023 C 248.9885 274.9023 233.1648 229.5023 233.1648 202.1225 C 233.1648 191.549 235.2882 180.539 242.0775 172.0802 C 248.5329 163.7327 259.769 158.4938 270.1199 158.4938 z M 289.8148 340.6823 C 293.9329 340.6823 295.9563 340.6937 299.184 341.1389 C 329.6802 363.1763 342.8127 374.1932 342.8127 395.0063 C 342.8127 420.2714 322.4361 439.2002 283.815 439.2002 C 240.8532 439.2002 213.2525 418.3819 213.2525 389.3326 C 213.2525 360.2833 238.8472 350.5863 247.7512 347.2473 C 264.5575 341.4597 286.2532 340.6823 289.8148 340.6823 z',
  ],
} as IconDefinition;

library.add(faCVStyle);
library.add(faGoogleScholarStyle);

function App() {
  // useVisitor();
  useSetting();
  // const history = useNavigate();

  const dispatch = useDispatch();
  React.useEffect(() => {
    // theme
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    dispatch(onBrowserThemeChange(darkThemeMq.matches));
    darkThemeMq.addEventListener('change', (e) => {
      dispatch(onBrowserThemeChange(e.matches));
    });
    // // page loading
    // const start = () => {
    //   NProgress.start();
    // };
    // const end = () => {
    //   NProgress.done();
    // };
    // const unlisten = history.listen((location, action) => {
    //   console.log("on route change");
    // });
    // Router.events.on('routeChangeStart', start);
    // Router.events.on('routeChangeComplete', end);
    // Router.events.on('routeChangeError', end);
    // return () => {
    //   Router.events.off('routeChangeStart', start);
    //   Router.events.off('routeChangeComplete', end);
    //   Router.events.off('routeChangeError', end);
    // };
  }, []);

  const theme = useSelector((state: RootState) => state.theme.value);

  const Theme = theme === 'light' ? createTheme(lightTheme) : createTheme(darkTheme);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
  ]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SimpleLayout />}>
              <Route index element={<Home />} />
              <Route path="/pubs" element={<PublicationView />} />
              <Route path="/experiences" element={<ExperienceView />} />
              <Route path="/miscellaneous" element={<MiscellaneousView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
