import { useState, useEffect, useCallback } from 'react';

/**
 * From: https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
 * @param {React.Ref} myRef ref to element
 * @returns {Object} width and hight
 */
const useResize = (myRef) => {
  const getDimensions = useCallback(
    () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight,
    }),
    [myRef]
  );

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getDimensions, myRef]);

  return dimensions;
};

export default useResize;
