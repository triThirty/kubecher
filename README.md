# kubecher
k8s自动发布平台

## 在k8s集群外启动kubecher
复制k8s master节点/root/.kube/config文件到运行kubecher的机器的/root/.kube/目录下（没有该目录需手动创建）。

## 调用部署deployment接口方法

url:/deployment
method:post
body:
```json
{
    "appname": "learn-nginx",
    "version": "1",
    "replicas": "1",
    "namespace": "cmdb",
    "image": "nginx:1.2",
    "command": [],
    "args": [],
    "lebel":{"cmdb":"enable"},
    "containerPort": [
        "80"
    ],
    "volumeMounts": [{"name":"docker", "path":"/var/run/docker.sock:/var/run/docker.sock"}, {"name":"log", "path":"/opt/app_logs:/opt/app_logs"}],
    "env": [
        {
            "name": "HTTP_PASS",
            "value": "ops"
        },
        {
            "name": "HTTP_USER",
            "value": "ops"
        }
    ],
    "healthCheckURL": ""
}
```
