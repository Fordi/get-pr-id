# Get PR ID

Get the PR ID for the current branch, along with the base ref.

## Usage

You can now validate the action by referencing it in a workflow file. For
example, [`ci.yml`](./.github/workflows/ci.yml) demonstrates how to reference an
action in the same repository.

```yaml
steps:
  - uses: @fordi/get-pr-id
    id: pr
    with:
      token: ${{ secrets.GITHUB_TOKEN }}

  - name: Print Output
    run: |
      echo ID: "${{ steps.pr.outputs.id }}"
      echo Base: "${{ steps.pr.outputs.base }}"
      echo Branch: "${{ steps.pr.outputs.branch }}"
      
```
