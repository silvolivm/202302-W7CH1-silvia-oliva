import { ThingsFileRepo } from './things.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given ThingsFileRepo', () => {
  // Arrange
  const repo = new ThingsFileRepo();

  test('Then it could be instantiated', () => {
    expect(repo).toBeInstanceOf(ThingsFileRepo);
  });

  describe('When I use query', () => {
    test('Then should return the data', async () => {
      // Arrange
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      // Act
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When I use queryId', () => {
    test('Then it should return one item if it has a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const id = '1';
      const result = await repo.queryId(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then it should... if it has a valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"2"}]');
      const id = '1';
      expect(async () => repo.queryId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When I use create', () => {
    test('Then it should return a new item ', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const add = { name: 'zanahoria' };
      const result = await repo.create(add);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ name: 'zanahoria' });
    });
  });
  describe('When I use update ', () => {
    test('Then it should return the updated object if the id is found', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{  "name": }]');
      const result = await repo.update({
        name: 'zanahoria',
      });
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ name: 'coco' });
    });
    test('Then it should throw  an error id not found', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{ "name:" }]');
      expect(async () =>
        repo.update({
          name: 'coco',
        })
      ).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When I use destroy', () => {
    test('Then we expect undefined because the item don,t exist', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{  "id" }]');
      const result = await repo.destroy('1');
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toBe(undefined);
    });
    test('Then it should throw an error if it has a NO valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{  "id"  }]');
      expect(async () => repo.destroy('1')).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
});
