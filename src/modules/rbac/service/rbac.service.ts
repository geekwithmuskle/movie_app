import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';

@Injectable()
export class RbacService {
  constructor(private userService: UserService) {}

  async updaterole(dto: UpdateUserDto) {
    return await this.userService.findByEmailAndUpdate(dto);
  }
}
