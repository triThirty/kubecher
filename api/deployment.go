package api

import (
		"fmt"
		"strconv"
		"strings"

		"kubecher/model"

		"github.com/gin-gonic/gin"
		"k8s.io/client-go/kubernetes/typed/apps/v1"
		"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
		"k8s.io/apimachinery/pkg/runtime"
		appsv1 "k8s.io/api/apps/v1"
		metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
		corev1 "k8s.io/api/core/v1"
)


func GetDeployment(c *gin.Context){
	namespace := c.Query("namespace")
	deployment := c.Query("deployment")
	result := GetDeployments(namespace, deployment)
	c.JSON(200, result)
}


func UpdateDeployment(c *gin.Context){
	rawData, _ := c.GetRawData()
	var yaml unstructured.Unstructured
	err := yaml.UnmarshalJSON(rawData)
	if err != nil {
		panic(err.Error())
	}
	outBytes, err := runtime.Encode(unstructured.UnstructuredJSONScheme, &yaml)

	clientset := GetK8sClient()
	restClient := clientset.AppsV1().RESTClient()
	result := restClient.Verb("PUT").
		Namespace(yaml.Object["metadata"].(map[string]interface{})["namespace"].(string)).
		Resource("deployments").
		Name(yaml.Object["metadata"].(map[string]interface{})["name"].(string)).
		Body(outBytes).
		Do()

	if err := result.Error(); err != nil {
		panic(err.Error())
	}

	retBytes, err := result.Raw()
	if err != nil {
		panic(err.Error())
	}
	uncastObj, err := runtime.Decode(unstructured.UnstructuredJSONScheme, retBytes)
	if err != nil {
		panic(err.Error())
	}

	fmt.Printf("%s", uncastObj)
	c.JSON(200, nil)
}

func Deployment(c *gin.Context) {
	var deploymentArgs model.DeploymentArgs
	err := c.BindJSON(&deploymentArgs)
	if err != nil {
		panic(err.Error())
	}else{
		deploymentClient := getDeploymentClient(deploymentArgs.Namespace) //获取client
		existDeploy := GetDeployments(deploymentArgs.Namespace, deploymentArgs.Appname)
		if len(existDeploy) != 0 {
			c.String(200, fmt.Sprintf("Deployment %s already exists in %s namespace", deploymentArgs.Appname, deploymentArgs.Namespace))
		}else{
			deploy := create_deploytment(deploymentArgs)  //创建deplyment yaml
			result, err := deploymentClient.Create(deploy)
			if err != nil {
				panic(err)
			}
			c.String(200, result.GetObjectMeta().GetName())

		}
	}
}


//获取集群内指定namespace下的deployment资源，
//如果要获取全部deployment，参数传递空字符串""
func GetDeployments (namespace string, deployName string) []appsv1.Deployment {
	clientSet := GetK8sClient()
	deployments := clientSet.AppsV1().Deployments(namespace)
	if deployName == "" {
		deploymentList,_ := deployments.List(metav1.ListOptions{})
		return deploymentList.Items
	}else{

		restClient := clientSet.AppsV1().RESTClient()
		result := restClient.Verb("GET").
			Namespace(namespace).
			Resource("deployments").
			Name(deployName).
			Do()
		bytes, _ := result.Raw()
		var deploymentObj unstructured.Unstructured
		deploymentObj.UnmarshalJSON(bytes)

		deployment, _ := deployments.Get(deployName, metav1.GetOptions{})
		deployment.Kind = deploymentObj.Object["kind"].(string)
		deployment.APIVersion = deploymentObj.Object["apiVersion"].(string)
		return []appsv1.Deployment{*deployment}
	}
	return []appsv1.Deployment{}
}


func getDeploymentClient(namespace string) v1.DeploymentInterface {
		clientSet := GetK8sClient()
		deploymentClient := clientSet.AppsV1().Deployments(namespace)
		return deploymentClient
}

