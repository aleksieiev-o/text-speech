import { Collection, CollectionsStore, UpdateCollectionPayload } from './index';
import { child, DataSnapshot, get, ref, set, push, remove, update } from 'firebase/database';
import { firebaseDataBase } from '../../firebase';

interface ICollectionsStoreService {
  collectionsStore: CollectionsStore;
  loadAllCollectionsOnce: () => Promise<Array<Collection>>;
  loadCollectionByIdOnce: (id: string) => Promise<Collection>;
  createCollection: (title: string) => Promise<Collection>;
  removeCollection: (id: string) => Promise<string>;
  removeAllCollections: () => Promise<boolean>;
  updateCollection: (id: string, payload: UpdateCollectionPayload) => Promise<Collection>;
}

export class CollectionsStoreService implements ICollectionsStoreService {
  collectionsStore: CollectionsStore;

  constructor(collectionsStore: CollectionsStore) {
    this.collectionsStore = collectionsStore;
  }

  async loadAllCollectionsOnce(): Promise<Array<Collection>> {
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), this.collectionsStore.collectionsPath));
    // TODO complete the check
    // if (snapshot.exists()) {
    //   return snapshot.val();
    // }

    const result = snapshot.val() || {};
    return Promise.resolve(Object
      .keys(result)
      .map((key) => ({ ...result[key] })) || []);
  }

  async loadCollectionByIdOnce(id: string): Promise<Collection> {
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), `${this.collectionsStore.collectionsPath}/${id}`));
    // TODO complete the check
    // if (snapshot.exists()) {
    //   return snapshot.val();
    // }
    return snapshot.val();
  }

  async createCollection(title: string): Promise<Collection> {
    const collectionRef = push(ref(firebaseDataBase, this.collectionsStore.collectionsPath));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const collectionId = collectionRef.key!;

    const collection: Collection = {
      id: collectionId,
      title,
      author: this.collectionsStore.userUid,
      createdDate: new Date().toJSON(),
      updatedDate: new Date().toJSON(),
    };

    await set(collectionRef, collection);

    return await this.loadCollectionByIdOnce(collectionId);
  }

  async removeCollection(id: string): Promise<string> {
    await remove(child(ref(firebaseDataBase), `${this.collectionsStore.collectionsPath}/${id}`));
    return Promise.resolve(id);
  }

  async removeAllCollections(): Promise<boolean> {
    await set(ref(firebaseDataBase, this.collectionsStore.collectionsPath), null);
    return Promise.resolve(true);
  }

  async updateCollection(id: string, payload: UpdateCollectionPayload): Promise<Collection> {
    await update(child(ref(firebaseDataBase), `${this.collectionsStore.collectionsPath}/${id}`), payload);
    return await this.loadCollectionByIdOnce(id);
  }
}
