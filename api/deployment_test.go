package api

import (
	"testing"
	//"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	//"k8s.io/cli-runtime/pkg/resource"
	cmdtesting "k8s.io/kubectl/pkg/cmd/testing"
	describeversioned "k8s.io/kubectl/pkg/describe/versioned"
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	"k8s.io/kubectl/pkg/describe"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/util/sets"
	"fmt"
	"os"
)


func GetDescriber(mapping *meta.RESTMapping, f cmdutil.Factory) (describe.Describer, error) {
	return describeversioned.DescriberFn(f, mapping)
}


func TestHelloWorld(t *testing.T) {
	clientset := GetK8sClient()
	restClient := clientset.AppsV1().RESTClient()
	//result := restClient.Verb("GET").
	//    Namespace("cmdb").
	//	Resource("deployments").
	//	Name("cmdb").
	//    Do()

	
	tf := cmdtesting.NewTestFactory().WithNamespace("non-default")
	defer tf.Cleanup()
	//_, _, codec := cmdtesting.NewExternalScheme()

	tf.UnstructuredClient = restClient
	//a := tf.NewBuilder()
	

	r := tf.NewBuilder().
		Unstructured().
		ContinueOnError().
		NamespaceParam("weave").DefaultNamespace().AllNamespaces(false).
		//FilenameParam(false, o.FilenameOptions).
		//LabelSelectorParam(o.Selector).
		//IncludeUninitialized(o.IncludeUninitialized).
		ResourceTypeOrNameArgs(true, []string{"deployment","weave-scope-app"}...).
		Flatten().
		Do()

	infos, _ := r.Infos()
	//fmt.Println(infos)

	errs := sets.NewString()
	allErrs := []error{}
	for _, info := range infos {
		mapping := info.ResourceMapping()
		describer, err := GetDescriber(mapping, tf)
		fmt.Println(describer)
		if err != nil {
			if errs.Has(err.Error()) {
				continue
			}
			allErrs = append(allErrs, err)
			errs.Insert(err.Error())
			continue
		}
		s, err := describer.Describe(info.Namespace, info.Name, describe.DescriberSettings{ShowEvents: true})
		if err != nil {
			//fmt.Println(err.Error())
			if errs.Has(err.Error()) {
				continue
			}
			allErrs = append(allErrs, err)
			errs.Insert(err.Error())
			continue
		}
		fmt.Fprintf(os.Stderr, "\n\n%s", s)
		fmt.Printf("\n\n%s", s)
	}


	//bytes, _ := result.Raw()
	//var obj unstructured.Unstructured
	//obj.UnmarshalJSON(bytes)
	//outBytes, err := runtime.Encode(unstructured.UnstructuredJSONScheme, obj)
	//fmt.Printf("%s", obj.Object["metadata"].(map[string]interface{})["name"])
	//result := GetDeployments("cmdb", "cmdb")
	//fmt.Println(result)
}
