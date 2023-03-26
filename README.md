# Secret to File GitHub Action

GitHub doesn't allow storing files as secrets. But files like certificates or 3rd party license files are often needed during the build process. 
And instead of saving it publically in the repository, it should be stored as a secret.
This action allows storing the content of a file as a base64 secret and writing it to a file during the build process. 

The content of the file has to be base64 encoded.

## Encoding a file

macOS:
```bash
base64 -i <file> -o <file>.base64
```

Linux:
```bash
base64 <file> > <file>.base64
```

## Usage

Create a secret, e.g. like `FILE_CONTENT` in the screenshot, and add the base64 content of the file as value.

![Create secret](./docs/create-secret.png)

And use the action in your workflow:

```yaml
on: [push]

jobs:
  main:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Flutter SDK
        uses: mobiledevops/secret-to-file-action@v1
        with:
          base64-encoded-secret: ${{ secrets.FILE_CONTENT }}
          filename: "hello-world.sh"
          is-executable: true
          working-directory: "./a/b/c"
      - run: ./a/b/c/hello-world.sh
```
