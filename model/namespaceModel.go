package model

type Namespace struct{
	Name string `json:"name"`
	Labels map[string]string `json:"labels,omitempty"`
	Annotations map[string]string `json:"annotations,omitempty"`
	Status string `json:"status,omitempty"`
}
