import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons

export default function Footer() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <footer className='bg-slate-200 shadow-md w-full'>
      <div className='max-w-6xl mx-auto p-3'>
        <div className='flex flex-col justify-center items-center bg-slate-200'>
          <ul className='flex gap-8 mt-4'>
            <li>
              <Link to='/privacy-policy' className='text-slate-700 hover:underline'>Privacy Policy</Link>
            </li>
            <li>
              <Link to='/terms-of-service' className='text-slate-700 hover:underline'>Terms of Service</Link>
            </li>
            <li>
              <Link to='/contactUs' className='text-slate-700 hover:underline'>Contact Us</Link>
            </li>
            <li>
              <Link to='/profile' className='text-slate-700 hover:underline'>
                {currentUser ? (
                  <img
                    className='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar}
                    alt='profile'
                  />
                ) : (
                  <span>Sign in</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='bg-slate-200 py-2 flex justify-center items-center'>
        <div className='text-lg text-slate-700 mr-4'>Follow us:</div>
        <div className='flex justify-center items-center mx-4'>
          <a href='https://www.facebook.com/' className='text-slate-700 hover:text-blue-500 mx-2' target='_blank' rel='noopener noreferrer'>
            <FaFacebook />
          </a>
          <a href='https://twitter.com/' className='text-slate-700 hover:text-blue-500 mx-2' target='_blank' rel='noopener noreferrer'>
            <FaTwitter />
          </a>
          <a href='https://www.instagram.com/' className='text-slate-700 hover:text-blue-500 mx-2' target='_blank' rel='noopener noreferrer'>
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className='bg-slate-200 py-2 flex justify-center items-center'>
      <p className='text-slate-700 text-lg mt-4'>&copy; 2024 OKexchange. All rights reserved.</p>
      </div>
    </footer>
  );
}
