# Authentication

Let's list the endpoints that we are using in this project and explain each one at a time:

1. Signup
1. Signin
1. Signout
1. Refresh
1. Reset Password Request
1. Reset Password Reset

## Signup

When a user is signing up, he/she requires two things: Email + Password. After the user provides those, the server does several stuff:

1. It creates a randomly general salt
1. It encrypts the provided password using the salt generated above
1. It creates a new record in the database with the info it has gathered so far (email, passwordHash, salt)
1. It generates a jwtToken from the user object that was just created (removing sensitive information that the user should now know - like the hash and the salt)
1. It generates a refreshToken (the refreshToken is explained later)
1. It returns a response to the user consisting of the: User data + JWT Token + Refresh Token

## Signin

When a user is a signing in, he/she requires two things: Email + Password. After the user provides those, the server does several stuff:

1. Verifies that the user with the provided details exists in the database (Email + Password)
1. Updates the user's lastLoginAt property
1. It generates a jwtToken from the user object that was just created (removing sensitive information that the user should now know - like the hash and the salt)
1. It generates a refreshToken (the refreshToken is explained later)
1. It returns a response to the user consisting of the: User data + JWT Token + Refresh Token

## Signout

When a user is signing out, she/she requires only the jwtToken. After the user provides those, the server does the following:

1. Delete the refresh token from the user's document in the database.

## Refresh

A JWT token is not expected to be stored anywhere on the front end. Not in localStorage, not in the cookies, not anywhere. When a user refreshes the page or opens a new tab, the jwtToken is expected to not be present. Instead of forcing the user to login again in order to receive the jwtToken, the front end application can use the refreshToken in order to receive a new jwtToken in order to access authenticated routes.
The RefreshToken is expected to be stored site-only cookie. The jwtToken is short lived (1 hour), while the refreshToken lives longer (7 days). Refresh tokens can only be used once, whenever a refresh token is used, a new refresh token is generated and saved in the database. Therefore old refresh tokens are not usable anymore.
Therefore whenever a user calls the refresh endpoint, the following takes place on the server:

1. A new jwtToken is generated
1. A new refreshToken is generated
1. The user, jwtToken, and the refreshToken are returned in the response.

## Reset Password

### Request

When a user requests a password reset he/she needs the email of the account that needs password resetting, then the following happens on the backend:

1. The email is checked if it exists in the database
1. A reset password token is created and saved in the database
1. The reset password token is returned in the response of the endpoint

### Reset

When a user resets a password he/she needs the resetPasswordToken, then the following happens on the backend:

1. The reset password token is checked if it matches the one stored in the database
1. A new salt and hash is generated from the password provided by the user
1. A message is returned to the user that the password has been reset, and can now login with the new password

## Some other things to talk about

### Authentication middleware

Anytime a user wants to access an authenticated endpoint, he/she needs to provide the jwtToken in the authorization header. When the middleware is executed, the following happens:

1. It checks that the jwtToken is valid and not expired
1. It checks if the user exists in the database
1. Then it saves the user object coming from the database in the request so any other middleware after it can access the user object as well as the controller

### Force login

We force a user to login if any of the following scenarios occur:

1. User has logged out (we do this because the jwtToken might still be valid and user can still use the jwtToken to communicate with authenticated endpoints)
2. User has reset his password (that way the user is forced to login with the new password that he/she set)

### Incorrect password attempts

When a user executes several incorrect login attempts (currently the maximum is set to 5 attempts), the account will be locked and the user is forced to reset his/her password. When the user resets the password using the reset-password endpoints, his/her account is then unlocked (i.e. number of incorrect attemps is set back to 0).
