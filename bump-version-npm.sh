cd ./backend && npm run commit:conv -- --release-as $1 && cp CHANGELOG.md ../CHANGELOG.md &&
cd ../frontend && npm run commit:conv -- --release-as $1 && 
cd .. && git add . && git commit --amend --no-edit 
