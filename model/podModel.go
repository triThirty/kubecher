package model

import (
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type Pod struct{
	metav1.TypeMeta `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec v1.PodSpec `json:"spec,omitempty"`
	Status v1.PodStatus `json:"status,omitempty"` 
}