func create_deploytment(deploymentArgs model.DeploymentArgs) *appsv1.Deployment {
		_, volumes := getTemplateSpecContainersVolumeMount(deploymentArgs)
		deploy := &appsv1.Deployment{
				ObjectMeta: metav1.ObjectMeta{
					Name: deploymentArgs.Appname,
					Namespace: deploymentArgs.Namespace,
					Labels: deploymentArgs.Labels,
				},
				Spec: appsv1.DeploymentSpec{
						Replicas: int32Ptr2(1),
						Selector: &metav1.LabelSelector{
									MatchLabels: map[string]string{"cmdb":"enable"},
								},
						Template: corev1.PodTemplateSpec{
								ObjectMeta: metav1.ObjectMeta{
										Labels: deploymentArgs.Labels,
								},
								Spec: corev1.PodSpec{
										ImagePullSecrets: getTemplateSpecImagePullSecrets(deploymentArgs),
										Containers: getTemplateSpecContainers(deploymentArgs),
										Volumes: volumes,
								},
						},
				},
		}
		return deploy
}

func int32Ptr2(i int32) *int32 { return &i }

func getTemplateSpecContainers(deploymentArgs model.DeploymentArgs) []corev1.Container {
	containers := []corev1.Container{}
	container := new(corev1.Container)
	container.Name = deploymentArgs.Appname
	container.Image = deploymentArgs.Image
	container.Command = deploymentArgs.Command
	container.Args = deploymentArgs.Args
	container.Ports = getTemplateSpecContainersPorts(deploymentArgs)
	container.Env = getTemplateSpecContainersEnv(deploymentArgs)
	volumeMounts, _ := getTemplateSpecContainersVolumeMount(deploymentArgs)
	container.VolumeMounts = volumeMounts
	containers = append(containers, *container)
	return containers
}

func getTemplateSpecImagePullSecrets(deploymentArgs model.DeploymentArgs) []corev1.LocalObjectReference {
	secrets := []corev1.LocalObjectReference{}
	secret := new(corev1.LocalObjectReference)
	secret.Name = "registry-secret"
	secrets = append(secrets, *secret)
	return secrets
}

func getTemplateSpecContainersEnv(deploymentArgs model.DeploymentArgs) []corev1.EnvVar {
	env := []corev1.EnvVar{}
	if deploymentArgs.Env == nil {
		return env
	}else{
		for _, v := range deploymentArgs.Env {
			envVar := new(corev1.EnvVar)
			envVar.Name = v["name"]
			envVar.Value= v["value"]
			env = append(env, *envVar)
		}
		return env
	}
}

func getTemplateSpecContainersVolumeMount(deploymentArgs model.DeploymentArgs) ([]corev1.VolumeMount, []corev1.Volume) {
	valumeMounts := []corev1.VolumeMount{}
	valumes := []corev1.Volume{}
	if deploymentArgs.Volumemounts == nil {
		return valumeMounts, valumes  
	}else{
		for _, v := range deploymentArgs.Volumemounts {
			volumeMount := new(corev1.VolumeMount)
			volumeSource := new(corev1.VolumeSource)
			volume:= new(corev1.Volume)
			hostPathVolumeSource:= new(corev1.HostPathVolumeSource)
			args := strings.Split(v["path"], ":")
			volumeMount.Name = v["name"]
			volumeMount.MountPath = args[0]
			hostPathVolumeSource.Path = args[1]
			volumeSource.HostPath = hostPathVolumeSource
			volume.Name = v["name"]
			volume.VolumeSource = *volumeSource
			valumeMounts = append(valumeMounts, *volumeMount)
			valumes = append(valumes, *volume)
		}
		return valumeMounts, valumes
	}
}

func getTemplateSpecContainersPorts(deploymentArgs model.DeploymentArgs) []corev1.ContainerPort {
	ports := []corev1.ContainerPort{}
	for _, v := range deploymentArgs.ContainerPort{
		port := new(corev1.ContainerPort)
		containerPort, err := strconv.ParseInt(v, 10, 32)
		if err != nil {
			panic(err.Error())
		}
		port.ContainerPort = int32(containerPort)
		ports = append(ports, *port)
	}
	return ports
}
