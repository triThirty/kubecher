function GetNamespaces() {
  return fetch("/api/namespace").then(response => response.json());
}

function GetPodsByNamespaces(namespace) {
  return fetch(`/api/pod?namespace=${namespace}`).then(response =>
    response.json()
  );
}

function GetDeploymentByNamespaces(namespace) {
  return fetch(`/api/deployment?namespace=${namespace}`).then(response =>
    response.json()
  );
}

// function fetchOps(method = "GET", headers = {}, body = {}) {
//   return {
//     method: method,
//     headers: headers,
//     body: JSON.stringify(body)
//   };
// }

export { GetNamespaces, GetPodsByNamespaces, GetDeploymentByNamespaces };
