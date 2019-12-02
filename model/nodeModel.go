package model 



type Node struct {
		IP string
		Hostname string 
		Status string
		KubeVersion string
		OS string
		CPU string
		Disk string
		Menmory string
		Labels map[string]string
}
