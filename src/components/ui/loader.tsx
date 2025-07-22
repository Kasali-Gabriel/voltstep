import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoaderProps {
  size?: number;
  color?: string;
  borderWidth?: string;
}

const Loader = ({ size = 35, color = '#000000', borderWidth='1px' }: LoaderProps) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderWidth: borderWidth,
  };

  return (
    <div>
      <ClipLoader
        color={color}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
