# POKER ANALYTICS

## REQUISITI

- NodeJS
    - electron
    - nodemon

### SETUP RASPBERRY

- git init --bare nome-repo.git
- `hooks/post-receive.sh`

```bash
#!/bin/sh
ssh anemo@PC-112358 "cd /d/raspsync/vscontainer/nodejs-poker-analytics && git pull"
```