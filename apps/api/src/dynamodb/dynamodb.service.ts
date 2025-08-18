import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DynamoDB,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  ScanCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb';
import { AwsService } from '@app/aws/aws.service';

/**
 * Service for interacting with DynamoDB.
 */
@Injectable()
export class DynamodbService {
  /**
   * Creates an instance of DynamodbService.
   * @param awsService - The service used to provide AWS configurations.
   */
  constructor(private readonly awsService: AwsService) {}

  /**
   * Returns an instance of DynamoDB client.
   * @returns The DynamoDB client instance.
   */
  public get client(): DynamoDB {
    return new DynamoDB(this.awsService.client);
  }

  /**
   * Retrieves an item from the DynamoDB table based on the provided key.
   * @param tableName - The name of the DynamoDB table.
   * @param key - The primary key of the item to retrieve.
   * @returns The retrieved item from DynamoDB.
   */
  async getItem(tableName: string, key: Record<string, any>): Promise<any> {
    const command = new GetItemCommand({
      TableName: tableName,
      Key: key,
    });

    try {
      const response = await this.client.send(command);
      return response.Item;
    } catch (error) {
      console.error('Error getting item from DynamoDB', error);
      throw error;
    }
  }

  /**
   * Puts an item into the DynamoDB table.
   * @param tableName - The name of the DynamoDB table.
   * @param item - The item to be added to the DynamoDB table.
   * @returns The result of the put operation.
   */
  async putItem(tableName: string, item: Record<string, any>): Promise<any> {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error('Error putting item to DynamoDB', error);
      throw error;
    }
  }

  /**
   * Scans and retrieves items from the DynamoDB table with optional pagination.
   * @param tableName - The name of the DynamoDB table.
   * @param limit - The maximum number of items to return.
   * @param lastEvaluatedKey - The key to start the scan from for pagination (optional).
   * @returns An object containing the list of items and the last evaluated key.
   */
  async scanItems(
    tableName: string,
    limit: number,
    lastEvaluatedKey?: Record<string, any>,
  ): Promise<{ items: any[]; lastEvaluatedKey?: Record<string, any> }> {
    const params: ScanCommandInput = {
      TableName: tableName,
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey,
    };

    const command = new ScanCommand(params);

    try {
      const response = await this.client.send(command);
      return { items: response.Items, lastEvaluatedKey: response.LastEvaluatedKey };
    } catch (error) {
      console.error('Error scanning items from DynamoDB', error);
      throw error;
    }
  }

  // async fetchTodayJobsFromDynamoDB(): Promise<any[]> {
  //   const tableName = 'job_data';
  //   const limit = 100;
  //   // const date = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
  //   const date = 1728345600;
  //   console.log('Today:', date);
  //   const expressionAttributeValues = { ':date': { N: date.toString() } };
  //   const filterExpression = 'created_day = :date';
  //   // const expressionAttributeValues = { ':date': { S: date.toString() } };
  //   // const filterExpression = 'start_date = :date';
  //   const dynamoItems = await this.scanItemsWithFilter(
  //     tableName,
  //     limit,
  //     filterExpression,
  //     expressionAttributeValues,
  //   );
  //   // console.log('Today:', date);
  //   // console.log('Fetched items:', dynamoItems);
  //   return dynamoItems;
  // }

  /**
   * Fetch items from DynamoDB
   * @returns The fetched items and the new last evaluated key
   * @deprecated Use scanItems instead
   * @param date - The current date in milliseconds.
   */
  async fetchTodayJobsFromDynamoDB(date: number): Promise<any[]> {
    const tableName = 'job_data';
    const indexName = 'created_day-url-index';
    // const date = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
    // const date = 1728345600;
    if (!date) {
      throw new NotFoundException('Invalid date provided');
    }
    console.log('Today:', date);
    const expressionAttributeValues = { ':date': { N: date.toString() } };
    const keyConditionExpression = 'created_day = :date';

    const dynamoItems = await this.queryItemsWithFilter(
      tableName,
      indexName,
      keyConditionExpression,
      expressionAttributeValues,
    );
    // console.log('Fetched items:', dynamoItems);
    return dynamoItems;
  }

  /**
   * Queries and retrieves items from the DynamoDB table using a GSI with optional filter expression.
   * @param tableName - The name of the DynamoDB table.
   * @param indexName - The name of the GSI.
   * @param keyConditionExpression - The key condition expression for the query.
   * @param expressionAttributeValues - The attribute values for the key condition expression.
   * @returns An array containing all the items that match the key condition expression.
   */
  async queryItemsWithFilter(
    tableName: string,
    indexName: string,
    keyConditionExpression: string,
    expressionAttributeValues: Record<string, any>,
  ): Promise<any[]> {
    const params: QueryCommandInput = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      FilterExpression:
        'attribute_exists(region_ids) AND attribute_exists(currency) AND attribute_exists(role_ids)',
    };

    let items: any[] = [];
    let lastEvaluatedKey: Record<string, any> | undefined = undefined;

    do {
      const command = new QueryCommand({
        ...params,
        ExclusiveStartKey: lastEvaluatedKey,
      });
      try {
        const response = await this.client.send(command);
        items = items.concat(response.Items);
        lastEvaluatedKey = response.LastEvaluatedKey;
      } catch (error) {
        console.error('Error querying items from DynamoDB', error);
        throw error;
      }
    } while (lastEvaluatedKey);

    console.log('Queried items:', items.length);
    return items;
  }

  /**
   * Scans and retrieves items from the DynamoDB table with optional filter expression.
   * @param tableName - The name of the DynamoDB table.
   * @param limit - The maximum number of items to return.
   * @param filterExpression - The filter expression for the scan.
   * @param expressionAttributeValues - The attribute values for the filter expression.
   * @returns An object containing the list of items and the last evaluated key.
   */
  // async scanItemsWithFilter(
  //   tableName: string,
  //   limit: number,
  //   filterExpression: string,
  //   expressionAttributeValues: Record<string, any>,
  // ): Promise<any[]> {
  //   const totalSegments = 10; // Number of parallel segments
  //   const scanPromises: Promise<any[]>[] = [];

  //   for (let segment = 0; segment < totalSegments; segment++) {
  //     scanPromises.push(
  //       this.scanSegment(
  //         tableName,
  //         limit,
  //         filterExpression,
  //         expressionAttributeValues,
  //         segment,
  //         totalSegments,
  //       ),
  //     );
  //   }

  //   const results = await Promise.all(scanPromises);
  //   // console.log('Scanned results:', results.flat());
  //   return results.flat();
  // }

  /**
   * Scans a segment of the DynamoDB table.
   * @param tableName - The name of the DynamoDB table.
   * @param limit - The maximum number of items to return.
   * @param filterExpression - The filter expression for the scan.
   * @param expressionAttributeValues - The attribute values for the filter expression.
   * @param segment - The segment number to scan.
   * @param totalSegments - The total number of segments.
   * @returns An array containing the items from the scanned segment.
   */
  // private async scanSegment(
  //   tableName: string,
  //   limit: number,
  //   filterExpression: string,
  //   expressionAttributeValues: Record<string, any>,
  //   segment: number,
  //   totalSegments: number,
  // ): Promise<any[]> {
  //   let items: any[] = [];
  //   let lastEvaluatedKey: Record<string, any> | undefined = undefined;

  //   do {
  //     const params: ScanCommandInput = {
  //       TableName: tableName,
  //       Limit: limit,
  //       FilterExpression: filterExpression,
  //       ExpressionAttributeValues: expressionAttributeValues,
  //       ExclusiveStartKey: lastEvaluatedKey,
  //       Segment: segment,
  //       TotalSegments: totalSegments,
  //     };

  //     const command = new ScanCommand(params);

  //     try {
  //       const response = await this.client.send(command);
  //       items = items.concat(response.Items);
  //       lastEvaluatedKey = response.LastEvaluatedKey;
  //       // console.log(`Segment ${segment} scanned items:`, response.Items.length);
  //       // console.log(`Segment ${segment} last evaluated key:`, response.LastEvaluatedKey);
  //     } catch (error) {
  //       console.error(`Error scanning segment ${segment} from DynamoDB`, error);
  //       throw error;
  //     }
  //   } while (lastEvaluatedKey);

  //   return items;
  // }
}
