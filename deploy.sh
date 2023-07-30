
set -e

npm run build

cd list

git init
git add -A
git commit -m 'new deploy'
git push -f git@github.com:chernovgit1234/slava-task.git master:gh-pages

cd -

