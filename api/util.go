package api

import (
	"io"
	"fmt"
	"time"
	"bufio"
	"regexp"
	"bytes"

	"k8s.io/client-go/rest"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/apimachinery/pkg/util/sets"
	"k8s.io/kubectl/pkg/polymorphichelpers"
	corev1 "k8s.io/api/core/v1"
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	describeversioned "k8s.io/kubectl/pkg/describe/versioned"
	"k8s.io/kubectl/pkg/describe"
	"k8s.io/kubectl/pkg/scheme"
)

type prefixingWriter struct {
	prefix []byte
	writer io.Writer
}

type LogsOptions struct {
	Namespace     string
	ResourceArg   string
	AllContainers bool
	Options       runtime.Object
	Resources     []string

	ConsumeRequestFn func(rest.ResponseWrapper, io.Writer) error

	// PodLogOptions
	SinceTime                    string
	SinceSeconds                 time.Duration
	Follow                       bool
	Previous                     bool
	Timestamps                   bool
	IgnoreLogErrors              bool
	LimitBytes                   int64
	Tail                         int64
	Container                    string
	InsecureSkipTLSVerifyBackend bool

	// whether or not a container name was given via --container
	ContainerNameSpecified bool
	Selector               string
	MaxFollowConcurrency   int
	Prefix                 bool

	Object           runtime.Object
	GetPodTimeout    time.Duration
	RESTClientGetter genericclioptions.RESTClientGetter
	LogsForObject    polymorphichelpers.LogsForObjectFunc

	genericclioptions.IOStreams

	TailSpecified bool

	containerNameFromRefSpecRegexp *regexp.Regexp
}

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

func NewLogsOptions(streams genericclioptions.IOStreams, allContainers bool) *LogsOptions {
	return &LogsOptions{
		IOStreams:            streams,
		AllContainers:        allContainers,
		Tail:                 -1,
		MaxFollowConcurrency: 5,

		containerNameFromRefSpecRegexp: regexp.MustCompile(`spec\.(?:initContainers|containers|ephemeralContainers){(.+)}`),
	}
}



func GetLogOfPod(namespace string, podName string) (logs string, err error) {
	logBuffer := bytes.NewBuffer(make([]byte, 0))

	tf, configFlags := GetReourceBuilder()
	builder := tf.WithScheme(scheme.Scheme, scheme.Scheme.PrioritizedVersionsAllGroups()...).
			NamespaceParam(namespace).DefaultNamespace().
			SingleResourceType()
	builder.ResourceNames("pods", podName)
	infos, err := builder.Do().Infos()
	if err != nil {
		fmt.Println(err)
	}
	objInfo:= infos[0].Object
	LogsForObject := polymorphichelpers.LogsForObjectFn
	getPodTimeout := 2*time.Minute
	logOptions := &corev1.PodLogOptions{
		Follow:						  false,
		Timestamps:                   false,
	}
	requests, err := LogsForObject(configFlags, objInfo, logOptions, getPodTimeout, true)
	if err != nil {
		return "", err
	}

	for _, request  := range requests {
		readCloser, err := request.Stream()
		if err != nil {
			return "", err
		}
		defer readCloser.Close()

		r := bufio.NewReader(readCloser)
		r.WriteTo(logBuffer)
		result := fmt.Sprintf("%s", logBuffer)
		return result, nil
	}
	return "", nil
}
