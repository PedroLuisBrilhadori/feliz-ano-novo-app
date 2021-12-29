import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostModel } from './models';
import { MuralService } from './service';

@Controller('mural')
export class MuralController {
    constructor(private muralService: MuralService) {}

    @Post('create')
    createNewPost(@Req() req: Request) {
        let post = this.convertToPostType(
            req.query.title.toString(),
            req.query.message.toString(),
            req.query.author?.toString(),
            req.query.to?.toString(),
        );

        return this.muralService.createPost(post);
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
            date: new Date(),
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
