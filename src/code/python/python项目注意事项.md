---
title: Python 注意事项
icon: python
---

## vscode 虚拟环境

pip 默认存放在 python / lib / site-packages 下，并且不能下载同一个包的不同版本，因此需要虚拟环境

- 创建虚拟环境（通常命名为 .venv）

  ```
  python3.12 -m venv .venv
  ```

  在该文件夹下创建一个名为 venv 文件夹的虚拟环境

## Anaconda 使用

创建环境

```
conda create -n name python=3.10
```

