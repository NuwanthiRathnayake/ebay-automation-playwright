const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');

test.describe('eBay Related Products Widget', () => {
  let productPage;
  
  // Define main product price for comparison 
  const mainProductPrice = 50.00;
  const allowedVariance = 0.20; // Allow 20% price difference

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    
    await productPage.navigateToProduct('https://www.ebay.com/itm/186277620963?_skw=wallet&itmmeta=01KFDRQFJRD35VNZNCP598TVPD&hash=item2b5f02ece3:g:XfQAAOSwlIRluV1j&itmprp=enc%3AAQALAAAAwNj3NPLDar04SUwbC%2B%2By9TtOMueCtu26MOHXdURSIKPwYJcXqe8Rq5gLjz54msmiJzu3OkYMMSNXah4rV3EGNeoootQMLlUjtE2JFL7D45O1z9az2cqF7vndh7no1OTHN7zjHEqAfmwuCl6pSIHHZp0Q57DWnRA8jLH8X89HfscuLDjMki6nE%2FQmRjOSljfILcSOTVl4wFML7wo7rsBepN7Xxicx3V%2BrUtzGdqlwHoF4Ybu1Gng0B8gZ%2FrGHFftvXw%3D%3D%7Ctkp%3ABk9SR8D53bj7Zg'); 
    await productPage.scrollToRelatedSection();
  });

  // TC: Verify section visibility
  test('Should display "Similar sponsored items" section', async () => {
    await expect(productPage.sectionHeader).toBeVisible();
  });

  // TC: Verify Max 6 Items 
  test('Should display up to 6 best seller products', async () => {
    const count = await productPage.getRelatedItemCount();
    console.log(`Found ${count} related items.`);
    expect(count).toBeLessThanOrEqual(6);
  });

  // TC: Verify Price Range Logic
  test('Should show products within similar price range', async () => {
    const prices = await productPage.getAllRelatedPrices();
    
    // Calculate expected range
    const minPrice = mainProductPrice * (1 - allowedVariance);
    const maxPrice = mainProductPrice * (1 + allowedVariance);

    console.log(`Verifying prices are between $${minPrice} and $${maxPrice}`);

    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(minPrice);
      expect(price).toBeLessThanOrEqual(maxPrice);
    }
  });

  // TC: Verify "See all" link navigation
  test('Should redirect to listing page when clicking "See all"', async ({ page }) => {
    // Verify link exists first
    await expect(productPage.seeAllLink).toBeVisible();
    
    // Click and wait for navigation
    await productPage.clickSeeAll();
    await page.waitForLoadState('domcontentloaded');
  });
});