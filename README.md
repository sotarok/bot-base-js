bot-base-js
===========

This is a skeleton to make JS based slack bot running on GKE.


Requires:

- Node.js, NPM
- `docker` command
- `gcloud` command
- `kubectl` command

## How to develop and deploy?

_Please replace `your-super-bot` to actual bot name._

### Initialize

Clone into your bot and run `init`.

```
git clone github.com:sotarok/bot-base-js.git ./your-super-bot
cd your-super-bot
make init
```

`make init` replaces the scripts with your GCP Project name and bot name you decided.

### Development

Implement your bot.

```
edit index.js
```

Also edit Dockerfile, Makefile, kubernetes/bot.ymal if it's needed.

### Build

```
make build-image
```

Edit the version in package.json if you want to update package version.

### Set up clusters

To create container cluster for your bot, run following

```
gcloud container clusters create your-super-bot
```

Set up your `SLACK_TOKEN` into kubernetes secret.

```
kubectl create secret generic slack-token --from-literal=token='xoxb-...your-token'
```

### Deploy

```
edit kubernetes/bot.yaml # => update image tag
make deploy
```

## Author

- sotarok: Sotaro KARASAWA <sotaro.k@gmail.com>

## License

The MIT License (MIT)
See LICENSE file.
