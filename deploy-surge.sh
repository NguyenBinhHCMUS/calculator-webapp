# Build reactjs app with production mode
npm run build

# Move to build folder
cd build

#Clone index.html into 200.html
cp index.html 200.html

# Start deplying via Surge
surge . bimbim-calculator.surge.sh