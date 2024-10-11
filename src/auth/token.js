async function tokenLoginUser(token) {
  const url =
    "https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/check-status";
  const userToken = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
  return userToken;
}

export default tokenLoginUser;
