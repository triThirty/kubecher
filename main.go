package main

import (
		"github.com/gin-gonic/gin"

		"kubecher/api"
)
func main() {	
		// Creates a gin router with default middleware:
		// logger and recovery (crash-free) middleware
		router := gin.Default()
		
		router.GET("api/node", api.GetNodeList)
		router.GET("api/namespace", api.GetNamespacesList)
		router.GET("api/deployment", api.GetDeployment)
		router.POST("api/deployment", api.Deployment)
		router.GET("api/pod", api.GetPodsByNamespaces)
		//router.DELETE("/someDelete", deleting)
		//router.PATCH("/somePatch", patching)
		//router.HEAD("/someHead", head)
		//router.OPTIONS("/someOptions", options)
		
		router.Run(":8090")
}
