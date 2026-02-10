Setup Instructions

1️- Clone repo
git clone git@github.com:rishabhs-rizz/assignment-feb.git
cd assignment-feb

2️- Install dependencies
npm install

3️- Setup environment variables
Create:

.env

Add your MongoDB connection string: (don't forget to mention 'cartdb' db name in the end of URI)

If using mongoDB via docker:
MONGODB_URI=mongodb://localhost:27017/cartdb

If using MongoDB locally:
MONGODB_URI=mongodb://localhost:27017/cartdb

If using MongoDB Atlas:
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.bmmtb.mongodb.net/cartdb?appName=Cluster0

4- Run dev server
npm run dev

Open:

http://localhost:3000
