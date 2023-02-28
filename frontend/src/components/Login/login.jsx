import { React, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Navbar from '../../pages/Navbar';
import ProfilePage from '../ProfilePage/profilepage';

const validate = (values) => {
  /* This function is our form input validator, that is triggered by the formik hook */
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default function Login() {
  const [Logstate, setLogstate] = useState(undefined); /* Will be used to check if we are logged in */

  /* We link the form to the onSubmit() handler with default value ('') in order to call the API */
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      axios.post('http://localhost:3002/user', { /* We give the API the mail and the password in order to log in */
        email: values.email,
        password: values.password,
      })
        /* If the API returned us a user, then we are logged in */
        .then((response) => { if (response.data.message) { setLogstate(response); } })
        .catch((error) => { throw (error); });
    },
  });

  /* If we are logged in then we print the user profile */
  if (Logstate !== undefined) {
    return (
      <ProfilePage
        user={{
          firstname: Logstate.data.message.firstname,
          lastname: Logstate.data.message.lastname,
          country: Logstate.data.message.country,
          city: Logstate.data.message.city,
          email: Logstate.data.message.email,
          number: Logstate.data.message.phone_number,
        }}
      />
    );
  }

  /* If we are not logged in then we just print the login page */
  return (
    <div>
      <Navbar />
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="email" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Email Address</label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          {formik.errors.email ? <div className="absolute mx-96 font-bold text-red-600">{formik.errors.email}</div> : null}
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="password" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Password</label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          {formik.errors.password ? <div className="absolute mx-96 font-bold text-red-600">{formik.errors.password}</div> : null}
        </div>
        <button type="submit" className="mx-auto flex shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}
