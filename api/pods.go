package api

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/api/core/v1"
	"github.com/gin-gonic/gin"
)

func GetPodsByNamespaces(c *gin.Context) {
	nameSpaceName := c.Query("namespace")

	result := []v1.Pod{}
	clientSet := GetK8sClient()
	pods, err := clientSet.CoreV1().Pods(nameSpaceName).List(metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}else{
		for _, pod := range pods.Items {
			result = append(result, pod)
		}
		c.JSON(200, result)
	}
}
