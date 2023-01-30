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

export interface Card {
  id: string;
  title: string;
  text: string;
  author: string;
  createdDate: string;
  updatedDate: string;
}

export interface ICollectionsStore {
  rootStore: RootStore;
  collectionsStoreService: CollectionsStoreService;
  collections: Array<Collection>;
  loadAllCollections: () => void;
  createCollection: (title: string) => void;
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