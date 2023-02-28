const shajs = require('sha.js');
const db = require('../sql/db');

const SECRET = process.env.SECRET || 'test-dev-secret';
/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} country
 * @param {string} city
 * @param {string} phone
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

const registerUser = async (firstname, lastname, country, city, phone, email, password) => {
  /* First check if the user already exit... */
  const usercheckQuery = {
    text: ` SELECT * 
              FROM public.users s 
              WHERE email = $1`,
    values: [email],
  };

  const { rows } = await db.query(usercheckQuery);
  if (rows[0]) {
    return { userAlreadyExist: true, insertedUser: false };
  }

  /* If the user doesn't exist then we insert it */

  const hash = hashPassword(email, password);
  const userinsertQuery = {
    text: ` INSERT
              INTO public.users
              (email, password, first_name, last_name, country, city, phone_number)
              VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    values: [email, hash, firstname, lastname, country, city, phone],
  };

  try {
    const { checkrows } = await db.query(userinsertQuery);
    if (checkrows[0]) {
      const check = checkrows[0];
      if (check.affectedRows === 1) {
        console.log('successfull');
        return { userAlreadyExist: false, insertedUser: true };
      }
      console.log('not successfull');
      return { userAlreadyExist: false, insertedUser: false };
    }
    throw (new Error('Bad credentials'));
  } catch (error) {
    return undefined;
  }
};

module.exports = {
  registerUser,
};
