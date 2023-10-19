import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthEntity } from './entities/auth.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
@ApiTags('Authetication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
