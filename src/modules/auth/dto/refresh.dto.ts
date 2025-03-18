import { IsDate, IsNumber, IsString } from 'class-validator';

export class RefreshDto {
  @IsString()
  token: string;

  @IsNumber()
  userId: number;

  @IsDate()
  expiryDate: Date;
}
