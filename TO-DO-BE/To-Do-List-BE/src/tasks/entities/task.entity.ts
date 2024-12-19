import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class Task {
  @Field()
    @IsUUID()
    id: string;
  
    @Field()
    @IsString()
    title: string;
  
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
  
    @Field()
    @IsBoolean()
    isCompleted: boolean;
  
    @Field()
    createdAt: Date;
}


