#!/usr/bin/env bash

gulp del

gulp copy

gulp compile-sass

gulp sprite

gulp minify-sprite

gulp inline-css

gulp minify-html

gulp del-css
