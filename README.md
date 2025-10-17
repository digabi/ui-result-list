# ui-result-list

### To preview changes in `registry` repository:

1. run `npm run compile`
2. copy folder `lib` into `registry` repository into `node_modules/@digabi/ui-result-list` overwriting the old `lib` folder
3. run `make restart` in `registry` repository


## Publishing new versions
Github actions handles npm publishing (.github/workflows/npm-publish.yml).

Release new version:

```
npm version [patch, minor, major]
git push --follow-tags
```

Release new beta version

```
npm version prerelease --preid=beta
git push --follow-tags
```
