import { OrderDetStore } from '../../../src/models/orderDetailed';

const store = new OrderDetStore()

describe("Order Model Testing", () => {
    it('should have a show products in order method', () => {
      expect(store.show_products).toBeDefined();
    });
  
    it('should have an add products to order method', () => {
      expect(store.add_products).toBeDefined();
    });
  
    it('should have an update products in order method', () => {
      expect(store.update_products).toBeDefined();
    });

    it('should have a delete all products from order method', () => {
        expect(store.delete_products).toBeDefined();
    });
});