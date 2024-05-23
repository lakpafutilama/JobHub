const details = require("../helpers/details.json");

async function getRegions(req, res) {
  try {
    const data = details.map((data) => {
      return data.name;
    });
    res.json({ data });
  } catch (err) {
    res.json({ message: "Something went wrong" });
  }
}

async function getDistricts(req, res) {
  try {
    const detail = details.find(
      (province) => province.name === req.params.region
    );
    const data = detail.districts;
    res.json({ data });
  } catch (err) {
    res.json({ message: "Something went wrong" });
  }
}

module.exports = { getRegions, getDistricts };
