cd libs/"$1" || exit
npm version patch
cd ../..
nx build "$1"
cd dist/libs/"$1"
npm publish
