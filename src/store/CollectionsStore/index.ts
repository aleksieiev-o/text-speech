import { RootStore } from '../index';
import { CollectionsStoreService } from './service';
import { makeAutoObservable } from 'mobx';

export interface Collection {
  id: string;
  title: string;
  author: string;
  createdDate: string;
  updatedDate: string;
}

export type UpdateCollectionPayload = { title: string };

export interface ICollectionsStore {
  rootStore: RootStore;
  collectionsStoreService: CollectionsStoreService;
  collections: Array<Collection>;
  loadAllCollections: () => void;
  createCollection: (title: string) => void;
  removeCollection: (id: string) => void;
  removeAllCollections: () => void;
  updateCollection: (id: string, payload: UpdateCollectionPayload) => void;
  clearLocalCollections: () => void;
}

export class CollectionsStore implements ICollectionsStore {
  rootStore: RootStore;
  collectionsStoreService: CollectionsStoreService;
  collections: Array<Collection>;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.collectionsStoreService = new CollectionsStoreService(this);
    this.collections = [];

    makeAutoObservable(this);
  }

  async loadAllCollections() {
    this.collections = await this.collectionsStoreService.loadAllCollectionsOnce();
  }

  async createCollection(title: string) {
    const collection = await this.collectionsStoreService.createCollection(title);
    this.collections.push(collection);
  }

  async removeCollection(id: string) {
    await this.collectionsStoreService.removeCollection(id);
    const deletedIdx = this.collections.findIndex((item) => item.id === id);
    this.collections.splice(deletedIdx, 1);
  }

  async removeAllCollections() {
    await this.collectionsStoreService.removeAllCollections();
    this.collections = [];
  }

  async updateCollection(id: string, payload: UpdateCollectionPayload) {
    const updatedCollection: Collection = await this.collectionsStoreService.updateCollection(id, { title: payload.title });
    const updatedIdx = this.collections.findIndex((item) => item.id === id);
    this.collections[updatedIdx] = updatedCollection;
  }

  clearLocalCollections() {
    this.collections = [];
  }

  get userUid(): string {
    return this.rootStore.authorizationStore.userUid;
  }

  get collectionsPath() {
    return `${this.userUid}/collections`;
  }
}
