function GetNamespaces() {
  return fetch("/api/namespace").then(response => response.json());
}

function GetPodsByNamespaces(namespace) {
  return fetch(`/api/pod?namespace=${namespace}`).then(response =>
    response.json()
  );
}

function GetDeploymentByNamespace(namespace, deployment) {
  return fetch(
    `/api/deployment?namespace=${namespace}&deployment=${deployment}`
  ).then(response => response.json());
}

async function GetDescribeDeploymentByNamespace(namespace, deployment) {
  return await fetch(
    `/api/deployment/describe?namespace=${namespace}&deployment=${deployment}`
  ).then(response => response.text());
}

function PutDeployment(body) {
  return fetch("/api/deployment", fetchOps("PUT", {}, body)).then(response =>
    response.json()
  );
}

function fetchOps(method = "GET", headers = {}, body = {}) {
  return {
    method: method,
    headers: headers,
    body: body
  };
}

export {
  GetNamespaces,
  GetPodsByNamespaces,
  GetDeploymentByNamespace,
  PutDeployment,
  GetDescribeDeploymentByNamespace
};
