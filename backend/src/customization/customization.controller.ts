import { Controller, Post, Body } from '@nestjs/common';
import { CustomizationService } from './customization.service';
import { CreateCustomizationDto } from '../dto/customization.dto';

@Controller('customization')
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  @Post('request')
  createRequest(@Body() createCustomizationDto: CreateCustomizationDto) {
    return this.customizationService.handleRequest(createCustomizationDto);
  }
}