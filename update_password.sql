UPDATE users 
SET password = '$2b$15$n0R86IR9tX4zmn/qCRqPueKK/XKK2YeRsCAhp0k2KyOYvupXViTWG'
WHERE email = 'haxsol0983@gmail.com';

SELECT email, "firstName", "lastName", "isEmailVerified" 
FROM users 
WHERE email = 'haxsol0983@gmail.com';

