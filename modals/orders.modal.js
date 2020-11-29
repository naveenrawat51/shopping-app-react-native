export default class Order {
  constructor(id, items, totalAmount, data) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.data = data;
  }
}
