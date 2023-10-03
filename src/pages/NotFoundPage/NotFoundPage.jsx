import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import image from './Page-not-found.jpeg';

export default function NotFound () {
  const navigate = useNavigate();
  const [countdown, setСountdown] = useState(5);

  useEffect(() => {
    const getTime = () => {
      if (countdown === 0) {
        navigate('/', { replace: true });
        return () => clearInterval(interval);
      }
      setСountdown(countdown - 1);
    };
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [countdown, navigate]);

  return (
    <div>
      <img src={image} alt="crying cat" />
      <p>
        Sorry, we couldn't find this page. You will be redirected to the main
        page in {countdown} seconds
      </p>
    </div>
  );
};


