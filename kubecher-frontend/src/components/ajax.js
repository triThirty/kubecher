function GetNamespaces() {
  return fetch("/api/namespace")
    .then(response => response.json())
}

export { GetNamespaces };
