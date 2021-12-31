import { Injectable, OnModuleInit } from '@nestjs/common';

import * as admin from 'firebase-admin';
import { Reference } from '@firebase/database-types';

import { PostModel } from '../models';
import { mailer } from 'server/main';
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

        mailer.sendMail({
            to: 'pedrolb03@gmail.com',
            subject: `post ${post.id} criado!`,
            text: `O Post ${post.id} foi criado! \n\n titulo: ${post.title} \n menssagem: ${post.message} \n autor: ${post.author} \n para: ${post.to}`,
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

    getAllPosts(): PostModel {
        let posts: PostModel;
        this.ref.child('posts').on('value', (snap) => {
            posts = snap.val();
        });

        return posts;
    }

    getPostWithId(id: string): PostModel {
        let post: PostModel;
        this.ref
            .child('posts')
            .orderByKey()
            .equalTo(id)
            .on('value', (snap) => {
                post = snap.val();
            });

        return post;
    }

    getPostWithTitle(title: string): PostModel {
        let post: PostModel;
        this.ref
            .child('posts')
            .orderByChild('title')
            .equalTo(title)
            .on('value', (snap) => {
                post = snap.val();
            });

        return post;
    }
}
