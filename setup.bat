@echo off
echo Setting up Portfolio Backend Project...

REM Create directories
mkdir src\controllers
mkdir src\models
mkdir src\routes
mkdir src\middleware
mkdir src\utils
mkdir src\config
mkdir public\uploads

REM Create files
echo. > .env
echo. > .gitignore
echo. > src\server.js

echo Project structure created successfully!
echo.
echo Next steps:
echo 1. Run: npm init -y
echo 2. Install dependencies: npm install express dotenv cors bcryptjs jsonwebtoken multer cloudinary pg sequelize nodemailer
echo 3. Install dev dependencies: npm install -D nodemon