#!/bin/bash

sh ./.script/pre-install.sh

yarn install

sh ./.script/post-install.sh
