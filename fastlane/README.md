fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios develop

```sh
[bundle exec] fastlane ios develop
```

Upload a new build to TestFlight (development server)

### ios release

```sh
[bundle exec] fastlane ios release
```

Push a new release build to the App Store (production server)

----


## Android

### android dev

```sh
[bundle exec] fastlane android dev
```

Deploy a development build to local device

### android release

```sh
[bundle exec] fastlane android release
```

Build release aab and upload to internal track

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
