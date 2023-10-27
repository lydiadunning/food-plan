// if this gives me trouble, use axios
const baseRoute = 'http://localhost:2002/api/'

const getQuery = async (route) => {
  const response = await fetch(baseRoute.concat(route))
  const result = await response.json()
  return result
}

const postQuery = async (route, request) => {
  const response = await fetch(baseRoute.concat(route), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const result = await response.json()
  return result
}

const deleteQuery = async (route) => {
  const response = await fetch(baseRoute.concat(route), {
    method: 'DELETE'
  })
  const result = await response.json()
  return result
}

const putQuery = async (route, request) => {
  const response = await fetch(baseRoute.concat(route), {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const result = await response.json()
  return result
}

export { getQuery, postQuery, deleteQuery, putQuery}