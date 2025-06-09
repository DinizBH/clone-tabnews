exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    // For reference, Github limits usernames to 39 characters.
    username: {
      type: "varChar(30)",
      notNull: true,
      unique: true,
    },

    // why 254 length? https://stackoverflow.com/a/1199238
    email: {
      type: "varChar(254)",
      notNull: true,
      unique: true,
    },

    // why 60 length? https://www.npmjs.com/package/bcrypt#hash-info
    password: {
      type: "varChar(60)",
      notNull: true,
    },

    // why timestamp with time zone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      default: pgm.func("timezone('utc', now())"),
      notNull: true,
    },

    updated_at: {
      type: "timestamptz",
      default: pgm.func("timezone('utc', now())"),
      notNull: true,
    },
  });
};
exports.down = (pgm) => false;
