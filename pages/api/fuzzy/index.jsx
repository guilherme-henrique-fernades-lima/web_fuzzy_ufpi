async function getFuzzysetResult(req, res) {
  const humanosSuscetiveis = req.query.humanos_suscetiveis;
  const humanosInfectados = req.query.humanos_infectados;
  const flebotomineosSuscetiveis = req.query.flebotomineos_suscetiveis;
  const flebotomineosInfectados = req.query.flebotomineos_infectados;
  const caesSuscetiveis = req.query.caes_suscetiveis;
  const caesInfectados = req.query.caes_infectados;

  const response = await fetch(
    `${process.env.NEXT_URL_BACKEND}/fuzzy/?humanos_suscetiveis=${humanosSuscetiveis}&humanos_infectados=${humanosInfectados}&flebotomineos_suscetiveis=${flebotomineosSuscetiveis}&flebotomineos_infectados=${flebotomineosInfectados}&caes_suscetiveis=${caesSuscetiveis}&caes_infectados=${caesInfectados}`,
    {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  const json = await response.json();

  return res.status(response.status).json(json);
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    getFuzzysetResult(req, res);
  }
}
