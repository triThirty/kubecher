package model

type Namespace struct{
		Name string
		Labels map[string]string
		Annotations map[string]string
		Status string
}
