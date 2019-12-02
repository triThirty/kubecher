package api

import (
		"flag"
		"path/filepath"
		"os"
		"sync"
		
		"k8s.io/client-go/kubernetes"
		"k8s.io/client-go/tools/clientcmd"
)


var clientSet *kubernetes.Clientset
var oSingle sync.Once

//单例模式实现kubernetes客户端对象
func GetK8sClient() *kubernetes.Clientset {
		oSingle.Do(
			func(){
					var kubeconfig *string
					if home := homeDir(); home != "" {
							kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
					} else {
							kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
					}
					flag.Parse()
					
					config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
					if err != nil {
							panic(err.Error())
					}
					
					clientSet, err = kubernetes.NewForConfig(config)
					if err != nil {
							panic(err.Error())
					}
			})
		return clientSet
}


func homeDir() string {
		if h := os.Getenv("HOME"); h != "" {
				return h
		}
		return os.Getenv("USERPROFILE") // windows
}
