import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DynamodbService } from './dynamodb.service';

/**
 * Controller for handling DynamoDB operations.
 */
@Controller('dynamodb')
export class DynamodbController {
  /**
   * Creates an instance of DynamodbController.
   * @param dynamodbService - The service used to interact with DynamoDB.
   */
  constructor(private readonly dynamodbService: DynamodbService) {}

  /**
   * Retrieves an item from DynamoDB based on the provided id.
   * @param id - The unique identifier for the item.
   * @returns The item from DynamoDB.
   */
  @Get('item/:id')
  async getItem(@Param('id') id: string): Promise<any> {
    const tableName = 'test';
    const key = { testPartitionKey: { S: id } };
    return await this.dynamodbService.getItem(tableName, key);
  }

  /**
   * Retrieves up to 100 items filtered by `ats = 'Volcanic'` from DynamoDB.
   * No pagination.
   * @returns A list of filtered items.
   * @param date - The current date in milliseconds.
   */
  @Get('filtered-items')
  async getFilteredItems(@Query('date') date: number): Promise<any> {
    return await this.dynamodbService.fetchTodayJobsFromDynamoDB(date);
  }

  /**
   * Scans and retrieves items from the DynamoDB table with optional pagination.
   * @param limit - The maximum number of items to return.
   * @param lastEvaluatedKey - The key to start the scan from for pagination.
   * @returns A list of items from the DynamoDB table and the last evaluated key.
   */
  @Get('items')
  async scanItems(
    @Query('limit') limit: number,
    @Query('lastEvaluatedKey') lastEvaluatedKey?: Record<string, any>,
  ): Promise<any> {
    const tableName = 'test';
    return await this.dynamodbService.scanItems(tableName, limit, lastEvaluatedKey);
  }

  /**
   * Puts an item into the DynamoDB table.
   * @param item - The item to be added to the DynamoDB table.
   * @returns The result of the put operation.
   */
  @Post('item')
  async putItem(@Body() item: any): Promise<any> {
    const tableName = 'test';
    return await this.dynamodbService.putItem(tableName, item);
  }
}
