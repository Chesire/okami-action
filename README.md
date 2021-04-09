# okami-action

This action adds a random image of an animal to your PR every time it is run.

## Inputs

### `okami-token`

**Required** Token with access to post on the PR.

### `animal-type`

The animal type to post a picture of.
Choices are:

- `shiba`
- `cat`
- `bird`
- `fox`
- `dog`

Defaults to `shiba`

### `update-image`

Flag to denote if a single image should be updated on each execution of the action, or a new image posted each time.

- If set to `true`, then a single comment will be created, then updated each time.
- If set to `false`, then a new comment will be created each time.

Defaults to `true`

## Example usage

```yaml
uses: Chesire/okami-action@v2.1
with:
  okami-token: ${{ secrets.GITHUB_TOKEN }}
  animal-type: "shiba"
  update-image: true
```
