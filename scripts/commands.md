```shell

chmod +x scripts/git-flow-release.sh
chmod +x scripts/generate-schema.mjs

```

## git-flow-release.sh


```shell

scripts/git-flow-release.sh


```


## generate-schema.mj

```shell

node scripts/generate-schema.mjs


```

## remover remoto
```
git rm -r --cached scripts/
git commit -m "chore: remove scripts from tracking"
git push
```