#! /bin/sh
mkdir temp_web
git config --global user.name "bluejfox"
git config --global user.email "bluejfox@gmail.com"

# if [ "$ROT_TOKEN" = "" ]; then
#   echo "Bye~"
#   exit 0
# fi

# # release
# if [ "$TRAVIS_TAG" ]; then
# # build lib
# npm run dist
# cd temp_web
# git clone https://$ROT_TOKEN@github.com/bluejfox/setaria-ui-lib.git && cd lib
# rm -rf `find * ! -name README.md`
# cp -rf ../../lib/** .
# git add -A .
# git commit -m "[build] $TRAVIS_TAG"
# git tag $TRAVIS_TAG
# git push origin master --tags
# cd ../..

set -e
echo "Enter release version: "
read VERSION

# build theme-chalk
cd temp_web
git clone https://github.com/bluejfox/setaria-ui-theme-chalk.git && cd setaria-ui-theme-chalk
rm -rf *
cp -rf ../../packages/theme-chalk/** .
git add -A .
git commit -m "[build] $VERSION"
git tag $VERSION
git push origin master --tags
cd ../..

rm -rf temp_web
