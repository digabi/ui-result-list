# ui-result-list

## Publishing new versions

You need to set publish token before publishing:

```
npm config set _authToken=%YOUR_ACCES_TOKEN%
```

Token can be found in Keepass. 

Alternatively you can have .npmrc file on your disk.

### To preview changes in `registry` repository:

1. run `npm run compile`
2. copy folder `lib` into `registry` repository into `node_modules/@digabi/ui-result-list` overwriting the old `lib` folder
3. run `make restart` in `registry` repository

### Pre-release

Pre-releases are optional and usually used for testing changes on e.g. staging environments. Use separate branches when using pre-releases and clean commit history before merging into the main branch 🙏

```
git add .
git commit -a
npm run compile
git push
npm version prerelease --preid=rc
git push
npm publish --tag next
```

### Release

Execute these on the `main` branch after all changes to be published are merged and pushed

```
npm run compile
npm version minor
git push
npm publish
```
