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

## Example usage

```yaml
uses: Chesire/okami-action@v2
with:
  okami-token: ${{ secrets.GITHUB_TOKEN }}
  animal-type: "shiba"
```

## Development

Run `ncc build index.js --license licenses.txt` before commiting files.
