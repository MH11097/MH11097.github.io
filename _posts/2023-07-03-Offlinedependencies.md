---
title: Offline dependencies
date: 2023-07-03 13:55:00 +0700
categories: [OS, Linux, Centos]
tags: [OS, Linux, Centos]
math: true
mermaid: true
---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#red-hat-based">Red Hat-based</a></li>
    <li><a href="#debian-based">Debian-based</a></li>
    <li><a href="#references">References</a></li>
  </ol>
</details>

# Red Hat-based
- On a Linux server with a network connection:
  ```sh
  yum install yum-plugin-downloadonly yum-utils createrepo
  ```

- Download the <package-name> RPMs and all needed dependencies (ex: `releasever` would be 7 for CentOS 7, so on...):
  ```sh
  yum install --downloadonly --installroot=/var/tmp/<package-name>-installroot --releasever=7 --downloaddir=/var/tmp/<package-name> <package-name>
  ```

- Generate the metadata needed to turn all of RPMs into a YUM repo:
  ```sh
  createrepo --database /var/tmp/<package-name>
  ```

- Create local repo `vi /etc/yum.repos.d/offline-<package-name>.repo`
  ```sh
  [offline-<package-name>]
  name=<package-name>
  baseurl=file:///var/tmp/<package-name>
  enabled=0
  gpgcheck=0
  #gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
  ```

- Check the missing dependencies:
  ```sh
  repoclosure --repoid=offline-<package-name>
  ```

- Copy the `/var/tmp/<package-name>` repo directory to the other server set up the repo there:
  ```sh
  [offline-<package-name>]
  name=<package-name>
  baseurl=file:///var/tmp/<package-name>
  enabled=0
  gpgcheck=0
  #gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
  ```

- Perform offline install:
  ```sh
  yum --disablerepo=* --enablerepo=<package-name> install <package-name>
  ```

# Debian-based

# References
- https://unix.stackexchange.com/questions/259640/how-to-use-yum-to-get-all-rpms-required-for-offline-use
