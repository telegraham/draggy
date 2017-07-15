describe("Table", function() {
  var table;

  beforeEach(function() {
    table = new Table();
    table._top = 100;
    table._left = 200;
    table._width = 42;
  });

  describe("#top", function() {
    it("should return the top value", function() {
      expect(table.top()).toBe(100);
    });
    it("should change when the top value changes", function() {
      table._top = 150;
      expect(table.top()).toBe(150);
    });
    it("should modify the top value", function() {
      table.top(550);
      expect(table.top()).toBe(550);
    });
  });
  describe("#left", function() {
    it("should return the left value", function() {
      expect(table.left()).toBe(200);
    });
    it("should change when the left value changes", function() {
      table._left = 350;
      expect(table.left()).toBe(350);
    });
    it("should modify the left value", function() {
      table.left(450);
      expect(table.left()).toBe(450);
    });
  });
  describe("#right", function() {
    it("should return the right value", function() {
      expect(table.right()).toBe(242);
    });
    it("should change when the left value changes", function() {
      table._left = 750;
      expect(table.right()).toBe(792);
    });
    it("should modify the left value", function() {
      table.right(950);
      expect(table._left).toBe(908);
    });
  });

});
