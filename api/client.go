package api

import (
		"flag"
		"path/filepath"
		"os"
		"sync"
		//"fmt"
		
		"k8s.io/client-go/kubernetes"
		"k8s.io/client-go/tools/clientcmd"
		"k8s.io/client-go/rest"
		"k8s.io/cli-runtime/pkg/resource"
		"k8s.io/cli-runtime/pkg/genericclioptions"
)


var clientSet *kubernetes.Clientset
var configA rest.Config
var resourceBuilder *resource.Builder
var configFlags *genericclioptions.ConfigFlags
var oSingle sync.Once

//单例模式实现kubernetes客户端对象
func GetK8sClient() (*kubernetes.Clientset, rest.Config) {
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
					configA = *config
			})
		return clientSet, configA
}


func GetReourceBuilder() (*resource.Builder, *genericclioptions.ConfigFlags) {
	_, config := GetK8sClient()
	configFlags := genericclioptions.NewConfigFlags(true)
	configFlags.APIServer = &(config.Host)
	configFlags.BearerToken = &(config.BearerToken)
	configFlags.Impersonate = &(config.Impersonate.UserName)
	configFlags.ImpersonateGroup = &(config.Impersonate.Groups)
	resourceBuilder = resource.NewBuilder(configFlags)
	return resourceBuilder, configFlags
}


func homeDir() string {
		if h := os.Getenv("HOME"); h != "" {
				return h
		}
		return os.Getenv("USERPROFILE") // windows
}
