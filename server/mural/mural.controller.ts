import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostModel } from './models';
import { MuralService } from './service';

const url = 'https://feliz-ano-novo-flax.vercel.app/';
@Controller('mural')
export class MuralController {
    constructor(private muralService: MuralService) {}

    @Post('create')
    createNewPost(@Req() req: Request, @Res() res: Response) {
        let post = this.convertToPostType(
            req.body.title?.toString(),
            req.body.message?.toString(),
            req.body.author?.toString(),
            req.body.to?.toString(),
        );

        if (post.title && post.message) {
            if (this.muralService.createPost(post))
                res.status(301).redirect(url + '?create=true');
            else res.status(301).redirect(url + '?create=false');
        } else res.status(301).redirect(url + '?create=false');
    }

    private convertToPostType(
        title: string,
        message: string,
        author?: string,
        to?: string,
    ): PostModel {
        return {
            id: this.muralService.randomId(),
            title: title.length > 40 ? null : title,
            message: message.length > 300 ? null : message,
            author: author ? author : 'Anônimo',
            to: to ? to : null,
        };
    }

    @Get('')
    getAllPosts() {
        return this.muralService.getAllPosts();
    }

    @Get('id/:id')
    getPostWihtId(@Param('id') id) {
        return this.muralService.getPostWithId(id);
    }

    @Get('title/:title')
    getPostWithTitle(@Param('title') title) {
        return this.muralService.getPostWithTitle(title);
    }
}
