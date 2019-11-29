## biz-talk-read-list-demo

This is where you include your WebPart documentation.


### Create SPFx solution

```bash
yo @microsoft/sharepoint
gulp serve
gulp build
gulp bundle --ship
gulp package-solution --ship
```

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

