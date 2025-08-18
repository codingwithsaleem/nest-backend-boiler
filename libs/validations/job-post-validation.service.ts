import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JobPostValidationService {
  /**
   * Validate the filters for browsing job posts.
   * @param roleId - The role ID to filter job posts.
   * @param regionFilters - The region filters to apply to the job posts.
   * @param regionFilters.regionGroupId - The region group ID to filter job posts.
   * @param regionFilters.regionStateId - The region state ID to filter job posts.
   * @param regionFilters.regionId - The region ID to filter job posts.
   * @returns The filter key and value for the region filters.
   */
  validateBrowseJobsFilters(
    roleId: string,
    regionFilters: { regionGroupId?: string; regionStateId?: string; regionId?: string },
  ): { filterKey: string; filterValue: string } {
    if (!roleId) {
      throw new BadRequestException('roleId is required');
    }

    const activeRegionFilters = Object.entries(regionFilters).filter(
      ([, value]) => value,
    );

    if (activeRegionFilters.length !== 1) {
      throw new BadRequestException(
        'Exactly one of regionGroupId, regionStateId, or regionId must be provided',
      );
    }

    const [filterKey, filterValue] = activeRegionFilters[0];
    return { filterKey, filterValue };
  }
}
