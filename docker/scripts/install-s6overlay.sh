#!/bin/bash -e

TARGETPLATFORM=${1:-linux/amd64}
OUTPUT=${2:-/}
S6_OVERLAY_VERSION=3.1.5.0
S6_OVERLAY_ARCH=x86_64

if [ $TARGETPLATFORM = "linux/arm64" ]; then
	ARCH=aarch64
elif [ $TARGETPLATFORM = "linux/amd64" ]; then
	ARCH=x86_64
else
  echo "$TARGETPLATFORM PLATFORM NOT SUPPORTED"
  exit 1
fi

curl -fsSL "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" -o '/tmp/s6-overlay-noarch.tar.xz'
curl -fsSL "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_OVERLAY_ARCH}.tar.xz" -o "/tmp/s6-overlay-${S6_OVERLAY_ARCH}.tar.xz"
tar -C $OUTPUT -Jxpf "/tmp/s6-overlay-noarch.tar.xz"
tar -C $OUTPUT -Jxpf "/tmp/s6-overlay-${S6_OVERLAY_ARCH}.tar.xz"
