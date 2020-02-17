package api

import (
	"testing"
	"fmt"
)

func TestHelloWorld(t *testing.T) {
	result, err := GetLogOfPod("cmdb", "cmdb-8579b8c555-w6nvm")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("%s", result)
}
