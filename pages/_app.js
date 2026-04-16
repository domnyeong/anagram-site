import '../styles/globals.css';
import { AppProvider } from '../context/AppContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SubscribeModal from '../components/SubscribeModal';

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Nav />
      <Component {...pageProps} />
      <Footer />
      <SubscribeModal />
    </AppProvider>
  );
}
