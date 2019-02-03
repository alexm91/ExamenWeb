import {
    Headers,
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Param,
    Body,
    Head, UnauthorizedException, Req, Res, Session
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import {Request, Response} from 'express';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {

  }
}

