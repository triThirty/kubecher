# kubecher
k8s自动发布平台

## 在k8s集群外启动kubecher
复制k8s master节点/root/.kube/config文件到运行kubecher的机器的/root/.kube/目录下（没有该目录需手动创建）。

## 功能展示
选择工作namespace。
![选择namespaces.png](https://i.loli.net/2020/02/18/gz1lJPa7UHTFeon.png)

查看describe命令信息，所展示为`kubectl describe pod`命令所展示内容。
![查看pod describe.png](https://i.loli.net/2020/02/18/mNiVWPC4YjnUJ3Q.png)

查看pod运行日志。
![查看pod日志.png](https://i.loli.net/2020/02/18/EsHLgqF4UudXN2h.png)

通过键入yaml方式部署deployment。
![添加deployment.png](https://i.loli.net/2020/02/18/JHoVAw8mBtnChdy.png)
![添加deployment-2.png](https://i.loli.net/2020/02/18/Va1QYt2hDNJc57B.png)

也可以修改已有deployment的yaml内容，实现版本跟新。
![编辑deployment yaml.png](https://i.loli.net/2020/02/18/Sk7c1hpeMGVOP5W.png)
