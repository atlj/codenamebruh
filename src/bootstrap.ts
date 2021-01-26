declare global {
  interface Array<T> {
    sample(): T;
  }
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

import dotenv from 'dotenv';
import 'module-alias/register';
import 'reflect-metadata';
dotenv.config();
