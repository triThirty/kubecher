package api

import (
	"fmt"

	"k8s.io/apimachinery/pkg/util/sets"
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	describeversioned "k8s.io/kubectl/pkg/describe/versioned"
	"k8s.io/kubectl/pkg/describe"
)

func DescribeResource(namespace string, resourceType string, resourceName string) string {
	var result string
	tf, configFlags := GetReourceBuilder()
	r := tf.Unstructured().
	  ContinueOnError().
      NamespaceParam(namespace).DefaultNamespace().AllNamespaces(false).
      ResourceTypeOrNameArgs(true, []string{resourceType, resourceName}...).
      Flatten().
	  Do()

	infos, _ := r.Infos()

	errs := sets.NewString()
    allErrs := []error{}
    for _, info := range infos {
		mapping := info.ResourceMapping()
		factory := cmdutil.NewFactory(configFlags)
		describer, err := describeversioned.DescriberFn(factory, mapping)
		if err != nil {
		   if errs.Has(err.Error()) {
			   continue
		   }
           allErrs = append(allErrs, err)
           errs.Insert(err.Error())
           continue
		}
		result, err = describer.Describe(info.Namespace, info.Name, describe.DescriberSettings{ShowEvents: true})
		if err != nil {
			fmt.Println(err.Error())
    	    if errs.Has(err.Error()) {
			   continue
			}
			allErrs = append(allErrs, err)
			errs.Insert(err.Error())
    	    continue
    	}
	}
	return result
}
