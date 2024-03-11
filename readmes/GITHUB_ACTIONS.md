## Github Action - format-lint-test-build

Currently there is one GitHub Action setup that automatically runs in the following scenarios:

1. When a new commit is pushed to the `master` branch.
1. When a new pull request is created to be merged on the `master` branch.

```yml
# Controls when the action will run.
on:
    # Triggers the workflow on push or pull request events but only for the master branch
    push:
        branches: [master]
    pull_request:
        branches: [master]
```

All actions are run on the latest ubuntu image.

```yml
runs-on: ubuntu-latest
```

The aforementioned GitHub Action will the following (in order):

-   Setup the node environment on node 18 and checkout the latest code.

```yml
- uses: actions/checkout@v3
- name: Use Node.js 18.x
    uses: actions/setup-node@v3
    with:
        node-version: 18.x
```

-   Install all dependencies (using yarn).

```yml
- name: clean install
    run: yarn install --immutable --immutable-cache --check-cache
```

-   Format the entire codebase.

```yml
- name: format
    run: yarn format
```

-   Lint the entire codebase.

```yml
- name: lint
    run: yarn lint
```

-   Run all the tests on the code.

```yml
- name: test
    run: yarn test
```

-   Build the typescript code into javascript.

```yml
- name: build
    run: yarn build
```
