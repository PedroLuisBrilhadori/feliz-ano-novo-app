import { Injectable, OnModuleInit } from '@nestjs/common';

import * as admin from 'firebase-admin';
import { Reference } from '@firebase/database-types';
@Injectable()
export class MuralService implements OnModuleInit {
  ref: Reference;

  constructor() {
    this.ref = admin.database().ref();
  }

  onModuleInit() {
    this.ref.on('value', (snap) => snap.val());
  }
}
