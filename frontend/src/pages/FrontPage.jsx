import React from 'react';
import Navbar from './Navbar';

function FrontPage() {
  return (
    <div>
      <Navbar />
      <div className="text-center flex-end">
        <h1 className="text-9xl text-gray-500">Hello.</h1>
      </div>
    </div>
  );
}

export default FrontPage;
