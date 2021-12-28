import { Injectable, OnModuleInit } from '@nestjs/common';

import * as admin from 'firebase-admin';
import { Reference } from '@firebase/database-types';

import { PostModel } from '../models';
@Injectable()
export class MuralService implements OnModuleInit {
    private ref: Reference;

    constructor() {
        this.ref = admin.database().ref();
    }

    onModuleInit() {
        this.ref.on('value', (snap) => snap.val());
    }

    createPost(post: PostModel) {
        this.ref
            .child('posts')
            .child(post.id)
            .set(post)
            .then((err) => {
                if (err) console.log(err);
            });

        return post;
    }

    randomId(): string {
        let link: string = '';
        const possibleChars: string =
            'abcdefghijklmnopqrstuvwxyz+ABCDEFGHIJKLMNOPQRSTUVWXYZ-0123456789';

        for (let i = 0; i < 5; i++)
            link +=
                possibleChars[
                    Math.floor(Math.random() * (possibleChars.length - 0) + 0)
                ];
        return link;
    }
}
