async function getFuzzysetResult(req, res) {
  const response = await fetch(`${process.env.NEXT_URL_BACKEND}/fuzzy`, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  const json = await response.json();

  return res.status(response.status).json(json);
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    getFuzzysetResult(req, res);
  }
}
