import { ThingsFileRepo } from '../repository/things.file.repo';
import { Response, Request, NextFunction } from 'express';
import { ThingsController } from './things.controller';

describe('Given the ThingsController', () => {
  const repo: ThingsFileRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  const controller = new ThingsController(repo);

  describe('Given getAll method ', () => {
    test('Then, it should call repo.query n resp.json', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('Given getAll method ', () => {
    test('Then, it should throw an error if it exists', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
