class CfCache {
  constructor(isLocal) {
    this.storage = isLocal ? localStorage : sessionStorage;
  }

  getItem(key) {
    const value = this.storage.getItem(key);
    if (value) return JSON.parse(value);
  }

  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  key(index) {
    this.storage.key(index);
  }

  length() {
    this.storage.length;
  }
}

const localCache = new CfCache(true);
const sessionCache = new CfCache(false);

export { localCache, sessionCache };
