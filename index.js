const { chromium } = require('playwright-chromium')
const { sendMessageDiscord } = require('./bot')

// This product don't have stock
const vendors = {
  vendor: 'Amazon',
  alias: 'Smart Cover iPad',
  img: 'https://m.media-amazon.com/images/I/41DGJg9B6ML._AC_SY879_.jpg',
  url: 'https://www.amazon.com/Apple-Smart-Cover-iPad-10-5-inch/dp/B07PP41R3B?ref_=ast_sto_dp',
  checkStock: async ({ page }) => {
    const addToCartButton = await page.$$('#add-to-cart-button')
    return addToCartButton.length > 0
  }
}

// This product has stock
// const vendors = {
//   vendor: 'Amazon',
//   alias: ' Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/51j8IiHZUtL._SX329_BO1,204,203,200_.jpg',
//   url: 'https://www.amazon.com/-/en/gp/product/0735211299/ref=ox_sc_act_title_2?smid=ATVPDKIKX0DER&psc=1',
//   checkStock: async ({ page }) => {
//     const addToCartButton = await page.$$('#add-to-cart-button')
//     return addToCartButton.length > 0
//   }
// }

async function alertStock () {
  const browser = await chromium.launch({ headless: true })

  const { url, checkStock } = vendors

  const page = await browser.newPage()
  await page.goto(url)

  const hasStock = await checkStock({ page })

  // If we have stock, we will create thread and send messages on discord
  if (hasStock) sendMessageDiscord(vendors)
  else console.log('Sorry 😢 We don\'t have stock for this product')

  await page.close()

  await browser.close()
}

alertStock()
