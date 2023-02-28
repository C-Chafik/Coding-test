import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../pages/Navbar';

const validate = (values) => {
  /* This function is our form input validator, that is triggered by the formik hook */
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = 'Required';
  }

  if (values.password !== values.confirmpassword) {
    errors.confirmpassword = 'Password should match';
    errors.password = 'Password should match';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default function Register() {
  const navigate = useNavigate(); /* Will be used to redirect the user to the login page after he successfully registered */

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      country: '',
      city: '',
      phone: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    validate,
    onSubmit: (values) => {
      axios.post('http://localhost:3002/register', {
        firstname: values.firstname,
        lastname: values.lastname,
        country: values.country,
        city: values.city,
        phone: values.phone,
        email: values.email,
        password: values.password,
      })
        /* If the API return us a user, this mean that the user already exist */
        .then((response) => { if (response.data.message) { formik.setErrors({ email: 'User Already exist.' }); } else { navigate('/login'); } })
        .catch((error) => { throw (error); });
    },
  });

  return (
    <div>
      <Navbar />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl text-gray-500">Please fill in the form.</p>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">Email Address</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}

            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">Password</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}

            <label htmlFor="confirmpassword" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">Confirm Password</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
            />
            {formik.errors.confirmpassword ? <div className="text-red-500">{formik.errors.confirmpassword}</div> : null}

            <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">First Name</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              name="firstname"
              type="firstname"
              onChange={formik.handleChange}
              value={formik.values.firstname}
            />

            <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">Last Name</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              name="lastname"
              type="lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />

            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">Country</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              name="country"
              type="country"
              onChange={formik.handleChange}
              value={formik.values.country}
            />

            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">City</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              name="city"
              type="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />

            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2 py-3 px-2">Phone Number</label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <button type="submit" className="flex mt-10 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
