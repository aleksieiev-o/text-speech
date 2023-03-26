import { Collection, CollectionsStore, CreateCollectionRequestDto, UpdateCollectionRequestDto } from './index';
import { child, DataSnapshot, get, ref, set, push, remove, update } from 'firebase/database';
import { firebaseDataBase } from '../../firebase';

interface ICollectionsStoreService {
  collectionsStore: CollectionsStore;
  loadAllCollectionsOnce: () => Promise<Array<Collection>>;
  loadCollectionByIdOnce: (id: string) => Promise<Collection>;
  createCollection: (payload: CreateCollectionRequestDto) => Promise<Collection>;
  removeCollection: (id: string) => Promise<string>;
  removeAllCollections: () => Promise<boolean>;
  updateCollection: (id: string, payload: UpdateCollectionRequestDto) => Promise<Collection>;
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

  async createCollection(payload: CreateCollectionRequestDto): Promise<Collection> {
    const {title, defaultLang, voiceURI} = payload;
    const collectionRef = push(ref(firebaseDataBase, this.collectionsStore.collectionsPath));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const collectionId = collectionRef.key!;

    const collection: Collection = {
      id: collectionId,
      title,
      author: this.collectionsStore.userUid,
      defaultLang,
      voiceURI,
      createdDate: new Date().toJSON(),
      updatedDate: new Date().toJSON(),
    };

    await set(collectionRef, collection);

    return await this.loadCollectionByIdOnce(collectionId);
  }

  async removeCollection(id: string): Promise<string> {
    await remove(child(ref(firebaseDataBase), `${this.collectionsStore.rootStore.cardsStore.cardsPath}/${id}`));
    await remove(child(ref(firebaseDataBase), `${this.collectionsStore.collectionsPath}/${id}`));
    return Promise.resolve(id);
  }

  async removeAllCollections(): Promise<boolean> {
    await set(ref(firebaseDataBase, this.collectionsStore.rootStore.cardsStore.cardsPath), null);
    await set(ref(firebaseDataBase, this.collectionsStore.collectionsPath), null);
    return Promise.resolve(true);
  }

  async updateCollection(id: string, payload: UpdateCollectionRequestDto): Promise<Collection> {
    await update(child(ref(firebaseDataBase), `${this.collectionsStore.collectionsPath}/${id}`), {
      ...payload,
      updatedDate: new Date().toJSON(),
    });
    return await this.loadCollectionByIdOnce(id);
  }
}
