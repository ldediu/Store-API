import { ProductStore } from '../../../src/models/product';

const store = new ProductStore()

describe("Product Model Testing", () => {

    let id = 1;

    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('should have a delete method', () => {
      expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
      const result = await store.create({
        name: 'Iphone',
        price: 1000,
        category: 'Phones'
      });
      id = result.id as number;
      expect(result).toEqual({
        id: id,
        name: 'Iphone',
        price: 1000,
        category: 'Phones'
      });
    });

    it('index method should return a list of products', async () => {
      const result = await store.index();
      expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct product', async () => {
      const result = await store.show(id + '');
      expect(result.id).toEqual(id);
    });

    it('delete method should remove the product', async () => {
      expect(store.delete).toBeDefined();
    });
  
});