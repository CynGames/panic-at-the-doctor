export class BiMap<K = unknown, V = unknown> {
  private primaryMap: Map<K, V>;

  private secondaryMap: Map<V, K>;

  public constructor() {
    this.primaryMap = new Map<K, V>();
    this.secondaryMap = new Map<V, K>();
  }

  get size(): number {
    return this.primaryMap.size;
  }

  public get(key: K): V | undefined {
    return this.getFromKey(key);
  }

  public set(key: K, value: V): void {
    this.setFromKey(key, value);
  }

  public getFromKey(key: K): V | undefined {
    return this.primaryMap.get(key);
  }

  public getFromValue(value: V): K | undefined {
    return this.secondaryMap.get(value);
  }

  public setFromKey(key: K, value: V): void {
    this.primaryMap.set(key, value);
    this.secondaryMap.set(value, key);
  }

  public setFromValue(value: V, key: K): void {
    this.setFromKey(key, value);
  }

  public removeByKey(key: K): V | undefined {
    if (this.primaryMap.has(key)) {
      const value: V = this.primaryMap.get(key) as V;

      this.primaryMap.delete(key);
      this.secondaryMap.delete(value);

      return value;
    } else return undefined;
  }

  public removeByValue(value: V): K | undefined {
    if (this.secondaryMap.has(value)) {
      const key: K = this.secondaryMap.get(value) as K;

      this.primaryMap.delete(key);
      this.secondaryMap.delete(value);

      return key;
    } else return undefined;
  }

  public hasKey(key: K): boolean {
    return this.primaryMap.has(key);
  }

  public hasValue(value: V): boolean {
    return this.secondaryMap.has(value);
  }

  public clear(): void {
    this.primaryMap.clear();
    this.secondaryMap.clear();
  }
}
