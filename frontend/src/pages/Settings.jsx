import { useState } from 'react';
import { AdminNavbar } from '../components/AdminNavbar';
import General from '../components/General';
import { Sidebar } from '../components/Sidebar';
import { Link } from 'react-router-dom';
import ToggleMode from '../components/ToggleMode';


export const Settings = ({ theme, setTheme }) => {
  const [showGeneral, setShowGeneral] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [selectedItem, setSelectedItem] = useState('general');

  return (
    <div className="min-h-screen flex dark:bg-gray-900 text-black dark:text-white">
      <Sidebar />
      <main className={`flex-1 border-t-2 ${theme === 'dark' ? 'bg-[#494949]' : 'bg-[#EEDAEA]'}`}>
        <AdminNavbar />
        <div className='container mx-auto px-10 py-10'>
          <h1 className="text-4xl mb-5">Settings</h1>
          <div className='flex pt-10'>
            <div className='w-1/4 '>
              <ul className="flex flex-col p-4 items-center justify-center">
                <li className="mb-4">
                <button
                    onClick={() => {
                      setShowGeneral(true);
                      setShowNotifications(false);
                      setSelectedItem('general');
                    }}
                    className={`px-7 py-3 ${selectedItem === 'general' ? 'border-black border-2' : 'hover:border-black hover:border-2'}`}
                  >
                    General
                  </button>
                </li>
                <li>
                <button
                    onClick={() => {
                      setShowGeneral(false);
                      setShowNotifications(true);
                      setSelectedItem('notifications');

                    }}
                    className={`px-5 py-3 ${selectedItem === 'notifications' ? 'border-black border-2' : 'hover:border-black hover:border-2'}`}
                  >
                    Notifications
                  </button>
                </li>
              </ul>
              <div className='flex items-center justify-center mt-10'>
                <Link to='/dashboard' className='text-[#171AE3] text-semibold'>Go to Dashboard</Link>
              </div>
            </div>
            <div className='w-3/4 pl-4 border-l-2 border-l-gray-500'>
              {showGeneral && <General />}
              <div className='flex ml-5'>
                <span>Theme:</span>
                <span className='pl-10'><ToggleMode theme={theme} setTheme={setTheme} /></span>
              </div>
              {showNotifications} 
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};