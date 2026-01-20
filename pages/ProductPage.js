const { expect } = require('@playwright/test');

class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Locators 
    this.sectionHeader = page.getByText('Similar sponsored items'); 
    this.relatedItems = page.locator('.carousel__item'); 
    this.itemPrices = page.locator('.carousel__item .inventory-item-price');
    this.seeAllLink = page.getByRole('link', { name: 'See all' }); 
  }

  async navigateToProduct(url) {
    await this.page.goto(url);
  }

  // scroll to the widget to ensure it loads
  async scrollToRelatedSection() {
    await this.sectionHeader.scrollIntoViewIfNeeded();
    await expect(this.sectionHeader).toBeVisible();
  }

  async getRelatedItemCount() {
    return await this.relatedItems.count();
  }

  async clickSeeAll() {
    await this.seeAllLink.click();
  }
}

module.exports = { ProductPage };