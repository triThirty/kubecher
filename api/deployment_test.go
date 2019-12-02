package api

import (
	"testing"
	"kubecher/util"
)

func TestHelloWorld(t *testing.T) {
	//t.Log(GetDeployments("123"))
	//GetDeployments("cmdb")
	//GetDeployments("cmdb", "learn-nginx")
	result := string(util.Struct2JSON_Print(GetDeployments("cmdb", "cmdb")))
	t.Log(result)
	//t.Log("233")
}
