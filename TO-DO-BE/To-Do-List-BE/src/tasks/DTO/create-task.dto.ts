import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsDate()
  createdAt: Date;
}
