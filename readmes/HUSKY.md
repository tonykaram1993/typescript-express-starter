## Husky

Currently, there are two husky scripts that run:

-   Pre commit
-   Post checkout

### Pre Commit

The following runs before a developer commits a change:

```
yarn prettier && yarn build && yarn test
```

This will format the code with prettier, then build typescript into javascript, and finally run all tests on the built code.
If at any stage, any command fails, this will return an error.

### Post Checkout

When it comes to post checkout, the script that runs is very simple and direct. It will issue `yarn install` so that when you are changing branches, and if there are any new dependencies, those new dependencies will be installed.
