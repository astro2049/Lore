# Recipes

## Database

### Migrations

https://typeorm.io/migrations

#### generate migrations

```
npx typeorm-ts-node-commonjs migration:generate src/migrations/${InitialSchema} -d src/data-source.ts
```

#### run migrations

```
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```

