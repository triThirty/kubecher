package api 

import (
		
		"kubecher/model"

		metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
		"github.com/gin-gonic/gin"
		"k8s.io/api/core/v1"
)



func GetNodeList(c *gin.Context) {
	result := []*model.Node{}

	clientSet := GetK8sClient()

	nodes, err := clientSet.CoreV1().Nodes().List(metav1.ListOptions{})
	if err != nil {
			panic(err.Error())
	}
	for _, node := range nodes.Items {
			nodeInfo := new(model.Node)
			nodeInfo.IP = getNodeIP(&node)
			nodeInfo.Hostname = getNodeHostname(&node)
			nodeInfo.Status = getNodeStatus(&node)
			nodeInfo.OS = getNodeOS(&node)
			nodeInfo.Labels = getNodeLabels(&node)
			result = append(result, nodeInfo)
	}
	c.JSON(200, result)
}



func getNodeIP(node *v1.Node) string {
		return node.Status.Addresses[0].Address
}

func getNodeHostname(node *v1.Node) string {
		return node.Status.Addresses[1].Address
}

func getNodeStatus(node *v1.Node) string {
		return string(node.Status.Conditions[3].Status)
}

func getNodeOS(node *v1.Node) string {
		return node.Status.NodeInfo.OSImage
}

func getNodeLabels(node *v1.Node) map[string]string {
		return node.Labels
}
