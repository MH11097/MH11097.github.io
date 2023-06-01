---
title: 1. Cài đặt Hadoop cluster
date: 2023-06-01 10:55:00 +0700
categories: [Big Data, Apache Hadoop]
tags: [Big data, Apache Hadoop]
math: true
mermaid: true
image:
  path: assets/img/thumnail/apache-hadoop.png
  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## INSTALL HADOOP
### Prerequisites
### Installation
Cài đặt cụm hadoop với 2 namenodes và 5 datanodes
Giả sử cụm IP là 10.10.2.1, 10.10.2.2, …, 10.10.2.7

#### Step 0 - Cấu hình hosts (Trên tất cả các nodes)
Đổi hostname của từng node thành tên phù hợp, ví dụ:

```console
hostnamectl set-hostname <tên của node>
```

Thường sẽ đặt theo mục đích ( namenode1, namenode2, datanode1, datanode2, … ).

Khai báo các hostname trong cụm:
```shell
vi /etc/hosts
```

Thêm các dòng sau
```shell
10.10.2.1	namenode1
10.10.2.2	namenode2
10.10.2.3	datanode1
10.10.2.4	datanode2
10.10.2.5	datanode3
10.10.2.6	datanode4
10.10.2.7	datanode5
```

#### Step 1 – Disable SELinux
```shell
vi /etc/selinux/config
```

Thay đổi dòng sau
```shell
SELINUX=disabled
```

Restart your system to apply the SELinux changes.

#### Step 2 – Install Java
Hadoop is written in Java and supports only Java version 8. You can install OpenJDK 8 and ant using DNF command as shown below:
```shell
sudo yum install java-1.8.0-openjdk-devel
```

Add environment variable
```shell
vi ~/.bashrc
```

Add these lines
```shell
export JAVA_HOME=/usr/jdk64/<versionJAVA>
export PATH=$JAVA_HOME/bin:$PATH
```

Save and run this command
```shell
source ~/.bashrc
```

Once installed, verify the installed version of Java with the following command:
```shell
java -version
```

You should get the following output:
```shell
openjdk version "1.8.0_232"
OpenJDK Runtime Environment (build 1.8.0_232-b09)
OpenJDK 64-Bit Server VM (build 25.232-b09, mixed mode)
```

#### Step 3 – Create a Hadoop User
```shell
useradd hadoop
```

Next, set the password for this user with the following command:
```shell
passwd hadoop
```

#### Step 4 – Install Hadoop
First, change the user to hadoop with the following command:
```shell
su - hadoop
mkdir /home/hadoop/hadoop
cd /home/hadoop/hadoop
```
Next, download the latest version of Hadoop using the wget command:
```shell
wget http://apachemirror.wuchna.com/hadoop/common/hadoop-3.2.1/hadoop-3.2.1.tar.gz
```

Once downloaded, extract the downloaded file:
```shell
tar -xvzf hadoop-3.2.1.tar.gz
```

Next, you will need to configure Hadoop Environment Variables on your system.
```shell
vi ~/.bashrc
```

Append the following lines:
```shell
export JAVA_HOME=/usr/jdk64/<versionJAVA>
export HADOOP_HOME=/home/hadoop/hadoop
export HADOOP_INSTALL=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib/native"
```

Save and close the file. Then, activate the environment variables with the following command:
```shell
source ~/.bashrc
```

Next, open the Hadoop environment variable file:
```shell
vi $HADOOP_HOME/etc/hadoop/hadoop-env.sh
```

Update the JAVA_HOME variable as per your Java installation path:
```shell
export JAVA_HOME=/usr/jdk64/<versionJAVA>
```

Save and close the file when you are finished.
#### Step 5 – Configure Hadoop
First, you will need to create the namenode and datanode directories inside Hadoop home directory:
Run the following command to create both directories:
```shell
mkdir -p ~/hadoopdata/hdfs/namenode
mkdir -p ~/hadoopdata/hdfs/datanode
```

Next, edit the core-site.xml file and update with your system hostname:
```shell
vi $HADOOP_HOME/etc/hadoop/core-site.xml
```

Change the following name as per your system hostname:
```shell
<configuration>
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://namenode1:9000</value>
  </property>
</configuration>
```

Save and close the file. Then, edit the hdfs-site.xml file:
```shell
vi $HADOOP_HOME/etc/hadoop/hdfs-site.xml
```

Change the NameNode and DataNode directory path as shown below:
```shell
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>3</value>
  </property>
  
  <property>
    <name>dfs.name.dir</name>
    <value>/home/hadoop/hadoopdata/hdfs/namenode</value>
  </property>
  
  <property>
    <name>dfs.data.dir</name>
    <value>/home/hadoop/hadoopdata/hdfs/datanode</value>
  </property>
</configuration>
```

Save and close the file. Then, edit the mapred-site.xml file:
```shell
vi $HADOOP_HOME/etc/hadoop/mapred-site.xml
```

Make the following changes:
```shell
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
</configuration>
```
Save and close the file. Then, edit the yarn-site.xml file:
```shell
vi $HADOOP_HOME/etc/hadoop/yarn-site.xml
```

Make the following changes:
```shell
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
</configuration>
```

Save and close the file when you are finished.
#### Step 6 – Start Hadoop Cluster
Before starting the Hadoop cluster. You will need to format the Namenode as a hadoop user.
Run the following command to format the hadoop Namenode:
```shell
hdfs namenode -format
```

You should get the following output:
```shell
2020-02-05 03:10:40,380 INFO namenode.NNStorageRetentionManager: Going to retain 1 images with txid >= 0
2020-02-05 03:10:40,389 INFO namenode.FSImage: FSImageSaver clean checkpoint: txid=0 when meet shutdown.
2020-02-05 03:10:40,389 INFO namenode.NameNode: SHUTDOWN_MSG:
/************************************************************
SHUTDOWN_MSG: Shutting down NameNode at hadoop.tecadmin.com/45.58.38.202
************************************************************/
```

After formating the Namenode, run the following command to start the hadoop cluster:
```shell
start-dfs.sh
```

Once the HDFS started successfully, you should get the following output:
```shell
Starting namenodes on
Warning: Permanently added ',fe80::200:2dff:fe3a:26ca%eth0' (ECDSA) to the list of known hosts.
Starting datanodes
Starting secondary namenodes []
```

Next, start the YARN service as shown below:
```
start-yarn.sh
```

