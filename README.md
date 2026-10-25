# Intro

A personal resume website for [@Cnily03](https://github.com/Cnily03).

## Run

```sh
pnpm install
cp config.example.yaml config.yaml
pnpm dev
```

## Configuration

See [config.example.yaml](config.example.yaml) for supported fields. Copy it to the ignored `config.yaml` and add your own values. Empty values hide their corresponding items.

## Build

Builds use `config.yaml` by default. Set `SITE_CONFIG` to a local YAML file or an `http:` or `https:` URL.

Configured Chinese registration links are included unless `HIDE_CN_BEIAN=1` is set.

```bash
pnpm build
SITE_CONFIG=another-config.yaml pnpm build
SITE_CONFIG=https://example.com/config.yaml pnpm build
HIDE_CN_BEIAN=1 pnpm build
```

## License

(c) Copyright Cnily03. All rights reserved.

Licensed under the [MIT License](LICENSE).

Licenses and notices for third-party resources are in [licenses/](licenses/).
