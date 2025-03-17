import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { RbacService } from '../service';
import { Body, Controller, Patch, Req, Res } from '@nestjs/common';
import { ResponseFormat } from 'src/shared';

@Controller()
export class RbacController {
  constructor(private rbacService: RbacService) {}

  @Patch('/update-role')
  async update(@Res() res, @Req() req, @Body() dto: UpdateUserDto) {
    const response = await this.rbacService.updaterole(dto);

    if (!response) {
      return ResponseFormat.failureResponse(res, null, 'Failed');
    }

    return ResponseFormat.successResponse(res, response, 'Succesful');
  }
}
