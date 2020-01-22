package api

import (
	"testing"
	"fmt"
)

func TestHelloWorld(t *testing.T) {
	result := GetDescribeDeployments("weave", "weave-scope-app")
	fmt.Printf("%s",result)
}
