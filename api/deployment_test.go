package api

import (
	"testing"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	//"k8s.io/apimachinery/pkg/runtime"
	"fmt"
)

func TestHelloWorld(t *testing.T) {
	clientset := GetK8sClient()
	restClient := clientset.AppsV1().RESTClient()
	result := restClient.Verb("GET").
	    Namespace("cmdb").
		Resource("deployments").
		Name("cmdb").
	    Do()
	bytes, _ := result.Raw()
	var obj unstructured.Unstructured
	obj.UnmarshalJSON(bytes)
	//outBytes, err := runtime.Encode(unstructured.UnstructuredJSONScheme, obj)

	fmt.Printf("%s", obj.Object["metadata"].(map[string]interface{})["name"])

	//result := GetDeployments("cmdb", "cmdb")
	//fmt.Println(result)
}
