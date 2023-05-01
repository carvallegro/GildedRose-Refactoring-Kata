const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should keep the same name", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  
  it("should lower sellIn & quality for all items at day end", function() {
    const gildedRose = new Shop([new Item("foo", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(9);
  });
  
  it("should lower quality 2x when sellIn is < 0", function() {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });

  it("should never have a negative quality", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("should increase quality for 'Aged Brie' as it gets older", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(11);
  });

  it("should never have quality above 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  it("should never change sellIn or Quality for 'Sulfuras'", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  });

  it("should increase quality for 'Backstage passes' as sellIn decreases", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(11);
  });

  it("should increase quality for 'Backstage passes' 2x if sellIn <= 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(12);
  });

  it("should increase quality for 'Backstage passes' 3x if sellIn <= 5", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(13);
  });

  it("should set quality to 0 for 'Backstage passes' if sellIn < 0", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });
});
