// Quick script to hash the password "Test@123456"
const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'Test@123456';
  const hashedPassword = await bcrypt.hash(password, 15);
  console.log('Hashed password:', hashedPassword);
}

hashPassword();

