---
title: Connect Jupyter Notebook to remote Spark cluster
date: 2023-06-14 10:55:00 +0700
categories: [Big Data, Apache Spark]
tags: [Big data, Apache Spark, Jupyter Notebook]
math: true
mermaid: true
image:
  path: src/assets/img/thumbnail/apache-hadoop.png
---

## Preface
Các vấn đề gặp phải khi không sử dụng notebook
- SSH vào cụm Spark từ xa và sử dụng Spark-shell.
- Khó thay đổi  code và in kết quả 
- Khó để hiển thị hình ảnh/biểu đồ trên Spark-shell.
- Việc versioning control code gần như không thể

## Jupyter Notebook to remote Spark cluster
![](/assets/img/post/2023-06-14-Connect-Jupyter-Notebook-to-remote-Spark-cluster/1.png)
