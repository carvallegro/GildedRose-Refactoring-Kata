class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
        continue
      }
      this.items[i].sellIn -= 1;

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          this.items[i].quality -= 1;
        }
      } else {
        this.items[i].quality += 1;
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sellIn < 10) {
            this.items[i].quality += 1;
          }
          if (this.items[i].sellIn < 5) {
            this.items[i].quality += 1;
          }
        }
      }
      this.items[i].quality = Math.min(this.items[i].quality, 50)
      if (this.items[i].sellIn >= 0) {
        continue
      }
      if (this.items[i].name === 'Aged Brie' && this.items[i].quality < 50) {
        this.items[i].quality += 1;
        continue
      }
      if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.items[i].quality = 0;
      } else if (this.items[i].quality > 0) {
        this.items[i].quality -= 1;
      } 
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
