# ui-result-list


## Publishing new versions
Pre-releases are optional and usually used for testing changes on e.g. staging environments. Use separate branches when using pre-releases and clean commit history before merging into the main branch 🙏
### Pre-release
```
git add .
git commit -a
yarn build
git push
npm version prerelease --preid=rc
git push
npm publish --tag next
```


### Release
Execute these on the main branch after all changes to be published are merged and pushed
```
npm version minor
git push
npm publish
```
