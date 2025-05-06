import './App.css';
import GmailDotGenerator from './components/GmailDotGenerator';
import ThemeToggle from './components/ThemeToggle';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 md:p-8'>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>

      <main className='w-full max-w-xl flex flex-col items-center justify-center'>
        <GmailDotGenerator />
      </main>

      <Toaster position='top-center' />
    </div>
  );
};

export default App;
