# Code Review — UserList.ts

## Issues found

```ts
export class UserList {
  users: any[] = [];
  // Issue: `any` removes TypeScript safety. We should define a User type.

  filter: any;
  // Issue: this is used as a name filter, so it should be `string | null`.

  constructor(data) {
    // Issue: `data` has no type. Also, there is no default value if data is missing.
    this.users = data;
    this.filter = null;
  }

  getFilteredUsers() {
    // Issue: missing return type.
    if (this.filter == null) return this.users;
    // Issue: `==` is less clear than `===`.

    return this.users.filter((u) => u.name == this.filter);
    // Issue: `u` is not typed, and `==` should be `===`.
  }

  async loadUsers() {
    const res = await fetch("/api/users");
    // Issue: no check for failed responses like 404 or 500.

    const data = res.json();
    // Bug: missing await. res.json() returns a Promise.

    this.users = data;
    // Bug: users becomes a Promise instead of an array.
  }

  renderUser(user) {
    // Issue: user has no type.
    const el = document.createElement("div");

    el.innerHTML = `${user.name}`;
    // Issue: innerHTML is unsafe for user content. textContent is safer.

    return el;
  }

  deleteUser(id) {
    // Issue: id has no type.
    this.users = this.users.filter((u) => u.id !== id);

    this.users.forEach((u) => {
      u.index = this.users.indexOf(u);
      // Issue: this changes the user object just to store a display index.
      // It is also inefficient because indexOf runs for every user.
    });
  }
}
```

## Suggested fixed version

```ts
interface User {
  id: number;
  name: string;
}

export class UserList {
  users: User[] = [];
  filter: string | null = null;

  constructor(data: User[] = []) {
    this.users = data;
  }

  getFilteredUsers(): User[] {
    if (this.filter === null) {
      return this.users;
    }

    return this.users.filter((user) => user.name === this.filter);
  }

  async loadUsers(): Promise<void> {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    const data: User[] = await response.json();
    this.users = data;
  }

  renderUser(user: User): HTMLDivElement {
    const element = document.createElement("div");
    element.textContent = user.name;
    return element;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
```
