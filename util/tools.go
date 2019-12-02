package util

import (
	//"fmt"
	"encoding/json"
)

func Struct2JSON_Print(v interface{}) []byte {
	res2B, _ := json.Marshal(v)
	return res2B
	//fmt.Println(string(res2B))
}

