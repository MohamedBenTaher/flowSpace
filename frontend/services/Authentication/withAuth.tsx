
import { redirect } from 'next/navigation';
import LocalStorageService from '../localStorage/LocalStorageService';

// this HOC can expand in the future due to adding ther types of user +roles
interface WithAuthProps {
  // Define the props passed to the wrapped component
  // (replace 'any' with the actual props interface)
  prop1: any;
  prop2: any;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  
  const storage=new LocalStorageService()
  const Wrapper: React.FC<P> = (props) => {
      const token = storage.getItem('access_token'); // Get the JWT token from the local storage

      if (!token) {
        redirect('/auth?unauthorized=true'); // Redirect the user to the login page if the JWT token is not present
      }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
