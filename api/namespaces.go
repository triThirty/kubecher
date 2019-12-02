package api

import (
		"kubecher/model"

		metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
		"github.com/gin-gonic/gin"
		"k8s.io/api/core/v1"
)

func GetNamespacesList(c *gin.Context) {

		result := []*model.Namespace{}

		clientSet := GetK8sClient()
		namespaces, err := clientSet.CoreV1().Namespaces().List(metav1.ListOptions{})
		if err != nil {
				panic(err.Error())
		}

		for _, namespace := range namespaces.Items {
				namespaceInfo := new(model.Namespace)
				namespaceInfo.Name = getNamespaceName(&namespace)	
				namespaceInfo.Labels = getNamespaceLabels(&namespace)	
				namespaceInfo.Annotations = getNamespaceAnnotations(&namespace)	
				namespaceInfo.Status = getNamespaceStatus(&namespace)	
				result = append(result, namespaceInfo)
		}
		c.JSON(200, result)
}


func getNamespaceName(namespace *v1.Namespace) string {
		return namespace.ObjectMeta.Name
}

func getNamespaceLabels(namespace *v1.Namespace) map[string]string {
		return namespace.ObjectMeta.Labels
}

func getNamespaceAnnotations(namespace *v1.Namespace) map[string]string {
		return namespace.ObjectMeta.Annotations
}

func getNamespaceStatus(namespace *v1.Namespace) string {
		return string(namespace.Status.Phase)
}
