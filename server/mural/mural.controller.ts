import { Controller, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostModel } from './models';
import { MuralService } from './service';

@Controller('mural')
export class MuralController {
    constructor(private muralService: MuralService) {}

    @Post('create')
    createNewPost(@Req() req: Request) {
        return this.convertToPostType(
            req.query.title.toString(),
            req.query.message.toString(),
        );
    }

    private convertToPostType(
        title: string,
        message: string,
        author?: string,
        to?: string,
    ): PostModel {
        return {
            title: title.length > 40 ? null : title,
            message: message.length > 300 ? null : message,
            date: new Date(),
            author: author ? author : 'Anônimo',
            to: to ? to : undefined,
        };
    }
}
