import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../pages/Navbar';

/* The profile Page just takes the props from the API and prints it */
export default function ProfilePage({ user }) {
  return (
    <div>
      <Navbar />
      <div className="grid justify-self-center justify-items-center text-2xl">
        <p>{user.firstname}</p>
        <h2>{user.lastname}</h2>
        <h2>{user.country}</h2>
        <h2>{user.city}</h2>
        <h2>{user.email}</h2>
        <h2>{user.number}</h2>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.arrayOf),
};
ProfilePage.defaultProps = {
  user: {
    firstname: '', lastname: '', country: '', city: '', email: '', number: '',
  },
};
