const { purchaseItem } = require('./../models/fan360client')
const items = [
  {
    name: "Atlanta Supporters Atlanta United FC adidas 2021 The BLVCK",
    image: "https://fanatics.frgimages.com/atlanta-united-fc/mens-adidas-atlanta-supporters-black-atlanta-united-fc-2021-the-blvck-kit-authentic-jersey_pi4238000_ff_4238328-b46a0025d03d68a4cd67_full.jpg",
    sku: "12345",
    price: 50
  },
  {
    name: "D.C. United New Era Kick-Off 39THIRTY Flex Hat - Black",
    image: "https://fanatics.frgimages.com/dc-united/mens-new-era-black-dc-united-kick-off-39thirty-flex-hat_pi4420000_ff_4420470-d59dfe2bd99d84d29755_full.jpg",
    sku: "678910",
    price: 30
  }
]

module.exports = {
  purchase,
  items
}

async function purchase(req, res, next) {
  const { sku } = req.body
  const user = req.oidc.user
  const item = items.find(x => x.sku == sku)
  try {
    
  } catch (error) {
    
  }
}