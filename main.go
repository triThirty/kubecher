package main

import (
		"github.com/gin-gonic/gin"

		"kubecher/api"
)
func main() {	
		// Creates a gin router with default middleware:
		// logger and recovery (crash-free) middleware
		router := gin.Default()
		
		router.GET("/node", api.GetNodeList)
		router.GET("/namespace", api.GetNamespacesList)
		router.POST("/deployment", api.Deployment)
		//router.PUT("/somePut", putting)
		//router.DELETE("/someDelete", deleting)
		//router.PATCH("/somePatch", patching)
		//router.HEAD("/someHead", head)
		//router.OPTIONS("/someOptions", options)
		
		router.Run(":8090")
}
