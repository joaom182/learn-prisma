"use strict";

require('dotenv').config({
  path: '.env.test'
});

const NodeEnvironment = require('jest-environment-node');

const {
  v4: uuid
} = require('uuid');

const {
  execSync
} = require('child_process');

const {
  Client
} = require('pg');

const prismaCli = './node_modules/.bin/prisma';

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `db_test_${uuid()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    execSync(`${prismaCli} migrate dev`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }

}

module.exports = CustomEnvironment;