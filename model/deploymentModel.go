package model


type DeploymentArgs struct{
	Appname string `json:"appname"`
	Version string `json:"version"`
	Replicas string `json:"replicas"`
	Namespace string `json:"namespace"`
	Image string `json:"image"`
	Command []string `json:"command"`
	Args []string `json:"args"`
	ContainerPort []string `json:"containerPort"`
	HealthCheckURL string `json:"healthCheckURL"`
	Volumemounts []map[string]string `json:"volumeMounts"`
	Env []map[string]string `json:"env"`
	Labels map[string]string `json:"lebel"`
}



//type Deployment struct{
//	Name string `json:"appname"`
//	Namespace string `json:"namespace"`
//	Labels map[string]string `json:"lebel"`
//	Replicas string `json:"replicas"`
//}
