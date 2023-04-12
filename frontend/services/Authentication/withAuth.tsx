
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

interface WithAuthProps {
  // Define the props passed to the wrapped component
  // (replace 'any' with the actual props interface)
  prop1: any;
  prop2: any;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {

  const Wrapper: React.FC<P> = (props) => {
      const access_token =cookies().get('access_token')
      const refresh_token=cookies().get('refresh_token')
    //   storage.getItem('access_token');
       // Get the JWT token from the local storage

      if (!access_token) {
        redirect('/auth?unauthorized=true'); // Redirect the user to the login page if the JWT token is not present
      }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
