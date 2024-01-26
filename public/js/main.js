

async function purchase(mls_id, item) {
  console.log(item)
  const sku = item.sku

  item.purchaseDate = new Date()
  const jsonData = await fetch(
    // `http://localhost:3000/api/users/${mls_id}`, 
    `https://mlsoccer-cic-demo-6cb3c8121f5c.herokuapp.com/api/users/${mls_id}`,
    {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      },
    }
  )
  .then(async (response) => await response.json())

  console.log(jsonData)
  alert('`user with mls_id: ${mls_id} purchased item with sku: ${sku}`')
}